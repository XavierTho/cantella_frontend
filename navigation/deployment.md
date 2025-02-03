---
layout: post
title: AWS Deployment
search_exclude: true
permalink: /aws-deployment-blog
author: Xavier, Nolan, Zafeer, Armaghan, Jackson, Arush
---

## Intro

What time is it? Time for deployment! This blog will serve as reference on how we plan to setup and proceed with the deployment of Cantella.

## Pre-Deployment Process
1. Review Frontend & Backend (See Diagram Below)
<img src="{{site.baseurl}}/images/frontend-backend-diagram.png" width="50%">


2. Assign Admin Roles
3. Prepare Config Files
4. Set up a Test Server 
5. Choose Port (8223)
6. Configure AWS Account

## Deployment Process
1. Configure AWS EC2 Instance
```
# Login to AWS EC2
ssh ubuntu@<aws-ip>
```

2. Update System & Install Dependencies
```
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx
```

3. Clone Repository
```
cd ~
git clone https://github.com/XavierTho/cantella_backend.git backend
cd backend
```

```
git clone https://github.com/XavierTho/cantella_frontend.git frontend
cd frontend
```

4. Configure Docker
`Dockerfile`
```
FROM python:3.11
WORKDIR /
RUN apt-get update && apt-get install -y python3-pip git
COPY . /
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn
EXPOSE 8223
CMD [ "gunicorn", "main:app" ]
```

`docker-compose.yml`
```
version: '3'
services:
  backend:
    build: ./backend
    env_file:
      - backend/.env
    ports:
      - "8087:8087"
    volumes:
      - ./backend/instance:/instance
    restart: unless-stopped
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    restart: unless-stopped
```

5. Run Docker
`docker-compose up -d --build`

6. Set Up Nginx Reverse Proxy
Create an Nginx Config File
```
cd /etc/nginx/sites-available
sudo nano cantella
```

Add Configuration:
```
server {
    listen 80;
    server_name cantella.nighthawkcodingsociety.com;
    location / {
        proxy_pass http://localhost:8087;
    }
    location /frontend/ {
        proxy_pass http://localhost:3000/;
    }
}
```
Enable and Restart Nginx
```
cd /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/cantella /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

7. Secure with SSL (HTTPS)
`sudo certbot --nginx`

8. Monitor Server Logs & Troubleshoot
```
# Check Nginx logs
sudo journalctl -u nginx --no-pager --since "10 minutes ago"
# Check Docker logs
sudo docker logs $(sudo docker ps -q --filter "name=cantella_backend")
```

9. Update and Redeploy
```
cd ~/backend
docker-compose down
git pull
docker-compose up -d --build
```

10. Verify Deployment
```
docker-compose ps
docker ps
curl localhost:8223
curl localhost:3000
```