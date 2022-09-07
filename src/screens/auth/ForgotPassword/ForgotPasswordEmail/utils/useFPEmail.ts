import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const slug = '/auth/forget-password-otp-generate';
export const useFPEmail = (navigation: any) => {
  const {request, loading} = useApi(methods._post);
  const handleSubmit = async (e: any) => {
    const result = await request(slug, {
      email: e.email,
    });
    if (result.ok) {
      navigation.navigate('ForgotPasswordOtp', {email: e.email});
    }
  };
  return {handleSubmit, loading};
};
