import google.generativeai as genai
import os

# Get API key from env or use a hardcoded one if it's not set
api_key = os.environ.get("GEMINI_API_KEY", "")
if not api_key:
    # try loading from .env
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
    api_key = os.environ.get("GEMINI_API_KEY", "")

genai.configure(api_key=api_key)

for m in genai.list_models():
    if "generateContent" in m.supported_generation_methods:
        print(m.name)
