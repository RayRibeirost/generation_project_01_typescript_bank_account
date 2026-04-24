terraform {
    required_version = ">= 1.5"
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
      }
    }
    backend "s3" {
      bucket = "bank-account-terraform-state"
      key = "prod/terraform.tfstate"
      region = "us-east-1"
      dynamodb_table = "bank-account-terraform-lock"
      encrypt = true
    }
}

provider "aws" {
  region = var.aws_region
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "ubuntu" {
    most_recent = true
    owners = ["099720109477"]
    filter {
        name = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-22.04-amd64-server-*"]
    }
}

resource "aws_vpc" "main" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
    tags = {
        Name = "${var.project_name}-vpc"
        Environment = var.environment
    }
}

resource "aws_internet_gateway" "main" {
    vpc_id = aws_vpc.main.id
    tags = {
        Name = "${var.project_name}-igw"
    }
}

resource "aws_subnet" "public" {
    vpc_id = aws_vpc.main.id
    cidr_block = "10.0.1.0/24"
    availability_zone = data.aws_availability_zones.available.names[0]
    map_public_ip_on_launch = true
    tags = {
        Name = "${var.project_name}-subnet-public"
    }
}

resource "aws_subnet" "private_1" {
    vpc_id = aws_vpc.main.id
    cidr_block = "10.0.2.0/24"
    availability_zone = data.aws_availability_zones.available.names[0]
    tags = {
        Name = "${var.project_name}-subnet-private-1"
    }
}

resource "aws_subnet" "private_2" {
    vpc_is = aws_vpc.main.id
    cidr_block = "10.0.3.0/24"
    availability_zone = data.aws_availability_zones.available.names[1]
    tags = {
        Name = "${var.project_name}-subnet-private-2"
    }
}

resource "aws_route_table" "public" {
    vpc_id = aws_vpc.main.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.main.id
    }
    tags = {
        Name = "${var.project_name}-rt-public"
    }
}

resource "aws_route_table_association" "public" {
    subnet_id = aws_subnet.public.id
    route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "ec2" {
    name = "${var.project_name}-sg-ec2"
    description = "EC2 Security Group"
    vpc_id = aws_vpc.main.id
    ingress {
        description = "SSH"
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = [var.allowed_ssh_cidr]
    }
    ingress {
        description = "Application HTTP"
        from_port = 3000
        to_port = 3000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "${var.project_name}-sg-ec2"
    }
}
resource "aws_security_group" "rds" {
    name = "${var.project_name}-sg-rds"
    description = "RDS Security Group - Allows only EC2"
    vpc_id = aws_vpc.main.id
    ingress {
        description = "EC2 only PostgreSQL"
        from_port = 5432
        to_port = 5432
        protocol = "tcp"
        security_groups = [aws_security_group.ec2.id]
    }
    egress {
        from_port = 0
        to_port = 0 
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
        tags = {
            Name = "${var.project_name}-sg-rds"
        }
    }
}

resource "aws_db_subnet_group" "main" {
    name = "${var.project_name}-db-subnet-group"
    subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]
    tags = {
        Name = "${var.project_name}-db-subnet-group"
    }
}

resource "aws_db_instance" "postgres" {
    identifier = "${var.project_name}-postgres"
    engine = "postgres"
    engine_version = "18"
    instance_class = "db.t3.micro"
    allocated_storage = 20
    db_name = var.db_name
    username = var.db_username
    password = var.db_password
    db_subnet_group_name = aws_db_subnet_group.main.name
    vpc_security_group_ids = [aws_security_group.rds.id]
    skip_final_snapshot = true
    backup_retention_period = 7
    deletion_protection = false
    tags = {
        Name = "${var.project_name}-rds"
        Environment = var.environment
    }
}

resource "aws_key_pair" "deployer" {
  key_name = "${var.project_name}-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_instance" "api" {
    ami = data.aws_ami.ubuntu.id
    instance_type = var.ec2_instance_type
    subnet_id = aws_subnet.public.id
    vpc_security_group_ids = [aws_security_group.ec2.id]
    key_name = aws_key_pair.deployer.key_name
    user_data = templatefile("${path.module}/user_data.sh", {
        db_host = aws_db_instance.postgres.address
        db_port = "5432"
        db_name = var.db_name
        db_username        = var.db_username
        db_password        = var.db_password
        jwt_secret         = var.jwt_secret
        dockerhub_username = var.dockerhub_username
    })
    tags = {
        Name = "${var.project_name}-ec2"
        Environment = var.environment
    }
}

resource "aws_eip" "api" {
  instance = aws_instance.api.id
  domain = "vpc"
  tags = {
    Name = "${var.project_name}-eip"
  }
}