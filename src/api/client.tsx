import {create} from 'apisauce';
import authStorage from '../utils/helpers/auth/storage';
import {API_MSG, API_URL} from '@env';

const apiClient = create({
  baseURL: `${API_URL}/v1`,
  timeout: 30000,
});

apiClient.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) {
    return;
  }
  request.headers['access-token'] = authToken;
  if (!request.headers.Authorization) {
    request.headers.Authorization = 'Bearer ' + authToken;
  }
});

export const apiMsg = create({
  baseURL: API_MSG,
  timeout: 30000,
});

export const apiNotification = create({
  baseURL: API_MSG,
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
