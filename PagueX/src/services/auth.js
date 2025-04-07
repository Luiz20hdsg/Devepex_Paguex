import axios from 'axios';
import { EXPO_PUBLIC_FIREBASE_API_KEY } from '@env';

export const sendAuthCode = async (email) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${EXPO_PUBLIC_FIREBASE_API_KEY}`,
      {
        requestType: 'EMAIL_SIGNIN',
        email,
        continueUrl: 'https://dashboard.paguex.com/login', 
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao enviar código:', error.response?.data || error.message);
    return false;
  }
};

export const verifyAuthCode = async (email, oobCode) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithEmailLink?key=${EXPO_PUBLIC_FIREBASE_API_KEY}`,
      {
        email,
        oobCode,
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Erro ao verificar código:', error.response?.data || error.message);
    return null;
  }
};