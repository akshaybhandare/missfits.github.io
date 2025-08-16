import os
from pathlib import Path

# Environment settings
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = ENVIRONMENT == "development"

# Server settings
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 8001))

# CORS settings
CORS_ORIGINS = [
    "http://localhost",
    "http://localhost:3000", 
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://missfitsbymanya.store",
    "https://akshaybhandare.github.io",
]

# Add development origins if in dev mode
if DEBUG:
    CORS_ORIGINS.append("*")

# Add domain from environment variable if set
if domain := os.getenv("DOMAIN"):
    CORS_ORIGINS.extend([
        f"http://{domain}",
        f"https://{domain}",
        f"http://www.{domain}",
        f"https://www.{domain}"
    ])

# Data file path
DATA_FILE = Path(__file__).parent / "data" / "products.json"
