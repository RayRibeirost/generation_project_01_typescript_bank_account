variable "aws_region" {
  description = "AWS Region"
  type = string
  default = "us-east-1"
}

variable "project-name" {
    description = "Project Name, prefix of all resources"
    type = string
    default = "bank-account"
}

variable "environment" {
  description = "Deploy environment"
  type = string
  default = "prod"
}

variable "db_username" {
    description = "Database User"
    type = string
    sensitive = true
}

variable "db_password" {
    description = "Database Password"
    type = string
    sensitive = true
}

variable "db_name" {
    description = "Database Name"
    type = string
    default = "bankdb"
}

variable "jwt_secret" {
    description = "JWT Secret"
    type = string
    sensitive = true
}

variable "dockerhub_username" {
  description = "DockerHub User"
  type = string
}

variable "ec2_instance_type" {
    description = "EC2 instance type"
    type = string
    default = "t3.micro"
}

variable "allowed_ssh_cidr" {
    description = "CIDR for SSH"
    type = string
    default = "0.0.0.0/0"
}