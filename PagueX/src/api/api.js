import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.paguex.com',
});

const API_BASE_URL = 'https://api.paguex.com'; 

export const registerDevice = async (email, deviceId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
      email,
      device_ID: deviceId,
    });
    console.log('Dispositivo registrado com sucesso:', response.data);
  } catch (error) {
    throw new Error(`Erro ao registrar dispositivo: ${error.message}`);
  }
};

export const getMessages = async (email, startDate, endDate, page = 1) => {
  try {
    const response = await api.get('/messages', {
      params: { user: email, data_inicio: startDate, data_fim: endDate, page },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    throw error;
  }
};

export const markMessageAsRead = async (messageId) => {
  try {
    await api.put(`/messages/${messageId}`, { id: messageId });
    return true;
  } catch (error) {
    console.error('Erro ao marcar mensagem como lida:', error);
    throw error;
  }
};

export const getNotificationSettings = async (email) => {
  try {
    const response = await api.get('/settings', { params: { user: email } });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    throw error;
  }
};

export const saveNotificationSettings = async (settings) => {
  try {
    await api.put('/settings', settings);
    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    throw error;
  }
};