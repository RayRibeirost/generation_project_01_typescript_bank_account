#!/bin/bash
set -e
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable docker
systemctl start docker
usermod -aG docker ubuntu
mkdir -p /app
cd /app
cat > /app/.env << 'EOF'
DATABASE_HOST=${db_host}
DATABASE_PORT=${db_port}
DATABASE_USER=${db_username}
DATABASE_PASSWORD=${db_password}
DATABASE_NAME=${db_name}
JWT_SECRET=${jwt_secret}
JWT_EXPIRES_IN=1d
EOF
cat > /app/docker-compose.yml << 'EOF'
services:
  api:
    image: ${dockerhub_username}/bank-account-api:latest
    container_name: bank_api
    restart: unless-stopped
    ports:
      - '3000:3000'
    env_file:
      - .env
EOF
docker pull ${dockerhub_username}/bank-account-api:latest
docker compose up -d

echo "Deploy concluido: $(date)" >> /var/log/deploy.log