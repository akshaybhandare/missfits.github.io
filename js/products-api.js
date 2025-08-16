// Enhanced Product Database Manager with API support and robust fallbacks
class ProductDatabase {
    constructor() {
        this.products = [];
        this.categories = [];
        this.loaded = false;
        this.useAPI = false;
        this.apiHealthy = false;
        this.apiCheckTimeout = 500; // Very fast timeout for API detection
        this.lastAPICheck = 0;
        this.apiCheckInterval = 30000; // Re-check API every 30 seconds
        
        // Determine API base URL based on environment
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.apiBaseUrl = isLocalhost ? 'http://127.0.0.1:8001/api' : '/api';
        
        // Always load JSON first to ensure website works immediately
        this.loadFromJSON().then(() => {
            console.log('✅ Website ready - Products loaded from JSON');
            // Then check for API in background (non-blocking)
            this.detectAPI();
        }).catch(error => {
            console.error('❌ Critical error: Could not load products from JSON:', error);
        });
    }

    // Detect if API is available (non-blocking, fast timeout)
    async detectAPI() {
        const now = Date.now();
        
        // Don't check too frequently
        if (now - this.lastAPICheck < this.apiCheckInterval) {
            return this.apiHealthy;
        }
        
        this.lastAPICheck = now;
        
        try {
            // Create a promise that times out quickly
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.apiCheckTimeout);
            
            const response = await fetch(`${this.apiBaseUrl}/health`, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const health = await response.json();
                if (health.status === 'healthy') {
                    this.apiHealthy = true;
                    this.useAPI = true;
                    console.log('🟢 API is healthy and available');
                    return true;
                }
            }
        } catch (error) {
            // API not available - this is totally fine!
            this.apiHealthy = false;
            this.useAPI = false;
            console.log('🟡 API not available, using local JSON (normal operation)');
        }
        
        return this.apiHealthy;
    }

    // Load products from API or JSON file (always prefer stability)
    async loadProducts() {
        // If we haven't loaded anything yet, load from JSON first
        if (!this.loaded) {
            try {
                const success = await this.loadFromJSON();
                if (success) {
                    console.log('✅ Products loaded from JSON (primary source)');
                }
            } catch (error) {
                console.error('❌ Critical: Failed to load from JSON:', error);
                return false;
            }
        }
        
        // If API is available, try to get fresh data (but don't block the site)
        if (this.useAPI && this.apiHealthy) {
            try {
                await this.loadFromAPI();
                console.log('🔄 Products updated from API');
            } catch (error) {
                console.warn('⚠️ API update failed, keeping JSON data:', error);
                // Website continues to work with JSON data
            }
        }
        
        return this.loaded;
    }

    // Load products from API
    async loadFromAPI() {
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                this.safeAPICall('/products'),
                this.safeAPICall('/categories')
            ]);

            if (productsResponse && categoriesResponse) {
                this.products = productsResponse.products || [];
                this.categories = categoriesResponse.categories || [];
                this.loaded = true;
                return true;
            }
        } catch (error) {
            console.error('Error loading from API:', error);
            throw error;
        }
        return false;
    }

    // Safe API call wrapper with fast timeout and graceful fallback
    async safeAPICall(endpoint, timeout = 2000) {
        if (!this.apiHealthy) {
            throw new Error('API not healthy');
        }
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.warn(`⚠️ API call failed for ${endpoint}:`, error.message);
            this.apiHealthy = false;
            this.useAPI = false;
            throw error;
        }
    }

    // Load products from JSON file (fallback)
    async loadFromJSON() {
        try {
            const response = await fetch('data/products.json');
            const data = await response.json();
            this.products = data.products || [];
            this.categories = data.categories || [];
            this.loaded = true;
            return true;
        } catch (error) {
            console.error('Error loading from JSON:', error);
            return false;
        }
    }

    // Get all products (always works)
    async getAllProducts() {
        // Ensure we have data loaded
        if (!this.loaded) {
            await this.loadFromJSON();
        }
        
        // Try API for fresh data if available
        if (this.useAPI && this.apiHealthy) {
            try {
                const data = await this.safeAPICall('/products');
                return data.products || this.products;
            } catch (error) {
                // Fallback to local data silently
            }
        }
        
        return this.products;
    }

    // Get product by ID (always works)
    async getProductById(id) {
        // Ensure we have data loaded
        if (!this.loaded) {
            await this.loadFromJSON();
        }
        
        // Try API first if available
        if (this.useAPI && this.apiHealthy) {
            try {
                const data = await this.safeAPICall(`/products/${id}`);
                return data.product;
            } catch (error) {
                // Fallback to local data
            }
        }
        
        return this.products.find(product => product.id === id);
    }

    // Get products by category (always works)
    async getProductsByCategory(categoryId) {
        // Ensure we have data loaded
        if (!this.loaded) {
            await this.loadFromJSON();
        }
        
        // Try API first if available
        if (this.useAPI && this.apiHealthy) {
            try {
                const data = await this.safeAPICall(`/products/category/${categoryId}`);
                return data.products || [];
            } catch (error) {
                // Fallback to local data
            }
        }
        
        return this.products.filter(product => product.category === categoryId);
    }

    // Get all categories (always works)
    async getCategories() {
        // Ensure we have data loaded
        if (!this.loaded) {
            await this.loadFromJSON();
        }
        
        // Try API for fresh data if available
        if (this.useAPI && this.apiHealthy) {
            try {
                const data = await this.safeAPICall('/categories');
                return data.categories || this.categories;
            } catch (error) {
                // Fallback to local data silently
            }
        }
        
        return this.categories;
    }

    // Search products by name or tags (always works)
    async searchProducts(query) {
        // Ensure we have data loaded
        if (!this.loaded) {
            await this.loadFromJSON();
        }
        
        // Try API first if available
        if (this.useAPI && this.apiHealthy) {
            try {
                const data = await this.safeAPICall(`/search?q=${encodeURIComponent(query)}`);
                return data.products || [];
            } catch (error) {
                // Fallback to local search
            }
        }
        
        return this.localSearchProducts(query);
    }

    // Local search fallback
    localSearchProducts(query) {
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
                        <span class="view-details">View Details</span>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${this.formatPrice(product.price)}</div>
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
