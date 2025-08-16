from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json
import os
from pathlib import Path
from contextlib import asynccontextmanager
import config

# Data storage
products_data = None

def load_products_data():
    """Load products data from JSON file"""
    global products_data
    if products_data is None:
        try:
            with open(config.DATA_FILE, 'r', encoding='utf-8') as f:
                products_data = json.load(f)
        except FileNotFoundError:
            raise HTTPException(status_code=500, detail="Products data file not found")
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid JSON in products data file")
    return products_data

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    load_products_data()
    yield
    # Shutdown
    pass

# Create FastAPI app with lifespan events
app = FastAPI(
    title="MISSFITS Boutique API",
    description="API for MISSFITS Boutique product database",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "HEAD", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to MISSFITS Boutique API",
        "version": "1.0.0",
        "endpoints": {
            "products": "/api/products",
            "categories": "/api/categories",
            "docs": "/docs",
            "openapi": "/openapi.json"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "MISSFITS Boutique API"}

# Products API endpoints
@app.get("/api/products")
async def get_all_products(category: Optional[str] = None):
    """Get all products or filter by category"""
    data = load_products_data()
    products = data.get("products", [])
    
    if category:
        products = [p for p in products if p.get("category") == category]
    
    return {
        "products": products,
        "total": len(products),
        "category": category
    }

@app.get("/api/products/{product_id}")
async def get_product_by_id(product_id: str):
    """Get a specific product by ID"""
    data = load_products_data()
    products = data.get("products", [])
    
    product = next((p for p in products if p.get("id") == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"product": product}

@app.get("/api/categories")
async def get_all_categories():
    """Get all product categories"""
    data = load_products_data()
    categories = data.get("categories", [])
    
    return {
        "categories": categories,
        "total": len(categories)
    }

@app.get("/api/categories/{category_id}")
async def get_category_by_id(category_id: str):
    """Get a specific category by ID"""
    data = load_products_data()
    categories = data.get("categories", [])
    
    category = next((c for c in categories if c.get("id") == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    return {"category": category}

@app.get("/api/products/category/{category_id}")
async def get_products_by_category(category_id: str):
    """Get all products in a specific category"""
    data = load_products_data()
    products = data.get("products", [])
    categories = data.get("categories", [])
    
    # Check if category exists
    category = next((c for c in categories if c.get("id") == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Filter products by category
    category_products = [p for p in products if p.get("category") == category_id]
    
    return {
        "products": category_products,
        "category": category,
        "total": len(category_products)
    }

@app.get("/api/search")
async def search_products(q: str, limit: Optional[int] = 10):
    """Search products by name, description, or tags"""
    if not q or len(q.strip()) < 2:
        raise HTTPException(status_code=400, detail="Search query must be at least 2 characters")
    
    data = load_products_data()
    products = data.get("products", [])
    
    query = q.lower().strip()
    results = []
    
    for product in products:
        # Search in name, description, and tags
        matches = (
            query in product.get("name", "").lower() or
            query in product.get("description", "").lower() or
            query in product.get("longDescription", "").lower() or
            any(query in tag.lower() for tag in product.get("tags", []))
        )
        
        if matches:
            results.append(product)
    
    # Limit results
    if limit:
        results = results[:limit]
    
    return {
        "query": q,
        "products": results,
        "total": len(results)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=config.HOST, port=config.PORT)
