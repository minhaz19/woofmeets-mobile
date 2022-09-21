import methods from '../../../../../../api/methods';
import {useApi} from '../../../../../../utils/helpers/api/useApi';

const endpoint = '/subscriptions/user-basic-verification-info';
export const useBasicBackgroundCheck = (route: any, navigation: any) => {
  const {sequence} = route.params;
  const {loading, request} = useApi(methods._post);
  const handleSubmit = async (data: any) => {
    const formData = new FormData();
    // formData.append('dob', data.dob);
    // formData.append('state', '');
    // formData.append('dlId', '');
    // formData.append('stateId', '');
    data.imageGallery.map((img: string, i: number) => {
      return formData.append('file', {
        key: `imge + ${i}`,
        url: img,
        type: 'image/png',
      });
    });

    const reqPayload = {
      dob: data.dob,
      state: data.state,
      dlId: data.dlld,
      stateId: data.stateId,
      file: [],
    };

    const result = await request(endpoint, reqPayload);

    if (result.ok) {
      navigation.navigate('PlanCheckout', {sequence: sequence});
    }
  };
  return {loading, handleSubmit};
};
