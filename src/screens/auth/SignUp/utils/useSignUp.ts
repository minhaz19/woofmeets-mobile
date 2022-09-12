import {useEffect} from 'react';
import {registerUser} from '../../../../store/slices/auth/userAction';
import {authProviderLoading} from '../../../../store/slices/auth/userSlice';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
interface RegProps {
  email: string;
  firstName: string;
  lastName: string;
  zipcode: string;
  password: string;
  term: boolean;
}
export const useSignUp = (navigation: any) => {
  const {isLoggedIn, providerLoading, loading} = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authProviderLoading(false));
      navigation.navigate('BottomTabNavigator');
    }
  }, [navigation, isLoggedIn, dispatch]);

  const handleSubmit = (regInfo: RegProps) => {
    dispatch(registerUser(regInfo));
  };
  return {handleSubmit, providerLoading, loading};
};
