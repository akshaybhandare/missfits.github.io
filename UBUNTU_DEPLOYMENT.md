# Ubuntu Server Deployment Guide

## 🚀 Quick Ubuntu Server Setup

### Step 1: Clone the Repository

```bash
# SSH into your Ubuntu server
ssh username@your-server-ip

# Clone the project
git clone https://github.com/akshaybhandare/missfits.github.io.git
cd missfits.github.io
```

### Step 2: Choose Your Deployment Method

## Option A: Simple Static Website (Recommended)

**Perfect for: Maximum reliability, minimal resources**

```bash
# Install nginx (if not already installed)
sudo apt update
sudo apt install nginx -y

# Copy website files to nginx directory
sudo cp -r * /var/www/html/
sudo chown -R www-data:www-data /var/www/html/

# Start nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Check if it's working
curl http://localhost
```

Your website is now live at `http://your-server-ip`! 🎉

## Option B: Website + API (Enhanced Features)

**Perfect for: Advanced features with API endpoints**

### Install Dependencies

```bash
# Install Python and nginx
sudo apt update
sudo apt install nginx python3 python3-pip python3-venv -y

# Copy website files
sudo cp -r *.html css/ data/ img/ js/ *.css *.json *.xml *.txt /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

### Setup API

```bash
# Create API directory
sudo mkdir -p /opt/missfits-api
sudo cp -r api/* /opt/missfits-api/
cd /opt/missfits-api

# Create virtual environment
sudo python3 -m venv venv
sudo ./venv/bin/pip install -r requirements.txt

# Create environment file
sudo cp .env.example .env
sudo nano .env  # Edit if needed
```

### Setup Systemd Service

```bash
# Install the service
sudo cp missfits-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable missfits-api
sudo systemctl start missfits-api

# Check API status
sudo systemctl status missfits-api
```

### Configure Nginx for API

```bash
# Copy nginx configuration
sudo cp nginx-config.conf /etc/nginx/sites-available/missfits
sudo ln -s /etc/nginx/sites-available/missfits /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx
```

## 🔍 Verify Everything Works

### Check Website
```bash
curl http://your-server-ip
# Should return HTML content
```

### Check API (if deployed)
```bash
curl http://your-server-ip/api/health
# Should return: {"status":"healthy"}

curl http://your-server-ip/api/products
# Should return product JSON
```

## 🛠️ Management Commands

### Static Website
```bash
# Restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
```

### API Management
```bash
# Start API
sudo systemctl start missfits-api

# Stop API (website still works!)
sudo systemctl stop missfits-api

# Restart API
sudo systemctl restart missfits-api

# Check API logs
sudo journalctl -u missfits-api -f

# Check API status
sudo systemctl status missfits-api
```

## 🔧 Troubleshooting

### Website Not Loading
```bash
# Check nginx status
sudo systemctl status nginx

# Check nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### API Not Working (Website Still Works!)
```bash
# Check API service
sudo systemctl status missfits-api

# View API logs
sudo journalctl -u missfits-api -n 50

# Restart API
sudo systemctl restart missfits-api
```

### Port Issues
```bash
# Check what's using ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :8001

# If port 80 is busy, stop apache (if running)
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

## 🔒 Security & Production Setup

### Firewall Setup
```bash
# Allow HTTP and HTTPS
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (for SSL later)
sudo ufw enable
```

### SSL Certificate (Optional)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com
```

### Update Products
```bash
# Edit product data
sudo nano /var/www/html/data/products.json

# If using API, restart it to pick up changes
sudo systemctl restart missfits-api
```

## 📊 Monitoring

### Check Everything
```bash
# Website health
curl -I http://your-server-ip

# API health (if enabled)
curl http://your-server-ip/api/health

# System resources
htop
df -h
```

### Log Monitoring
```bash
# Website access logs
sudo tail -f /var/log/nginx/access.log

# Website error logs
sudo tail -f /var/log/nginx/error.log

# API logs (if enabled)
sudo journalctl -u missfits-api -f
```

## 🎯 Quick Commands Summary

### Deploy Static Website (Simplest)
```bash
git clone https://github.com/akshaybhandare/missfits.github.io.git
cd missfits.github.io
sudo apt install nginx -y
sudo cp -r * /var/www/html/
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Deploy Website + API
```bash
# Follow static steps above, then:
sudo apt install python3 python3-pip python3-venv -y
sudo mkdir -p /opt/missfits-api
sudo cp -r api/* /opt/missfits-api/
cd /opt/missfits-api
sudo python3 -m venv venv
sudo ./venv/bin/pip install -r requirements.txt
sudo cp missfits-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable missfits-api
sudo systemctl start missfits-api
```

## ✅ Success Indicators

- ✅ Website loads at `http://your-server-ip`
- ✅ All pages work (home, products, gallery)
- ✅ Images display correctly
- ✅ Search functionality works
- ✅ API endpoints respond (if deployed)

**Your MISSFITS Boutique website is now live!** 🎉
