import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const fetchUsers = async (limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
