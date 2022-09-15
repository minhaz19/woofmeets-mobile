import {ApiResponse} from 'apisauce';
import methods from '../../../../../api/methods';
import {setAvailability} from '../../../../../store/slices/onBoarding/setUpService/availability/availabilitySlice';
import {useAppDispatch} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

export const useAvailabilityUtils = (id: string, navigation: any) => {
  const dispatch = useAppDispatch();

  const postEndPoint = `/availability${id ? `/${id}` : ''}`;

  const {request: PService, loading: isLoading} = useApi(
    id ? methods._put : methods._post,
  );
  const handlePost = async (data: any) => {
    const putFormattedData = {
      sat: data.sat,
      sun: data.sun,
      mon: data.mon,
      tue: data.tue,
      wed: data.wed,
      thu: data.thu,
      fri: data.fri,
      pottyBreak: data.pottyBreak,
      fulltime: data.fulltime,
    };
    const response: ApiResponse<any> = await PService(
      postEndPoint,
      id ? putFormattedData : data,
    );
    if (response) {
      dispatch(setAvailability(response?.data?.data));
      navigation.navigate('ServiceSetup', {});
    }
  };
  return {handlePost, isLoading};
};
