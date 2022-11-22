// import {StackActions} from '@react-navigation/native';
import {useEffect} from 'react';
import {userLogin} from '../../../../store/slices/auth/userAction';
import {authProviderLoading} from '../../../../store/slices/auth/userSlice';
import {useAppDispatch, useAppSelector} from '../../../../store/store';

export const useLogin = (navigation: any) => {
  const {isLoggedIn, loading, providerLoading} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authProviderLoading(false));
      navigation.navigate('BottomTabNavigator');
    }
  }, [dispatch, isLoggedIn, navigation]);

  const handleSubmit = (loginData: any) => {
    dispatch(userLogin(loginData));
  };
  return {handleSubmit, providerLoading, loading};
};
