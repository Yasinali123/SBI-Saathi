from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.api.routes import chat, fraud

settings = get_settings()

app = FastAPI(
    title="SBI Saathi API",
    description="AI-Powered Banking Companion Platform — Backend API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat.router)
app.include_router(fraud.router)
# app.include_router(document.router)


@app.get("/")
async def root():
    return {
        "service": "SBI Saathi API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/api/docs",
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "sbi-saathi-backend"}
