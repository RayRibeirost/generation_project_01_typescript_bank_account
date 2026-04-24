output "ec2_public_ip" {
  description = "EC2 public IP"
  value = aws_eip.api.public_ip
}

output "rds_endpoint" {
    description = "RDS endpoint"
    value = aws_db_instance.postgres.address
    sensitive = true
}

output "api_url" {
    description = "API URL"
    value = "http://${aws_eip.api.public_ip}:3000"
}

output "swagger_url" {
    description = "Swagger URL"
    value = "http://${aws_eip.api.public_ip}:3000/api/docs"
}