import {create} from 'apisauce';
import authStorage from '../utils/helpers/auth/storage';

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
  // request.headers.Authorization = 'Bearer ' + authToken;
});

// apiClient.addAsyncResponseTransform(async response => {
//   console.log('responsesss', response);
//   if (response.problem === 'TIMEOUT_ERROR') {
//     console.log('its in');
//     Alert.alert(
//       'Response Timeout',
//       'would you like to retry?',
//       [
//         {
//           text: 'No',
//           onPress: () => console.log(''),
//         },
//         {
//           text: 'Yes',
//           onPress: async () => {
//             console.log('is caliing');

//             const r = await apiClient.get(response.config!.url!);
//             console.log('r', r);
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   }
// });

export default apiClient;
