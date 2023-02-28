import {ApiResponse} from 'apisauce';
import methods from '../../../../../api/methods';
import {setBoardingSelection} from '../../../../../store/slices/onBoarding/initial';
import {
  setAvailability,
  setTempId,
} from '../../../../../store/slices/onBoarding/setUpService/availability/availabilitySlice';
// import {getPetPreference} from '../../../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

export const useAvailabilityUtils = (
  id: string,
  navigation: any,
  route: any,
) => {
  const dispatch = useAppDispatch();
  const {tempId} = useAppSelector(state => state.availability);
  const _id = id ?? tempId;
  const postEndPoint = `/availability${_id ? `/${_id}` : ''}`;
  const {request: PService, loading: isLoading} = useApi(
    _id ? methods._put : methods._post,
  );
  const handlePost = async (data: any) => {
    const putFormattedData = {
      sat: data?.selectDay?.sat,
      sun: data?.selectDay?.sun,
      mon: data?.selectDay?.mon,
      tue: data?.selectDay?.tue,
      wed: data?.selectDay?.wed,
      thu: data?.selectDay?.thu,
      fri: data?.selectDay?.fri,
      pottyBreak: data.pottyBreak,
      fulltime: false,
    };
    const response: ApiResponse<any> = await PService(
      postEndPoint,
      _id ? putFormattedData : data,
    );
    dispatch(setTempId(response?.data.data.id));
    if (response?.data?.data) {
      dispatch(setAvailability(response?.data?.data));
      dispatch(setBoardingSelection({pass: 1}));
      if (route.name === 'AvailabilityScreen') {
        navigation.goBack();
      }
    }
  };
  return {handlePost, isLoading};
};
