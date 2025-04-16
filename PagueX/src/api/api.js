import axios from 'axios';
import { STATIC_AUTHORIZATION_TOKEN, EXPO_PUBLIC_API_URL } from '@env';

if (!STATIC_AUTHORIZATION_TOKEN) {
  throw new Error('STATIC_AUTHORIZATION_TOKEN não definido');
}

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL || 'https://mobile.devepex.com',
  headers: {
    Authorization: `Bearer ${STATIC_AUTHORIZATION_TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

export const registerDevice = async (email, deviceId) => {
  try {
    const response = await api.post('/user/create', { email, device_id: deviceId });
    console.log('Dispositivo registrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar dispositivo:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw error;
  }
};

export const getMessages = async (email, startDate, endDate, page) => {
  try {
    const response = await api.get(`/messages/list/${email}/${startDate}/${endDate}/${page}`);
    console.log('Mensagens recebidas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
      config: { url: error.config?.url },
    });
    throw error;
  }
};

export const markMessageAsRead = async (id) => {
  try {
    await api.put(`/messages/update/${id}`, { id });
    console.log(`Mensagem ${id} marcada como lida`);
    return true;
  } catch (error) {
    console.error('Erro ao marcar mensagem como lida:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw error;
  }
};

export const getNotificationSettings = async (email) => {
  try {
    const response = await api.get(`/user/settings/${email}`);
    console.log('Configurações recebidas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar configurações:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw error;
  }
};

export const saveNotificationSettings = async (email, settings) => {
  try {
    await api.put(`/user/settings/${email}`, settings);
    console.log('Configurações salvas');
    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw error;
  }
};