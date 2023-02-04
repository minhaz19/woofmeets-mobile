import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {setProfileData} from '../../../../store/slices/onBoarding/initial';
import {getUserProfileInfo} from '../../../../store/slices/userProfile/userProfileAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {baseUrlV} from '../../../../utils/helpers/httpRequest';
const slug = '/user-profile/basic-info';

export const useBasicInfo = (route: any) => {
  const {userInfo} = useAppSelector(state => state.userProfile);
  const navigation = useNavigation();
  const {request, loading} = useApi(
    userInfo?.basicInfo === null ? methods._post : methods._update,
  );
  const {request: locationRequest, loading: locationLoading} = useApi(
    methods._get,
  );
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    let formattedPayload;
    if (e.latitude && e.longitude) {
      formattedPayload = {
        addressLine1: e.addressLine1,
        city: e.city,
        state: e.state,
        zipCode: e.zipCode,
        countryId: Number(e.countryId),
        dob: e.dob,
        latitude: e.latitude,
        longitude: e.longitude,
      };
    } else {
      const locationAddressEndPoint = `${baseUrlV}/v2/location?address=${e.addressLine1}`;
      const result = await locationRequest(locationAddressEndPoint);
      if (result?.ok) {
        const country = result?.data?.results[0]?.address_components.find(
          (addressComponent: any) => addressComponent.types.includes('country'),
        )?.short_name;
        formattedPayload = {
          addressLine1: e.addressLine1,
          city: e.city
            ? e.city
            : result?.data?.results[0]?.address_components.find(
                (addressComponent: any) =>
                  addressComponent.types.includes('locality'),
              )?.short_name,
          state: e.state
            ? e.state
            : result?.data?.results[0]?.address_components.find(
                (addressComponent: any) =>
                  addressComponent.types.includes(
                    'administrative_area_level_1',
                  ),
              )?.long_name,
          zipCode: e.zipCode
            ? e.zipCode
            : result?.data?.results[0]?.address_components.find(
                (addressComponent: any) =>
                  addressComponent.types.includes('postal_code'),
              )?.short_name,
          countryId: e.countryId
            ? Number(e.countryId)
            : country === 'US'
            ? 1
            : country === 'CA'
            ? 2
            : null,
          dob: e.dob,
          latitude: result?.data?.results[0]?.geometry?.location.lat,
          longitude: result?.data?.results[0]?.geometry?.location.lng,
        };
      }
    }
    if (formattedPayload?.latitude && formattedPayload.longitude) {
      const result = await request(slug, formattedPayload);
      if (result.ok) {
        if (route?.name) {
          navigation.goBack();
        }
        dispatch(getUserProfileInfo());
        dispatch(setProfileData({pass: 0}));
      } else {
        Alert.alert(result?.data?.message);
      }
    } else {
      Alert.alert('', 'Please select your specific address from dropdown');
    }
  };

  return {postUpdateLoading: loading, handleSubmit, locationLoading};
};
