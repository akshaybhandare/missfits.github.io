#!/bin/bash

# MISSFITS Boutique - Ubuntu Server Deployment
# One-command deployment for Ubuntu servers

echo "🛍️ MISSFITS Boutique - Ubuntu Deployment"
echo "========================================"
echo ""

# Check if we're on Ubuntu
if ! grep -q "Ubuntu" /etc/os-release; then
    echo "⚠️  This script is designed for Ubuntu servers"
    echo "For other systems, see UBUNTU_DEPLOYMENT.md"
    exit 1
fi

echo "Choose deployment option:"
echo "1) Static Website Only (Fastest, most reliable)"
echo "2) Website + API (Enhanced features)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "📁 Deploying static website..."
        
        # Install nginx
        sudo apt update
        sudo apt install nginx -y
        
        # Copy website files (exclude api directory)
        sudo rsync -av --exclude='api/' --exclude='.git/' \
            --exclude='*.md' --exclude='deploy*' \
            . /var/www/html/
        
        # Set permissions
        sudo chown -R www-data:www-data /var/www/html/
        sudo chmod -R 755 /var/www/html/
        
        # Start nginx
        sudo systemctl enable nginx
        sudo systemctl start nginx
        
        # Get server IP
        SERVER_IP=$(hostname -I | awk '{print $1}')
        
        echo ""
        echo "🎉 Website deployed successfully!"
        echo "📋 Access your website:"
        echo "  🔗 http://$SERVER_IP"
        echo "  🔗 http://localhost (from server)"
        echo ""
        echo "💡 To check status: sudo systemctl status nginx"
        ;;
        
    2)
        echo "🔧 Deploying website + API..."
        
        # Install dependencies
        sudo apt update
        sudo apt install nginx python3 python3-pip python3-venv -y
        
        # Deploy website files
        sudo rsync -av --exclude='api/' --exclude='.git/' \
            --exclude='*.md' --exclude='deploy*' \
            . /var/www/html/
        
        # Set permissions
        sudo chown -R www-data:www-data /var/www/html/
        
        # Deploy API
        sudo mkdir -p /opt/missfits-api
        sudo cp -r api/* /opt/missfits-api/
        cd /opt/missfits-api
        
        # Setup Python environment
        sudo python3 -m venv venv
        sudo ./venv/bin/pip install -r requirements.txt
        
        # Create environment file
        sudo cp .env.example .env
        
        # Setup systemd service
        sudo cp missfits-api.service /etc/systemd/system/
        sudo systemctl daemon-reload
        sudo systemctl enable missfits-api
        sudo systemctl start missfits-api
        
        # Configure nginx
        sudo cp nginx-config.conf /etc/nginx/sites-available/missfits
        sudo ln -sf /etc/nginx/sites-available/missfits /etc/nginx/sites-enabled/
        sudo rm -f /etc/nginx/sites-enabled/default
        
        # Test nginx config and start
        if sudo nginx -t; then
            sudo systemctl enable nginx
            sudo systemctl restart nginx
        else
            echo "❌ Nginx configuration error"
            exit 1
        fi
        
        # Get server IP
        SERVER_IP=$(hostname -I | awk '{print $1}')
        
        echo ""
        echo "🎉 Full deployment completed!"
        echo "📋 Access your services:"
        echo "  🌐 Website: http://$SERVER_IP"
        echo "  🔧 API: http://$SERVER_IP/api/"
        echo "  📚 API Docs: http://$SERVER_IP/docs"
        echo ""
        echo "💡 Management commands:"
        echo "  Website: sudo systemctl status nginx"
        echo "  API: sudo systemctl status missfits-api"
        echo "  Logs: sudo journalctl -u missfits-api -f"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run again and choose 1 or 2."
        exit 1
        ;;
esac

echo ""
echo "🔒 Security: Configure firewall if needed:"
echo "  sudo ufw allow 22"
echo "  sudo ufw allow 80"
echo "  sudo ufw enable"
echo ""
echo "📊 Monitor with: htop, df -h"
echo "🔄 Website always works, API is optional!"
