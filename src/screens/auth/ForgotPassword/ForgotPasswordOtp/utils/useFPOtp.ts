import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const slug = '/auth/forget-password-otp-check';
export const useFPOtp = (route: any, navigation: any) => {
  const {email} = route.params;
  const {request, loading} = useApi(methods._post);
  const handleSubmit = async ({code}: any) => {
    const result = await request(slug, {
      email,
      otp: code,
    });

    if (result.ok) {
      navigation.navigate('ForgotPasswordReset', {
        token: result?.data.data.token,
      });
    }
  };
  return {handleSubmit, loading};
};
