#!/usr/bin/env python3
import requests
import json

def test_api():
    base_url = "http://localhost:8001"
    
    try:
        # Test root endpoint
        response = requests.get(f'{base_url}/')
        print('✅ Root endpoint:', response.json())
        
        # Test products endpoint
        response = requests.get(f'{base_url}/api/products')
        data = response.json()
        print(f'✅ Products total: {data["total"]}')
        print(f'✅ First product: {data["products"][0]["name"] if data["products"] else "None"}')
        
        # Test categories endpoint
        response = requests.get(f'{base_url}/api/categories')
        data = response.json()
        print(f'✅ Categories total: {data["total"]}')
        print(f'✅ Categories: {[cat["name"] for cat in data["categories"]]}')
        
        # Test search endpoint
        response = requests.get(f'{base_url}/api/search?q=blouse')
        data = response.json()
        print(f'✅ Search results for "blouse": {data["total"]} products found')
        
        # Test specific product endpoint
        response = requests.get(f'{base_url}/api/products/product-001')
        data = response.json()
        print(f'✅ Product by ID: {data["product"]["name"]}')
        
        print('\n🎉 All API tests passed!')
        
    except Exception as e:
        print(f'❌ Error: {e}')

if __name__ == "__main__":
    test_api()
