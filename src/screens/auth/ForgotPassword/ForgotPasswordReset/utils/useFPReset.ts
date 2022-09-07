import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const slug = '/auth/forget-password';
export const useFPReset = (navigation: any, route: any) => {
  const {token} = route.params;
  const {request, loading} = useApi(methods._post);
  const handleSubmit = async ({newPassword}: any) => {
    const result = await request(
      slug,
      {password: newPassword},
      `Bearer ${token}`,
    );
    if (result.ok) {
      navigation.navigate('LogIn');
    }
  };
  return {handleSubmit, loading};
};
