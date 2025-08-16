# MissFits Website - Visual Workflow Guide

## 🔄 Adding New Product - Step by Step

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Take Photos   │ -> │  Upload Images  │ -> │  Edit JSON File │
│                 │    │                 │    │                 │
│ • Front view    │    │ img/product/    │    │ data/           │
│ • Back view     │    │ 10.jpg          │    │ products.json   │
│ • Detail shots  │    │ 11.jpg          │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        |
                                                        v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Test Website  │ <- │   Save Files    │ <- │  Add Product    │
│                 │    │                 │    │   Information   │
│ • Check store   │    │ • products.json │    │                 │
│ • Check search  │    │ • All images    │    │ • Name, price   │
│ • Check product │    │                 │    │ • Description   │
│   page         │    │                 │    │ • Images list   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌟 Making Products Featured

```
Current Homepage Featured Products = First 3 Products in JSON

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Open products.  │ -> │ Move products   │ -> │ Save & Check    │
│ json file      │    │ to TOP 3 spots  │    │ homepage        │
│                 │    │                 │    │                 │
│ Example:        │    │ 1. Silk Blouse  │    │ Featured items  │
│ [product-001,   │    │ 2. Cotton Kurta │    │ automatically   │
│  product-002,   │    │ 3. Designer     │    │ update!         │
│  product-003]   │    │    Saree        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📸 Adding Gallery Images

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Prepare Photos  │ -> │ Upload to img/  │ -> │ Edit gallery.   │
│                 │    │ folder          │    │ html file       │
│ • Good quality  │    │                 │    │                 │
│ • Descriptive   │    │ fashion-1.jpg   │    │ Add:            │
│   names         │    │ embroidery-2.   │    │ <div class=     │
│ • Under 300KB   │    │ jpg             │    │ "gallery-item"> │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        |
                                                        v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Check Gallery   │ <- │   Save File     │ <- │ Add Image Tags  │
│ Page Works      │    │                 │    │                 │
│                 │    │ gallery.html    │    │ <img src="img/  │
│ • Images load   │    │                 │    │ photo.jpg"      │
│ • Layout looks  │    │                 │    │ alt="describe   │
│   good          │    │                 │    │ photo">         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📂 File Organization Map

```
missfits.github.io/
│
├── 📁 data/
│   └── 📄 products.json ← EDIT THIS for products
│
├── 📁 img/
│   ├── 📁 product/ ← PUT PRODUCT PHOTOS HERE
│   │   ├── 🖼️ 1.jpg
│   │   ├── 🖼️ 2.jpg
│   │   └── 🖼️ ...
│   └── 🖼️ gallery photos ← PUT GALLERY PHOTOS HERE
│
├── 📄 gallery.html ← EDIT THIS for gallery
├── 📄 index.html (homepage)
├── 📄 store.html (all products)
└── 📄 product.html (individual product)
```

## 🎯 Quick Decision Tree

```
What do you want to do?
│
├── Add New Product?
│   ├── Do you have photos?
│   │   ├── Yes → Follow "Adding New Product" workflow
│   │   └── No → Take photos first
│   └──
│
├── Change Featured Products?
│   └── Reorder first 3 products in products.json
│
├── Add Gallery Images?
│   ├── Do you have photos?
│   │   ├── Yes → Follow "Adding Gallery Images" workflow
│   │   └── No → Take/prepare photos first
│   └──
│
└── Something else?
    └── Check DEVELOPER_GUIDE.md for detailed instructions
```

## ⚡ Speed Tips

**Fastest way to add product:**

1. Copy existing product in JSON ✂️
2. Change details 📝
3. Upload photos 📸
4. Update image paths 🔗
5. Save & test ✅

**Fastest way to change featured:**

1. Cut & paste products to top 3 positions in JSON
2. Save file
3. Done! ✨

**Fastest way to add gallery image:**

1. Upload image to img/ folder
2. Copy existing gallery item HTML
3. Change image name and description
4. Save & check

Remember: Always backup before making changes! 🛡️
