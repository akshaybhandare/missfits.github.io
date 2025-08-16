# MISSFITS Boutique Website

A modern, responsive website for MISSFITS Boutique with product catalog and optional API enhancement.

## 🚀 Quick Start

### Local Development
```bash
# Clone and serve static files
git clone https://github.com/akshaybhandare/missfits.github.io.git
cd missfits.github.io
python3 -m http.server 8000
```
Open http://localhost:8000 - everything works instantly!

### Ubuntu Server Deployment
```bash
# One-command deployment on Ubuntu server
git clone https://github.com/akshaybhandare/missfits.github.io.git
cd missfits.github.io
./ubuntu-deploy.sh
# Choose option 1 (static) or 2 (static + API)
```

Your website will be live at `http://your-server-ip`! 

📚 **Detailed Ubuntu guide**: See [UBUNTU_DEPLOYMENT.md](UBUNTU_DEPLOYMENT.md)

### Enhanced with API (Local)
```bash
# Use deployment script for local development
./deploy.sh
# Choose option 2: Website + API
```

## ✨ Features

- **Product Catalog** - Browse all products with categories
- **Search & Filter** - Find products by name, category, or description
- **Product Pages** - Detailed product information with image galleries
- **Responsive Design** - Works perfectly on mobile and desktop
- **Optional API** - Enhanced features without breaking core functionality

## 📁 Structure

```
├── index.html, product.html, store.html    # Main website pages
├── data/products.json                       # Product database
├── js/products-api.js                      # Smart frontend (API + fallback)
├── css/, img/                              # Styles and images
├── api/                                    # Optional API components
│   ├── main.py                            # FastAPI server
│   ├── requirements.txt                   # Dependencies
│   └── README.md                          # API documentation
└── deploy.sh                              # Simple deployment script
```

## 🛠️ API Management

Once deployed with API, you can control it independently:

```bash
# Check API status
sudo systemctl status missfits-api

# Start API (enable enhanced features)
sudo systemctl start missfits-api

# Stop API (website continues working)
sudo systemctl stop missfits-api
```

**Important**: Website always works regardless of API status!

## 📊 Product Data

Edit `data/products.json` to update your catalog:

```json
{
  "products": [
    {
      "id": "product-001",
      "name": "Product Name",
      "category": "blouses",
      "price": "₹2,500",
      "description": "Product description",
      "mainImage": "img/product/1.jpg"
    }
  ]
}
```

## 🎯 Benefits

- ✅ **Reliable** - Website never goes down
- ✅ **Fast** - Instant loading
- ✅ **Simple** - Easy to maintain
- ✅ **Flexible** - API optional

Perfect for businesses that want reliability with room to grow! 🚀
