from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200

def test_read_users():
    response = client.get("/users")
    assert response.status_code == 200

