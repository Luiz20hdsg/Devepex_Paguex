// src/services/storage.js
import * as SecureStore from 'expo-secure-store';

export const saveData = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getData = async (key) => {
  return await SecureStore.getItemAsync(key);
};