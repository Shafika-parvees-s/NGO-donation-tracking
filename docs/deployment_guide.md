# AWS EC2 Deployment Guide (Production Step-by-Step)

This document explains how to deploy the **NGO Donation & Impact Tracking Dashboard** to AWS EC2 using Ubuntu 22.04 LTS, Nginx, MySQL, and Certbot SSL.

---

### Step 1: Launch AWS EC2 Instance
1. Login to AWS Management Console -> Go to **EC2**.
2. Click **Launch Instance**.
3. Choose **Ubuntu 22.04 LTS (Free Tier Eligible)**.
4. Instance Type: `t2.micro` or `t3.small`.
5. Key Pair: Create or select `.pem` key pair (`ngo-key.pem`).
6. Security Group Rules:
   - Allow SSH (Port 22)
   - Allow HTTP (Port 80)
   - Allow HTTPS (Port 443)
   - Allow Custom TCP (Port 8080 - Spring Boot)

---

### Step 2: Connect & Install Prerequisites
SSH into your instance:
```bash
chmod 400 ngo-key.pem
ssh -i ngo-key.pem ubuntu@<YOUR-EC2-PUBLIC-IP>

# Update System
sudo apt update && sudo apt upgrade -y

# Install OpenJDK 17, MySQL Server & Nginx
sudo apt install openjdk-17-jdk mysql-server nginx git -y
```

---

### Step 3: Configure MySQL Database
```bash
sudo mysql
```
In MySQL console:
```sql
CREATE DATABASE ngo_impact_db;
CREATE USER 'ngo_user'@'localhost' IDENTIFIED BY 'SecurePass123!';
GRANT ALL PRIVILEGES ON ngo_impact_db.* TO 'ngo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
Import database schema & seed scripts:
```bash
mysql -u ngo_user -p ngo_impact_db < database/schema.sql
mysql -u ngo_user -p ngo_impact_db < database/seed.sql
```

---

### Step 4: Build & Run Spring Boot Backend
```bash
cd backend
./mvnw clean package -DskipTests
nohup java -jar target/ngo-donation-impact-dashboard-1.0.0.jar > app.log 2>&1 &
```

---

### Step 5: Configure Nginx & SSL Certificate
```bash
sudo nano /etc/nginx/sites-available/default
```
Replace content with:
```nginx
server {
    listen 80;
    server_name yourdomain.org www.yourdomain.org;

    location / {
        root /var/www/ngo-frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Install Free Let's Encrypt SSL:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.org -d www.yourdomain.org
```
