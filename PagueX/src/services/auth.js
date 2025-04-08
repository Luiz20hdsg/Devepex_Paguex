// src/services/auth.js
import { Auth0 } from 'react-native-auth0';
import axios from 'axios';

const auth0 = new Auth0({
  domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID
});

export const sendAuthCode = async (email) => {
  try {
    await auth0.auth.passwordlessWithEmail({
      email,
      send: 'code', // Envia código numérico
      authParams: { scope: 'openid profile email' }
    });
    return true;
  } catch (error) {
    console.error('Erro ao enviar código:', error);
    return false;
  }
};

export const verifyAuthCode = async (email, code) => {
  try {
    const credentials = await auth0.auth.loginWithEmail({
      email,
      code,
      audience: 'https://api.paguex.com',
      scope: 'openid profile email'
    });
    
    return {
      idToken: credentials.idToken,
      accessToken: credentials.accessToken,
      user: credentials.user
    };
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return null;
  }
};