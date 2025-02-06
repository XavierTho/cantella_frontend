---
layout: post
title: Deployment
search_exclude: true
permalink: /aws-deployment-blog
author: Xavier, Nolan, Zafeer, Armaghan, Jackson, Arush
---

<style>
  p {
    font-size: 18px;
  }
</style>

## Intro

What time is it? Time for deployment! This blog will serve as reference on how we plan to setup and proceed with the deployment of Cantella.

## Pre-Deployment Process
1. Review Frontend & Backend (See Diagram Below)
<img src="{{site.baseurl}}/images/deployment-blog/frontend-backend-diagram.png" width="50%">


2. Assign Admin Roles
- Related issue: https://github.com/XavierTho/cantela_frontend/issues/70

### (3) Prepare Config Files
We selected the port 8202 and updated our config files accordingly
- main.py 
```
  # this runs the flask application on the development server
  if __name__ == "__main__":
      # change name for testing
      app.run(debug=True, host="0.0.0.0", port="8202")
```

- Dockerfile
```
  FROM docker.io/python:3.11

  WORKDIR /

  # --- [Install python and pip] ---
  RUN apt-get update && apt-get upgrade -y && \
      apt-get install -y python3 python3-pip git
  COPY . /

  RUN pip install --no-cache-dir -r requirements.txt
  RUN pip install gunicorn

  ENV GUNICORN_CMD_ARGS="--workers=1 --bind=0.0.0.0:8202"

  EXPOSE 8202

  # Define environment variable
  ENV FLASK_ENV=production

  CMD [ "gunicorn", "main:app" ]
```

- docker-compose.yml
```
      version: '3'
      services:
              web:
                      image: cantella
                      build: .
                      env_file:
                              - .env
                      ports:
                              - "8202:8202"
                      volumes:
                              - ./instance:/instance
                      restart: unless-stopped
```


- nginx_file
```
server {
    listen 80;
    listen [::]:80;
    server_name cantella.stu.nighthawkcodingsociety.com ; # Change server name to the one on R53
    # Configure CORS Headers
    location / { 
        proxy_pass http://localhost:8202; # Change port to port on docker
        # Simple requests
        if ($request_method ~* "(GET|POST|PUT|DELETE)") { # Customize Request methods based on your needs
                add_header "Access-Control-Allow-Origin"  *;
        }
        # Preflighted requests 
        if ($request_method = OPTIONS ) {
                add_header "Access-Control-Allow-Credentials" "true" always;
                add_header "Access-Control-Allow-Origin"  "https://xaviertho.github.io" always;
                add_header "Access-Control-Allow-Methods" "GET, POST, PUT, DELETE, OPTIONS, HEAD"; # Make sure the request methods above match here
                add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
                return 200;
        }
    }
}
```


## Deployment Process
### (1) Create a DNS Record
To create a DNS record, you first have to log into [AWS](https://aws.amazon.com/ec2/)

These are the account details:
```
Account ID: nighthawkcodingsociety
IAM username: ubuntu
Password: REDACTED
```

Once signed in, you should click the button on the home page titled **Route 53**

<img src="{{site.baseurl}}/images/deployment-blog/route53-button.png" width="100%">

The next step (when on the Route 53 page) is to press the **Hosted zones** section on the column to the left.

<img src="{{site.baseurl}}/images/deployment-blog/hosted-zones.png" width="100%">

Here, click on the hosted zone called `stu.nighthawkcodingsociety.com`

<img src="{{site.baseurl}}/images/deployment-blog/nighthawkcodingsociety-hosted-zone.png">

We have made it to the page where we can create a DNS record. Click the button that says `Create record`

<img src="{{site.baseurl}}/images/deployment-blog/create-record-button.png">

When creating a record you need to put in some information. Here is the following information that should be inputted:
```
Record name: name of your project (ex: cantella)
Record type: A - Routes traffic to an IPv4 address and some AWS resources
Value: 3.129.109.200
TTL (seconds): 300
Routing policy: Simple routing
```

Here is this info being inputted on the actual site:
<img src="{{site.baseurl}}/images/deployment-blog/create-record-info.png">

Once all categories have been filled, click the `Create record` button on the bottom right.

If successful, you should receive a notification that a new record was successfully created
<img src="{{site.baseurl}}/images/deployment-blog/record-creation-notification.png">

At this point, you have successfully created a DNS record (which we will use later on).

### (2) AWS Setup
First, login into the [AWS Terminal](https://cockpit.stu.nighthawkcodingsociety.com/system/terminal)

Now run the following commands:

1. Change into the correct directory: `cd ~`
2. Clone your backend repo: `git clone https://github.com/[username]/[repo_name].git`
3. Navigate into your repo: `cd repo_name`
4. Build the site: `docker-compose up -d --build`
5. Test your site: curl localhost:8--- (replace '8---' with your port number)


### 2. Update System & Install Dependencies
```
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx
```

### 3. Clone Repository
```
cd ~
git clone https://github.com/XavierTho/cantella_backend.git backend
cd backend
```

```
git clone https://github.com/XavierTho/cantella_frontend.git frontend
cd frontend
```

### 4. Configure Docker
`Dockerfile`
```
FROM python:3.11
WORKDIR /
RUN apt-get update && apt-get install -y python3-pip git
COPY . /
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn
EXPOSE 8202
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
      - "8202:8202"
    volumes:
      - ./backend/instance:/instance
    restart: unless-stopped
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### 5. Run Docker
`docker-compose up -d --build`

### 6. Set Up Nginx Reverse Proxy
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

### 7. Secure with SSL (HTTPS)
`sudo certbot --nginx`

### 8. Monitor Server Logs & Troubleshoot
```
# Check Nginx logs
sudo journalctl -u nginx --no-pager --since "10 minutes ago"
# Check Docker logs
sudo docker logs $(sudo docker ps -q --filter "name=cantella_backend")
```

### 9. Update and Redeploy
```
cd ~/backend
docker-compose down
git pull
docker-compose up -d --build
```

### 10. Verify Deployment
```
docker-compose ps
docker ps
curl localhost:8202
curl localhost:3000
```