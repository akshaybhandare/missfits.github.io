// Product Database Manager
class ProductDatabase {
    constructor() {
        this.products = [];
        this.categories = [];
        this.loaded = false;
    }

    // Load products from JSON file
    async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            const data = await response.json();
            this.products = data.products || [];
            this.categories = data.categories || [];
            this.loaded = true;
            return true;
        } catch (error) {
            console.error('Error loading products:', error);
            return false;
        }
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Get products by category
    getProductsByCategory(categoryId) {
        return this.products.filter(product => product.category === categoryId);
    }

    // Get all categories
    getCategories() {
        return this.categories;
    }

    // Search products by name or tags
    searchProducts(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    }

    // Get featured products (first 3 for preview)
    getFeaturedProducts(limit = 3) {
        return this.products.slice(0, limit);
    }

    // Generate product URL
    getProductUrl(productId) {
        return `product.html?id=${productId}`;
    }

    // Get related products (same category, excluding current product)
    getRelatedProducts(productId, limit = 3) {
        const currentProduct = this.getProductById(productId);
        if (!currentProduct) return [];
        
        return this.products
            .filter(product => 
                product.category === currentProduct.category && 
                product.id !== productId
            )
            .slice(0, limit);
    }

    // Get product navigation (next/previous)
    getProductNavigation(productId) {
        const currentIndex = this.products.findIndex(product => product.id === productId);
        if (currentIndex === -1) return { prev: null, next: null };

        const prevProduct = currentIndex > 0 ? this.products[currentIndex - 1] : null;
        const nextProduct = currentIndex < this.products.length - 1 ? this.products[currentIndex + 1] : null;

        return {
            prev: prevProduct,
            next: nextProduct
        };
    }
}

// Create global instance
window.productDB = new ProductDatabase();

// Utility functions for product display
const ProductUtils = {
    // Format price display
    formatPrice(price) {
        return price;
    },

    // Create product card HTML
    createProductCard(product, showLink = true) {
        const cardClass = showLink ? 'product-card clickable' : 'product-card';
        const linkStart = showLink ? `<a href="${window.productDB.getProductUrl(product.id)}" class="product-link">` : '';
        const linkEnd = showLink ? '</a>' : '';

        return `
            <div class="${cardClass}" data-product-id="${product.id}">
                ${linkStart}
                <div class="product-image">
                    <img src="${product.mainImage}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <span class="view-details">View Design Details</span>
                    </div>
                    <span class="design-pattern-label">Design Pattern</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name} Pattern</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="service-info">Available for custom stitching</p>
                    <div class="product-category">${product.category}</div>
                </div>
                ${linkEnd}
            </div>
        `;
    },

    // Create product gallery
    createProductGallery(images, productName) {
        const mainImage = images[0];
        const thumbnails = images.slice(1);

        return `
            <div class="product-gallery">
                <div class="main-image">
                    <img id="mainProductImage" src="${mainImage}" alt="${productName}">
                </div>
                ${thumbnails.length > 0 ? `
                <div class="thumbnail-images">
                    <img class="thumbnail active" src="${mainImage}" alt="${productName}" onclick="changeMainImage('${mainImage}')">
                    ${thumbnails.map(img => `
                        <img class="thumbnail" src="${img}" alt="${productName}" onclick="changeMainImage('${img}')">
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;
    },

    // Change main product image
    changeMainImage(imageSrc) {
        const mainImg = document.getElementById('mainProductImage');
        if (mainImg) {
            mainImg.src = imageSrc;
            
            // Update thumbnail active state
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
                if (thumb.src.includes(imageSrc)) {
                    thumb.classList.add('active');
                }
            });
        }
    },

    // Create breadcrumb navigation
    createBreadcrumb(product) {
        const category = window.productDB.getCategories().find(cat => cat.id === product.category);
        const categoryName = category ? category.name : product.category;

        return `
            <nav class="breadcrumb">
                <a href="index.html">Home</a>
                <span class="separator">›</span>
                <a href="store.html">Store</a>
                <span class="separator">›</span>
                <span class="current">${product.name}</span>
            </nav>
        `;
    }
};

// Make utility functions globally available
window.ProductUtils = ProductUtils;
window.changeMainImage = ProductUtils.changeMainImage;
