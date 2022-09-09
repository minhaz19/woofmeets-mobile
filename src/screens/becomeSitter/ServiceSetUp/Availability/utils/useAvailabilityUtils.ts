import {ApiResponse} from 'apisauce';
import {useState} from 'react';
import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const postEndPoint = '/availability';
export const useAvailabilityUtils = (id: string, navigation: any) => {
  const [serviceid, setServiceId] = useState();

  const {request: PService, loading: PLoading} = useApi(methods._post);
  const handlePost = async (data: any) => {
    // console.log('data', data);
    const response: ApiResponse<any> = await PService(postEndPoint, data);
    if (response) {
      navigation.navigate('petPreference');
    }
  };
  return {handlePost, PLoading};
};
