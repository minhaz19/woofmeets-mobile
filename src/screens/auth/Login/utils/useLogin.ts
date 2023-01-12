// import {StackActions} from '@react-navigation/native';
import {useEffect} from 'react';
import {userLogin} from '../../../../store/slices/auth/userAction';
import {authProviderLoading} from '../../../../store/slices/auth/userSlice';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {API_MSG} from '@env';
import apiClient from '../../../../api/client';
import storage from '../../../../utils/helpers/auth/storage';
import { getDeviceToken } from '../../../../utils/helpers/NotificationServices';

const notificationEndPoint = '/v1/push-notifications';


export const useLogin = (navigation: any) => {
  const {isLoggedIn, loading, providerLoading, fcmToken} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authProviderLoading(false));
      navigation.navigate('BottomTabNavigator');
    }
  }, [dispatch, isLoggedIn, navigation]);
  useEffect(() => {
    getDeviceToken();
  }, []);

  const handleSubmit = (loginData: any) => {
    dispatch(userLogin(loginData)).then(async res => {
      if (res?.payload?.statusCode === 201) {
        const authToken = await storage.getToken();
        const result = await apiClient.post(`${API_MSG + notificationEndPoint}`, {registrationToken: fcmToken}, {headers: {'Authorization': authToken}});
      }
    });
  };
  return {handleSubmit, providerLoading, loading};
};
