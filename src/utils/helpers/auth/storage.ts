import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const key = 'authToken';

const storeToken = async (authToken: string) => {
  try {
    await AsyncStorage.setItem(key, authToken);
  } catch (error) {
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
  }
};

const getDecodedToken = async () => {
  const token: any = await getToken();
  if (token) {
    const decode: any = await jwtDecode(token);
    return decode;
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
  }
};

export default {getToken, getUser, removeToken, storeToken, getDecodedToken};
