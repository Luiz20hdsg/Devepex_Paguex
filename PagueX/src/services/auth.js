import { createClient } from '@supabase/supabase-js';
import { EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY } from '@env';
import * as Linking from 'expo-linking';

const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY);

// Prefixo para deep linking
const linkingPrefix = Linking.createURL('/');

export const sendAuthCode = async (email) => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${linkingPrefix}auth/verify`, // Link para redirecionar ao app
      },
    });
    if (error) throw error;
    console.log('Código enviado com sucesso para:', email);
    return true;
  } catch (error) {
    console.error('Erro ao enviar código:', error.message);
    return false;
  }
};

export const verifyAuthCode = async (email, token) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;
    console.log('Autenticação bem-sucedida:', data);
    return data.session; // Retorna a sessão com access_token
  } catch (error) {
    console.error('Erro ao verificar código:', error.message);
    return null;
  }
};

// Função para verificar autenticação via link
export const handleDeepLinkAuth = async (url) => {
  try {
    const { data, error } = await supabase.auth.getSessionFromUrl(url);
    if (error) throw error;
    console.log('Autenticação via link bem-sucedida:', data);
    return data.session; // Retorna a sessão autenticada
  } catch (error) {
    console.error('Erro ao autenticar via link:', error.message);
    return null;
  }
};