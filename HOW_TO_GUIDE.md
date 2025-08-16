# MissFits Website - Quick How-To Guide

This is a simplified guide for managing the MissFits boutique website content.

## 🛍️ Adding a New Product

### Step 1: Get Your Product Images Ready

1. Take good quality photos of your product
2. Save them as `.jpg` files
3. Name them with numbers like `10.jpg`, `11.jpg`, `12.jpg`
4. Put them in the `img/product/` folder

### Step 2: Add Product Information

1. Open the file: `data/products.json`
2. Copy the format from an existing product
3. Change the details for your new product:

```json
{
  "id": "product-004",
  "name": "Beautiful Silk Blouse",
  "category": "blouses",
  "description": "A gorgeous hand-stitched silk blouse perfect for special occasions",
  "price": "₹3,500",
  "images": ["img/product/10.jpg", "img/product/11.jpg"],
  "mainImage": "img/product/10.jpg",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Red", "Blue", "Gold"],
  "availability": "In Stock"
}
```

3. Make sure to:
   - Use a new product ID (like product-004, product-005, etc.)
   - List your image file names correctly
   - Choose the right category: `blouses`, `kurtas`, `sarees`, or `dresses`

---

## ⭐ Making Products Featured on Homepage

The homepage shows the **first 3 products** from your product list as featured items.

### To change featured products:

1. Open `data/products.json`
2. Move your favorite products to the **top** of the list
3. The first 3 products will automatically appear on the homepage

**Example:** If you want "Beautiful Silk Blouse" to be featured, move it to position 1, 2, or 3 in your products list.

---

## 📸 Adding Images to Gallery

### Step 1: Prepare Your Gallery Images

1. Choose your best fashion photos
2. Save them as `.jpg` files with descriptive names like:
   - `embroidered-blouse.jpg`
   - `wedding-collection.jpg`
   - `traditional-kurta.jpg`

### Step 2: Upload Images

1. Put your images in the `img/` folder

### Step 3: Add to Gallery Page

1. Open `gallery.html`
2. Find the section that looks like this:

```html
<div class="gallery-grid"></div>
```

3. Add your new images like this:

```html
<div class="gallery-item">
  <img src="img/your-new-photo.jpg" alt="Description of your photo" />
</div>
```

**Important:** Always write a good description in the `alt=""` part!

---

## 📁 File Organization

```
Your Website Folder/
├── data/
│   └── products.json          ← Product information goes here
├── img/
│   ├── product/              ← Product photos go here (1.jpg, 2.jpg, etc.)
│   └── (other images)        ← Gallery photos go here
├── gallery.html              ← Gallery page to edit
├── index.html                ← Homepage
└── (other files)
```

---

## ✅ Quick Checklist

### When Adding a New Product:

- [ ] Photos uploaded to `img/product/` folder
- [ ] Product info added to `products.json`
- [ ] Used a unique product ID (product-004, product-005, etc.)
- [ ] Checked the website to make sure it shows up

### When Adding Gallery Images:

- [ ] Photos uploaded to `img/` folder
- [ ] Added to `gallery.html` file
- [ ] Included good descriptions for each photo
- [ ] Checked gallery page works

### When Changing Featured Products:

- [ ] Moved desired products to top 3 positions in `products.json`
- [ ] Checked homepage shows the right products

---

## 🚨 Important Notes

1. **Always backup your files** before making changes
2. **Test your website** after making changes
3. **Keep image file sizes small** (under 500KB) for faster loading
4. **Use consistent naming** for your files
5. **Write good descriptions** for all images

---

## 🆘 Common Issues

**Problem:** New product doesn't show up
**Solution:** Check that your product information is correctly formatted in `products.json`

**Problem:** Images don't load
**Solution:** Make sure your image file names in `products.json` match exactly with the actual file names

**Problem:** Website looks broken
**Solution:** Check that you didn't accidentally delete any commas or brackets in `products.json`

---

## 💡 Tips for Success

1. **Start small:** Add one product at a time when you're learning
2. **Use good photos:** Clear, well-lit images make your products look better
3. **Write compelling descriptions:** Help customers understand why they should buy
4. **Keep it organized:** Use consistent naming and organization
5. **Update regularly:** Fresh content keeps customers coming back

Need help? Double-check the file structure and formatting by comparing with existing products!
