# MissFits Website - Quick Reference Card

## 🚀 3 Most Common Tasks

### 1. Add New Product (5 minutes)

```
1. Upload photos → img/product/10.jpg, 11.jpg, 12.jpg
2. Edit data/products.json → copy existing product format
3. Change: id, name, description, price, images, colors, sizes
4. Save and test website
```

### 2. Change Featured Products (2 minutes)

```
1. Open data/products.json
2. Move your 3 favorite products to the TOP of the list
3. Save → they automatically appear on homepage
```

### 3. Add Gallery Image (3 minutes)

```
1. Upload photo → img/your-photo.jpg
2. Edit gallery.html → find <div class="gallery-grid">
3. Add: <div class="gallery-item"><img src="img/your-photo.jpg" alt="description"></div>
4. Save and check gallery page
```

---

## 🎯 File Locations

- **Product Info:** `data/products.json`
- **Product Photos:** `img/product/` folder
- **Gallery Photos:** `img/` folder
- **Gallery Page:** `gallery.html`

---

## 📋 Product Template (Copy & Paste)

```json
{
  "id": "product-XXX",
  "name": "Product Name",
  "category": "blouses",
  "description": "Short description",
  "longDescription": "Detailed description for product page",
  "price": "₹2,500",
  "images": ["img/product/XX.jpg", "img/product/XX.jpg"],
  "mainImage": "img/product/XX.jpg",
  "features": ["Feature 1", "Feature 2"],
  "care": ["Care instruction 1", "Care instruction 2"],
  "availability": "In Stock",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Color 1", "Color 2"],
  "material": "Cotton/Silk/etc",
  "tags": ["tag1", "tag2", "tag3"]
}
```

---

## 🏷️ Categories Available

- `"blouses"` - Blouses and tops
- `"kurtas"` - Kurtas and traditional wear
- `"sarees"` - Sarees
- `"dresses"` - Modern and fusion dresses

---

## ⚠️ Remember

- Always use unique product IDs (product-004, product-005...)
- Keep image files under 500KB
- Test website after changes
- Backup files before editing
