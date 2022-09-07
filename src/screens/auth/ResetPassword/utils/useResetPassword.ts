import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {useApi} from '../../../../utils/helpers/api/useApi';

const slug = '/auth/update-password';

export const useResetPassword = () => {
  const {request, loading} = useApi(methods._post);
  const handleSubmit = async ({oldPassword: password, newPassword}: any) => {
    const result = await request(slug, {password, newPassword});
    if (result.ok) {
      Alert.alert('Password Updated');
    }
  };
  return {handleSubmit, loading};
};
