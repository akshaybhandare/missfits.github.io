# MissFits Boutique Website - Developer Guide

This guide provides step-by-step instructions for managing content on the MissFits Boutique website, including adding products, managing featured products, and updating the gallery.

## Table of Contents

1. [Adding a New Product](#adding-a-new-product)
2. [Managing Featured Products](#managing-featured-products)
3. [Adding Images to Gallery](#adding-images-to-gallery)
4. [File Structure Overview](#file-structure-overview)
5. [Best Practices](#best-practices)

---

## Adding a New Product

### Step 1: Prepare Product Images

1. **Image Requirements:**

   - Format: JPG, JPEG, or PNG
   - Recommended size: 1200x1200px minimum
   - File size: Keep under 500KB for faster loading
   - Naming: Use descriptive names (e.g., `floral-blouse-front.jpg`)

2. **Upload Images:**
   - Place product images in the `/img/product/` folder
   - Use sequential numbering (10.jpg, 11.jpg, 12.jpg, etc.) or descriptive names
   - Ensure you have at least one main image for the product

### Step 2: Add Product Data

1. **Open the products file:**

   ```
   /data/products.json
   ```

2. **Add your new product to the "products" array:**
   ```json
   {
     "id": "product-004",
     "name": "Your Product Name",
     "category": "blouses",
     "description": "Short description for product listing (1-2 sentences)",
     "longDescription": "Detailed description for product page (2-3 paragraphs)",
     "price": "₹2,500",
     "images": [
       "img/product/10.jpg",
       "img/product/11.jpg",
       "img/product/12.jpg"
     ],
     "mainImage": "img/product/10.jpg",
     "features": ["Feature 1", "Feature 2", "Feature 3"],
     "care": ["Care instruction 1", "Care instruction 2"],
     "availability": "In Stock",
     "sizes": ["S", "M", "L", "XL"],
     "colors": ["Color 1", "Color 2"],
     "material": "Fabric type",
     "tags": ["tag1", "tag2", "tag3"]
   }
   ```

### Step 3: Available Categories

Use one of these existing categories:

- `"blouses"` - For blouses and tops
- `"kurtas"` - For kurtas and traditional tops
- `"sarees"` - For sarees
- `"dresses"` - For modern and fusion dresses

### Step 4: Product ID Guidelines

- Use format: `product-XXX` where XXX is a sequential number
- Check existing products to ensure unique ID
- Current products use: `product-001`, `product-002`, `product-003`

### Step 5: Test Your Addition

1. Save the `products.json` file
2. Open the website in a browser
3. Check that your product appears in:
   - Store page (`store.html`)
   - Search results
   - Category filtering

---

## Managing Featured Products

### How Featured Products Work

- Featured products appear on the homepage as preview items
- The system automatically shows the **first 3 products** from the `products.json` file
- These are displayed in the "preview-images" section on the homepage

### To Change Featured Products:

#### Method 1: Reorder Products in JSON

1. Open `/data/products.json`
2. Move your desired featured products to the **top 3 positions** in the products array
3. The order in the JSON file determines the display order

#### Method 2: Modify the JavaScript Logic

1. Open `/js/products.js`
2. Find the `getFeaturedProducts` function:
   ```javascript
   getFeaturedProducts(limit = 3) {
       return this.products.slice(0, limit);
   }
   ```
3. To feature specific products by ID, replace with:
   ```javascript
   getFeaturedProducts(limit = 3) {
       const featuredIds = ['product-001', 'product-003', 'product-002'];
       return featuredIds.map(id => this.getProductById(id)).filter(Boolean);
   }
   ```

### Featured Product Display Details:

- Each featured product shows:
  - Main product image
  - Product name
  - Short description
  - Links to the full product page
- Hover effects reveal additional information
- Images are automatically cropped to fit the preview containers

---

## Adding Images to Gallery

### Understanding the Gallery Structure

**IMPORTANT:** The gallery page (`gallery.html`) automatically loads and displays all images from the `/img/product/` folder. You do NOT need to manually edit the HTML file.

### How the Automatic Gallery Works

The gallery uses JavaScript to:

1. Scan the `/img/product/` folder for images numbered 1-50
2. Check for multiple file extensions: `.jpg`, `.jpeg`, `.png`, `.webp`
3. Automatically create gallery items for each found image
4. Display them in a responsive grid layout

### Step 1: Prepare Gallery Images

1. **Image Requirements:**

   - Format: JPG, JPEG, PNG, or WebP
   - Recommended size: 800x600px or larger
   - Keep file size under 500KB for optimal loading
   - Use sequential numbering (e.g., 10.jpg, 11.jpg, 12.jpg)

2. **Upload Images:**
   - Place images in `/img/product/` folder ONLY
   - Use the next available number (currently 10.jpg and up)
   - The gallery will automatically detect and display them

### Step 2: Current Image Status

Based on the current folder structure:

- **Existing images:** 1.jpg through 9.jpg (and 7.jpeg)
- **Next available numbers:** Start from 10.jpg
- **Supported extensions:** .jpg, .jpeg, .png, .webp

### Step 3: No Manual HTML Editing Required

Unlike traditional galleries, you do NOT need to:

- Edit `gallery.html`
- Add `<img>` tags manually
- Update any HTML code

The gallery automatically:

- Detects new images
- Creates proper HTML structure
- Handles image loading and display
- Provides modal viewing and zoom functionality

### Example: Adding New Gallery Images

1. **Save your images as:**

   ```
   /img/product/10.jpg
   /img/product/11.jpg
   /img/product/12.jpg
   ```

2. **That's it!** The gallery will automatically show these images.

### Important Notes

- **All product folder images appear in gallery:** Every image in `/img/product/` will be visible in the public gallery
- **Use consistent numbering:** Continue the sequence (10, 11, 12, etc.)
- **Multiple extensions supported:** You can mix .jpg, .jpeg, .png, .webp files
- **Loading is automatic:** The JavaScript handles everything

---

## File Structure Overview

```
missfits.github.io/
├── data/
│   └── products.json          # All product data
├── img/
│   ├── product/              # Product images (numbered 1.jpg, 2.jpg, etc.)
│   │   ├── 1.jpg             # These images serve DUAL purpose:
│   │   ├── 2.jpg             # 1. Available for product listings
│   │   ├── 3.jpg             # 2. Automatically shown in gallery
│   │   └── ...               # Gallery scans this folder automatically
│   ├── logo.png              # Site logo
│   └── title.svg             # Title image
├── js/
│   ├── products.js           # Product management logic
│   └── search.js             # Search functionality
├── css/
│   ├── product.css           # Product page styles
│   └── search.css            # Search styles
├── index.html                # Homepage with featured products
├── gallery.html              # Gallery page (auto-loads from img/product/)
├── product.html              # Individual product page
├── store.html                # All products listing
└── styles.css                # Main stylesheet
```

---

## Best Practices

### Product Management

1. **Consistent Naming:** Use consistent naming conventions for product IDs and image files
2. **Image Optimization:** Compress images before uploading to ensure fast loading
3. **Backup:** Always backup `products.json` before making changes
4. **Testing:** Test on different devices and browsers after adding products

### Image Guidelines

1. **Quality:** Use high-quality images that showcase the product clearly
2. **Consistency:** Maintain consistent lighting and background for product photos
3. **Multiple Angles:** Include front, back, and detail shots for each product
4. **Alt Text:** Write descriptive alt text for accessibility

### Content Guidelines

1. **Descriptions:** Write clear, engaging product descriptions
2. **SEO:** Include relevant keywords in product names and descriptions
3. **Pricing:** Keep pricing format consistent (₹X,XXX)
4. **Categories:** Use existing categories when possible

### Technical Tips

1. **JSON Validation:** Use a JSON validator to check syntax before saving
2. **File Paths:** Always use relative paths (img/product/file.jpg)
3. **Case Sensitivity:** Be mindful of case sensitivity in file names
4. **Special Characters:** Avoid special characters in file names

---

## Troubleshooting

### Product Not Showing

- Check JSON syntax with a validator
- Verify image file paths are correct
- Ensure product ID is unique
- Check that category exists

### Images Not Loading

- Verify file path is correct
- Check file exists in the specified location
- Ensure file extension matches (jpg vs jpeg)
- Check file permissions

### Gallery Issues

- Validate HTML structure
- Check image file paths
- Ensure images are optimized for web

---

## Quick Reference

### New Product Checklist

- [ ] Images uploaded to `/img/product/`
- [ ] Product data added to `products.json`
- [ ] Unique product ID assigned
- [ ] All required fields completed
- [ ] JSON syntax validated
- [ ] Website tested

### Featured Product Update

- [ ] Identify products to feature
- [ ] Reorder in JSON or modify JavaScript
- [ ] Test homepage display
- [ ] Verify links work correctly

### Gallery Update

- [ ] Images optimized and uploaded
- [ ] HTML updated with new gallery items
- [ ] Alt text added for accessibility
- [ ] Gallery page tested

For additional help or questions, refer to the existing code structure or create an issue in the repository.
