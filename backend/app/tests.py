from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch
from models.user_model import UserUpdate, UserResponse

client = TestClient(app)

mock_user_id = "672a72e765315ff9b88e9c93"
mock_user = UserResponse(
    id=mock_user_id,
    firstName="Test",
    lastName="User",
    age=30,
    gender="male",
    email="test@example.com",
    phone="1234567890"
)

mock_users_response = [
    UserResponse(
        id="607d1c6c8f1b2c30d47e9d12",
        firstName="Test",
        lastName="User",
        age=30,
        gender="male",
        email="test@example.com",
        phone="1234567890"
    ),
    UserResponse(
        id="607d1c6c8f1b2c30d47e9d13",
        firstName="Another",
        lastName="User",
        age=25,
        gender="female",
        email="another@example.com",
        phone="0987654321"
    )
]

def test_get_all_users():
    with patch('services.user_service.user_service.get_all_users', return_value=mock_users_response):
        response = client.get("/users?limit=2")
        assert response.status_code == 200
        assert len(response.json()) == 2
        assert response.json() == [user.model_dump() for user in mock_users_response]

def test_get_all_users_no_limit():
    with patch('services.user_service.user_service.get_all_users', return_value=mock_users_response):
        response = client.get("/users")
        assert response.status_code == 200
        assert len(response.json()) == len(mock_users_response)
        assert response.json() == [user.model_dump() for user in mock_users_response]

def test_get_user():
    with patch('services.user_service.user_service.get_user', return_value=mock_user):
        response = client.get(f"/users/{mock_user_id}")
        assert response.status_code == 200
        assert response.json() == mock_user.model_dump()

def test_get_user_not_found():
    invalid_user_id = "invalid_user_id"
    with patch('services.user_service.user_service.get_user', return_value=None):
        response = client.get(f"/users/{invalid_user_id}")
        assert response.status_code == 404
        assert response.json() == {"detail": "User not found"}

def test_update_user():
    updated_user_data = UserUpdate(
        firstName="Updated",
        lastName="User",
        age=31,
        gender="male",
        email="updated@example.com",
        phone="1122334455"
    )
    updated_user_response = UserResponse(
        id=mock_user_id,
        firstName="Updated",
        lastName="User",
        age=33,
        gender="male",
        email="updated@example.com",
        phone="1122334455"
    )
    
    with patch('services.user_service.user_service.update_user', return_value=updated_user_response):
        response = client.put(f"/users/{mock_user_id}", json=updated_user_data.model_dump())
        assert response.status_code == 200
        assert response.json() == updated_user_response.model_dump()

def test_update_user_not_found():
    invalid_user_id = "invalid_user_id"
    user_update = UserUpdate(
        firstName="Updated",
        lastName="User",
        age=31,
        gender="male",
        email="updated@example.com",
        phone="1122334455"
    )
    
    with patch('services.user_service.user_service.update_user', return_value=None):
        response = client.put(f"/users/{invalid_user_id}", json=user_update.model_dump())
        assert response.status_code == 404
        assert response.json() == {"detail": "User not found"}

def test_delete_user():
    with patch('services.user_service.user_service.delete_user', return_value=True):
        response = client.delete(f"/users/{mock_user_id}")
        assert response.status_code == 200
        assert response.json() == {
            "message": "User deleted successfully.",
            "user_id": mock_user_id
        }

def test_delete_user_not_found():
    invalid_user_id = "invalid_user_id"
    with patch('services.user_service.user_service.delete_user', return_value=False):
        response = client.delete(f"/users/{invalid_user_id}")
        assert response.status_code == 404
        assert response.json() == {"detail": "User not found"}
