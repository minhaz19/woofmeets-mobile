import {create} from 'apisauce';
import authStorage from '../utils/helpers/auth/storage';

const apiClient = create({
  baseURL: 'https://woof-api.hirebeet.com/v1',
  // baseURL: 'https://api-stg.woofmeets.com/v1',
  timeout: 30000,
});

apiClient.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) {
    return;
  }
  request.headers['access-token'] = authToken;
  request.headers.Authorization = 'Bearer ' + authToken;
});

export const apiMsg = create({
  baseURL: 'https://msg.hirebeet.com',
  timeout: 30000,
});

export const apiNotification = create({
  baseURL: 'https://msg.hirebeet.com',
  timeout: 30000,
});

apiNotification.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) {
    return;
  }
  // request.headers['access-token'] = authToken;
  request.headers.Authorization = authToken;
});

export default apiClient;
