import {create} from 'apisauce';
import authStorage from '../utils/helpers/auth/storage';

const apiClient = create({
  baseURL: 'https://api-stg.woofmeets.com/v1',
});

apiClient.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) {
    return;
  }
  request.headers['access-token'] = authToken;
  // request.headers.Authorization = 'Bearer ' + authToken;
});

export default apiClient;
