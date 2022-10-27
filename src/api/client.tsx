import {create} from 'apisauce';
import authStorage from '../utils/helpers/auth/storage';
import { msgUrl } from '../utils/helpers/httpRequest';

const apiClient = create({
  baseURL: 'https://api-stg.woofmeets.com/v1',
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

export default apiClient;
