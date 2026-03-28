# 🚀 AWS EC2 Deployment Guide

Follow these steps to deploy your containerized full-stack application to AWS using an EC2 instance.

## 1. Prepare Local Environment
1. Make sure you have **Docker Desktop** running.
2. Run `docker-compose up --build -d` to verify it works locally.
3. Access the frontend at `http://localhost:80` and ensure it connects to your backend correctly.
4. Push all your code to a GitHub repository:
   ```bash
   git add .
   git commit -m "Add Docker configuration"
   git push origin main
   ```

## 2. Provision AWS EC2 Instance
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Go to **EC2** -> **Instances** -> **Launch instances**.
3. **Name**: `crud-task-server`
4. **OS Image**: Select **Ubuntu 24.04 LTS**.
5. **Instance Type**: Select `t2.micro` (Free tier eligible).
6. **Key Pair**: Create a new key pair (e.g., `crud-task-key.pem`), download it, and keep it safe.
7. **Network Settings**:
   - Check **Allow SSH traffic from Anywhere**.
   - Check **Allow HTTP traffic from the internet**.
   - Check **Allow HTTPS traffic from the internet**.
8. **Storage**: Leave default (8 GiB).
9. Click **Launch instance**.

## 3. Connect to the EC2 Instance
1. Open your terminal where you downloaded your `.pem` key file.
2. Fix permissions for the key:
   ```bash
   chmod 400 crud-task-key.pem
   ```
3. Connect using SSH:
   ```bash
   ssh -i "crud-task-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
   ```

## 4. Install Docker on EC2
Once connected to your EC2 instance via SSH, run the following to install Docker and Docker-Compose:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group so you don't need 'sudo' every time
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# IMPORTANT: Log out and log back in to apply the group change
exit
ssh -i "crud-task-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

## 5. Deploy the Application
Now, pull your code and run it:

```bash
# Clone your repository (use HTTPS if your repository is public, or setup deploy keys if private)
git clone https://github.com/rohitsinghnaruka/CRUD-task-intern.git
cd CRUD-task-intern

# Setup the backend environment file
cd backend
nano .env
```

Paste your `.env` contents here (including your MongoDB Atlas URL and JWT Secret):
```ini
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://Rohit1206:Rohit%401206@crud-task.kqqvru3.mongodb.net/crud-task?retryWrites=true&w=majority&appName=CRUD-task
JWT_SECRET=your_production_secret_key
JWT_EXPIRES_IN=7d
```
Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

```bash
# Go back to the root directory
cd ..

# Build and start the containers in the background!
docker-compose up -d --build
```

## 6. Access Your Live Application!
Open your web browser and go to your EC2 Public IP address directly:
`http://<YOUR_EC2_PUBLIC_IP>`

You should see your fully functioning, containerized application live on AWS! 🎉
