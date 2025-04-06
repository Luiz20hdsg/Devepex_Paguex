import axios from 'axios';
import { EXPO_PUBLIC_FIREBASE_API_KEY } from '@env';

const createDynamicLink = async () => {
  try {
    const response = await axios.post(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${EXPO_PUBLIC_FIREBASE_API_KEY}`,
      {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://paguex-3694d.page.link',
          link: 'https://dashboard.paguex.com/login',
          androidInfo: { androidPackageName: 'com.paguex' },
          iosInfo: { iosBundleId: 'com.paguex' },
        },
        suffix: { option: 'SHORT' },
      }
    );
    return response.data.shortLink;
  } catch (error) {
    console.error('Erro ao criar Dynamic Link:', error);
    throw error;
  }
};

export const sendAuthCode = async (email) => {
  try {
    const dynamicLink = await createDynamicLink();
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${EXPO_PUBLIC_FIREBASE_API_KEY}`,
      {
        requestType: 'EMAIL_SIGNIN',
        email,
        continueUrl: dynamicLink,
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao enviar código:', error);
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
    return response.data; // Contém idToken, refreshToken, etc.
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return null;
  }
};