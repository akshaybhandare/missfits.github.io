# MISSFITS Boutique Website

A modern, responsive website for MISSFITS Boutique featuring a robust product database system and dynamic product pages.

## Features

### 🛍️ Product Database System

- **JSON-based product database** stored in `data/products.json`
- **Dynamic product pages** with detailed information
- **Category-based filtering** in the gallery
- **Product search functionality** with live results
- **Related products suggestions**
- **Product navigation** (next/previous)

### 🎨 Modern Design

- **Responsive design** that works on all devices
- **Clean, modern UI** with smooth animations
- **Image galleries** with thumbnail navigation
- **SEO optimized** with proper meta tags and sitemap

### 📱 User Experience

- **Fast loading** with optimized images
- **Search functionality** with autocomplete suggestions
- **Easy navigation** between products
- **Contact integration** (phone, WhatsApp, social media)
- **Mobile-first design** for better mobile experience

## File Structure

```
/
├── index.html              # Homepage with featured products
├── gallery.html            # Product gallery with filtering
├── product.html            # Dynamic product detail pages
├── styles.css              # Main stylesheet
├── sitemap.xml             # SEO sitemap
├── data/
│   └── products.json       # Product database
├── css/
│   ├── product.css         # Product page styles
│   └── search.css          # Search functionality styles
├── js/
│   ├── products.js         # Product database manager
│   └── search.js           # Search functionality
├── img/
│   ├── title.svg           # Logo
│   └── product/            # Product images
└── favicon.svg             # Site favicon
```

## Product Database Structure

The product database (`data/products.json`) contains:

### Product Object

```json
{
  "id": "product-001",
  "name": "Product Name",
  "category": "category-id",
  "description": "Short description",
  "longDescription": "Detailed description",
  "price": "₹2,500",
  "images": ["img1.jpg", "img2.jpg"],
  "mainImage": "img1.jpg",
  "features": ["Feature 1", "Feature 2"],
  "care": ["Care instruction 1"],
  "availability": "In Stock",
  "sizes": ["S", "M", "L"],
  "colors": ["Color 1", "Color 2"],
  "material": "Material type",
  "tags": ["tag1", "tag2"]
}
```

### Category Object

```json
{
  "id": "category-id",
  "name": "Category Name",
  "description": "Category description"
}
```

## How to Add New Products

1. **Add product images** to the `img/product/` folder
2. **Update the database** by editing `data/products.json`:
   - Add a new product object with a unique ID
   - Include all required fields
   - Reference the correct image paths
3. **Update sitemap** by adding the new product URL to `sitemap.xml`

### Example: Adding a New Product

```json
{
  "id": "product-004",
  "name": "Beautiful New Design",
  "category": "blouses",
  "description": "A stunning new addition to our collection",
  "longDescription": "Detailed description of the new product...",
  "price": "₹3,000",
  "images": ["img/product/new1.jpg", "img/product/new2.jpg"],
  "mainImage": "img/product/new1.jpg",
  "features": ["Handcrafted", "Premium quality"],
  "care": ["Dry clean only"],
  "availability": "In Stock",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Blue", "Red"],
  "material": "Silk",
  "tags": ["new", "premium", "handcrafted"]
}
```

## Development

### Local Development

1. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser

### Testing

- Test all pages: homepage, gallery, individual product pages
- Verify search functionality works
- Check responsive design on different screen sizes
- Ensure all product links work correctly

## SEO Features

- **Structured data** with JSON-LD for better search engine understanding
- **Open Graph tags** for social media sharing
- **Optimized images** with proper alt tags
- **XML sitemap** for search engine crawling
- **Mobile-friendly** responsive design

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Contact Information

- **Phone**: +917975495202
- **Email**: manya@missfitsbymanya.store
- **Instagram**: @missfits_boutique_og
- **Website**: https://missfitsbymanya.store

## License

© 2024 MISSFITS Boutique. All Rights Reserved.
