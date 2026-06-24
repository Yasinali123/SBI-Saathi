import requests

data = {
    "name": "yasina",
    "email": "yasina999@gmail.com",
    "password": "Test@1234"
}

try:
    response = requests.post("http://localhost:8000/api/auth/signup", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
