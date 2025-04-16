import { createClient } from '@supabase/supabase-js';
import { EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY } from '@env';

if (!EXPO_PUBLIC_SUPABASE_URL || !EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Variáveis do Supabase não definidas');
}

const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY);

export const sendAuthCode = async (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Email inválido:', email);
    return false;
  }
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });
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
    if (error) {
      const message = error.code === 'invalid_token'
        ? 'Código inválido ou expirado'
        : `Erro ao verificar código: ${error.message}`;
      throw new Error(message);
    }
    console.log('Autenticação bem-sucedida:', data);
    return data.session;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};