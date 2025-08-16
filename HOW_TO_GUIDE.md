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

**IMPORTANT:** The gallery automatically displays all product images from the `img/product/` folder!

### How the Gallery Works

1. **Automatic Loading:** The gallery page automatically finds and displays all images from your `img/product/` folder
2. **Supported Formats:** `.jpg`, `.jpeg`, `.png`, `.webp`
3. **Numbering:** Images should be numbered (1.jpg, 2.jpg, 3.jpg, etc.) up to 50
4. **No Manual Editing:** You don't need to edit any HTML files!

### To Add Images to Gallery

1. **Take your photos** and save them as high-quality images
2. **Name them with numbers:** `10.jpg`, `11.jpg`, `12.jpg`, etc. (continue from where you left off)
3. **Put them in the `img/product/` folder**
4. **That's it!** They will automatically appear in both:
   - The gallery page
   - Available for use in products

### Image Requirements

- **File formats:** `.jpg`, `.jpeg`, `.png`, or `.webp`
- **File size:** Keep under 500KB for faster loading
- **Quality:** Use good lighting and clear shots
- **Naming:** Use sequential numbers (10.jpg, 11.jpg, 12.jpg, etc.)

**Note:** The gallery shows ALL product images, so make sure all images in `img/product/` are ones you want to display publicly!

---

## 📁 File Organization

```
Your Website Folder/
├── data/
│   └── products.json          ← Product information goes here
├── img/
│   ├── product/              ← ALL product photos go here (1.jpg, 2.jpg, etc.)
│   │   ├── 1.jpg             ← These appear in gallery automatically
│   │   ├── 2.jpg             ← AND can be used for products
│   │   ├── 3.jpg             ← Keep adding with next number
│   │   └── ...
│   ├── logo.png              ← Website logo
│   └── title.svg             ← Website title
├── gallery.html              ← Gallery page (auto-loads from img/product/)
├── index.html                ← Homepage
└── (other files)
```

### Key Points:

- **Gallery images = Product images:** The gallery automatically shows all images from `img/product/`
- **Sequential numbering:** Use 1.jpg, 2.jpg, 3.jpg, etc.
- **Next image number:** Currently you have images 1-9, so add new images starting from 10.jpg
- **Automatic display:** No need to edit HTML files for gallery updates

---

## ✅ Quick Checklist

### When Adding a New Product:

- [ ] Photos uploaded to `img/product/` folder
- [ ] Product info added to `products.json`
- [ ] Used a unique product ID (product-004, product-005, etc.)
- [ ] Checked the website to make sure it shows up

### When Adding Gallery Images:

- [ ] Photos uploaded to `img/product/` folder with sequential numbers
- [ ] Used next available number (currently start from 10.jpg)
- [ ] Checked gallery page automatically shows new images
- [ ] Verified image quality and size (under 500KB)

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
