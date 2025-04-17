import AsyncStorage from '@react-native-async-storage/async-storage';

// Use the host machine's IP or 10.0.2.2 for Android emulator
const API_BASE_URL = 'https://587f-45-176-106-15.ngrok-free.app'; 
const AUTH_TOKEN = '3xV7fPq$uRwT!aZ@9Lk#D2mNbG%e6Xy&';

// Helper function to get headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${AUTH_TOKEN}`,
});

// Register a device (POST /user/create)
export const registerDevice = async (email, deviceId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/create`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, device_id: deviceId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao registrar dispositivo');
    }
    return data;
  } catch (error) {
    console.error('Erro em registerDevice:', error);
    throw error;
  }
};

// Fetch messages (GET /messages/list/:email/:start_date/:end_date/:page)
export const getMessages = async (email, startDate, endDate, page) => {
  try {
    const url = `${API_BASE_URL}/messages/list/${email}/${startDate}/${endDate}/${page}`;
    console.log('Request URL:', url);
    console.log('Request Headers:', getHeaders());
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    console.log('Response Status:', response.status);
    const data = await response.json();
    console.log('Response Data:', data);
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar mensagens');
    }
    return data;
  } catch (error) {
    console.error('Erro em getMessages:', error);
    throw error;
  }
};

// Mark message as read (PUT /messages/update/:id)
export const markMessageAsRead = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/update/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ id, readed: true }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao marcar mensagem como lida');
    }
    return data;
  } catch (error) {
    console.error('Erro em markMessageAsRead:', error);
    throw error;
  }
};

// Fetch notification settings (GET /user/settings/:email)
export const getNotificationSettings = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/settings/${email}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar configurações');
    }
    return data;
  } catch (error) {
    console.error('Erro em getNotificationSettings:', error);
    throw error;
  }
};

// Save notification settings (PUT /user/settings/:email)
export const saveNotificationSettings = async (email, settings) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/settings/${email}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao salvar configurações');
    }
    return true;
  } catch (error) {
    console.error('Erro em saveNotificationSettings:', error);
    throw error;
  }
};