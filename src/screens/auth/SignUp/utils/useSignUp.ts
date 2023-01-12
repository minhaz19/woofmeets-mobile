import { API_MSG } from '@env';
import {useEffect} from 'react';
import apiClient from '../../../../api/client';
import {registerUser} from '../../../../store/slices/auth/userAction';
import {authProviderLoading} from '../../../../store/slices/auth/userSlice';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import storage from '../../../../utils/helpers/auth/storage';
import { getDeviceToken } from '../../../../utils/helpers/NotificationServices';
interface RegProps {
  email: string;
  firstName: string;
  lastName: string;
  zipcode: string;
  password: string;
  term: boolean;
}

const notificationEndPoint = '/v1/push-notifications';

export const useSignUp = (navigation: any) => {
  const {isLoggedIn, providerLoading, loading, fcmToken} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authProviderLoading(false));
      navigation.navigate('BottomTabNavigator');
    }
  }, [navigation, isLoggedIn, dispatch]);

  useEffect(() => {
    getDeviceToken();
  }, []);

  const handleSubmit = async (regInfo: RegProps) => {
    dispatch(registerUser(regInfo)).then(async res => {
      if (res?.payload?.statusCode === 201) {
        const authToken = await storage.getToken();
        const result = await apiClient.post(`${API_MSG + notificationEndPoint}`, {registrationToken: fcmToken}, {headers: {'Authorization': authToken}});
      }
    });
  };
  return {handleSubmit, providerLoading, loading};
};
