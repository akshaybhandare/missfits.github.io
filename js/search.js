// Search functionality for products
class ProductSearch {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.searchOverlay = null;
        this.isSearchVisible = false;
    }

    // Initialize search functionality
    init() {
        this.createSearchElements();
        this.attachEventListeners();
    }

    // Create search UI elements
    createSearchElements() {
        // Create search overlay
        this.searchOverlay = document.createElement('div');
        this.searchOverlay.className = 'search-overlay';
        this.searchOverlay.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <input type="text" class="search-input" placeholder="Search products..." autocomplete="off">
                    <button class="search-close" aria-label="Close search">&times;</button>
                </div>
                <div class="search-results">
                    <div class="search-suggestions">
                        <h4>Popular Searches</h4>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag" data-search="blouse">Blouses</span>
                            <span class="suggestion-tag" data-search="embroidered">Embroidered</span>
                            <span class="suggestion-tag" data-search="silk">Silk</span>
                            <span class="suggestion-tag" data-search="traditional">Traditional</span>
                            <span class="suggestion-tag" data-search="designer">Designer</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.searchOverlay);

        // Get references to elements
        this.searchInput = this.searchOverlay.querySelector('.search-input');
        this.searchResults = this.searchOverlay.querySelector('.search-results');
        this.searchClose = this.searchOverlay.querySelector('.search-close');
    }

    // Attach event listeners
    attachEventListeners() {
        // Search input events
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSearch();
            }
        });

        // Close button
        this.searchClose.addEventListener('click', () => {
            this.hideSearch();
        });

        // Overlay click to close
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.hideSearch();
            }
        });

        // Suggestion tags
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-tag')) {
                const searchTerm = e.target.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.handleSearch(searchTerm);
            }
        });

        // Add search button to header if it doesn't exist
        this.addSearchButton();
    }

    // Add search button to header
    addSearchButton() {
        const headers = document.querySelectorAll('.header-nav, .contact-section');
        headers.forEach(header => {
            if (!header.querySelector('.search-btn')) {
                const searchBtn = document.createElement('button');
                searchBtn.className = 'search-btn';
                searchBtn.innerHTML = '🔍 Search';
                searchBtn.addEventListener('click', () => this.showSearch());
                header.appendChild(searchBtn);
            }
        });
    }

    // Show search overlay
    showSearch() {
        this.searchOverlay.classList.add('active');
        this.isSearchVisible = true;
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    // Hide search overlay
    hideSearch() {
        this.searchOverlay.classList.remove('active');
        this.isSearchVisible = false;
        this.searchInput.value = '';
        this.showSuggestions();
        document.body.style.overflow = '';
    }

    // Handle search input
    async handleSearch(query) {
        if (!query.trim()) {
            this.showSuggestions();
            return;
        }

        if (query.length < 2) {
            this.searchResults.innerHTML = '<div class="search-message">Type at least 2 characters to search...</div>';
            return;
        }

        try {
            // Ensure products are loaded
            if (!window.productDB.loaded) {
                await window.productDB.loadProducts();
            }

            const results = window.productDB.searchProducts(query);
            this.displaySearchResults(results, query);
        } catch (error) {
            console.error('Search error:', error);
            this.searchResults.innerHTML = '<div class="search-error">Search temporarily unavailable</div>';
        }
    }

    // Display search results
    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-message">
                    No products found for "${query}"
                    <div class="search-suggestions">
                        <p>Try searching for:</p>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag" data-search="blouse">Blouses</span>
                            <span class="suggestion-tag" data-search="kurta">Kurtas</span>
                            <span class="suggestion-tag" data-search="silk">Silk</span>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const resultsHTML = `
            <div class="search-header-info">
                <h4>Search Results for "${query}" (${results.length})</h4>
            </div>
            <div class="search-products">
                ${results.map(product => `
                    <div class="search-product-item">
                        <a href="${window.productDB.getProductUrl(product.id)}" class="search-product-link">
                            <img src="${product.mainImage}" alt="${product.name}" class="search-product-image">
                            <div class="search-product-info">
                                <h5>${product.name}</h5>
                                <p>${product.description}</p>
                                <span class="search-product-price">${product.price}</span>
                            </div>
                        </a>
                    </div>
                `).join('')}
            </div>
        `;

        this.searchResults.innerHTML = resultsHTML;
    }

    // Show search suggestions
    showSuggestions() {
        this.searchResults.innerHTML = `
            <div class="search-suggestions">
                <h4>Popular Searches</h4>
                <div class="suggestion-tags">
                    <span class="suggestion-tag" data-search="blouse">Blouses</span>
                    <span class="suggestion-tag" data-search="embroidered">Embroidered</span>
                    <span class="suggestion-tag" data-search="silk">Silk</span>
                    <span class="suggestion-tag" data-search="traditional">Traditional</span>
                    <span class="suggestion-tag" data-search="designer">Designer</span>
                    <span class="suggestion-tag" data-search="kurta">Kurtas</span>
                </div>
            </div>
        `;
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.productDB !== 'undefined') {
        window.productSearch = new ProductSearch();
        window.productSearch.init();
    }
});
