import {ApiResponse} from 'apisauce';
import methods from '../../../../../api/methods';
import {setBoardingSelection} from '../../../../../store/slices/onBoarding/initial';
import {setAvailability} from '../../../../../store/slices/onBoarding/setUpService/availability/availabilitySlice';
// import {getPetPreference} from '../../../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';
import {useAppDispatch} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

export const useAvailabilityUtils = (
  id: string,
  navigation: any,
  route: any,
) => {
  const dispatch = useAppDispatch();
  // const {petPreference} = useAppSelector((state: any) => state?.petPreference);
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
    if (response?.data?.data) {
      dispatch(setAvailability(response?.data?.data));
      dispatch(setBoardingSelection({pass: 1}));
      // petPreference === null && dispatch(getPetPreference());
      if (route.name === 'AvailabilityScreen') {
        navigation.goBack();
      }
    }
  };
  return {handlePost, isLoading};
};
