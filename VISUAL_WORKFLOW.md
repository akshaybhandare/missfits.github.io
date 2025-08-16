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
│ Prepare Photos  │ -> │ Upload to img/  │ -> │ AUTOMATIC       │
│                 │    │ product/ folder │    │ Gallery Update  │
│ • Good quality  │    │                 │    │                 │
│ • Sequential    │    │ 10.jpg          │    │ Gallery page    │
│   numbers       │    │ 11.jpg          │    │ automatically   │
│ • Under 500KB   │    │ 12.jpg          │    │ finds & shows   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        |
                                                        v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Check Gallery   │ <- │   Images Now    │ <- │ NO HTML Editing │
│ Page Works      │    │   Available     │    │ Required!       │
│                 │    │                 │    │                 │
│ • Images load   │    │ • For gallery   │    │ JavaScript      │
│ • Modal works   │    │ • For products  │    │ handles         │
│ • Zoom works    │    │                 │    │ everything      │
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
│   ├── 📁 product/ ← PUT ALL PHOTOS HERE (dual purpose!)
│   │   ├── 🖼️ 1.jpg    ← Available for products AND gallery
│   │   ├── 🖼️ 2.jpg    ← Gallery auto-shows ALL these images
│   │   ├── 🖼️ 3.jpg    ← Next: add 10.jpg, 11.jpg, etc.
│   │   └── 🖼️ ...
│   ├── 🖼️ logo.png ← Website logo
│   └── 🖼️ title.svg ← Website title
│
├── 📄 gallery.html ← AUTO-loads from img/product/
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
│   ├── Just add numbered images to img/product/
│   │   ├── Yes → Upload 10.jpg, 11.jpg, etc. to img/product/
│   │   └── No → Take/prepare photos first
│   └── Gallery updates automatically!
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

1. Upload numbered image to img/product/ folder (e.g., 10.jpg)
2. Gallery automatically detects and displays it
3. Image is now available for products too
4. Done! ✨

Remember: Always backup before making changes! 🛡️
