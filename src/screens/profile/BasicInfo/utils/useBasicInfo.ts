import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {setProfileData} from '../../../../store/slices/onBoarding/initial';
import {getUserProfileInfo} from '../../../../store/slices/userProfile/userProfileAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
const slug = '/user-profile/basic-info';

export const useBasicInfo = (route: any) => {
  const {userInfo} = useAppSelector(state => state.userProfile);
  const navigation = useNavigation();
  const {request, loading} = useApi(
    userInfo?.basicInfo === null ? methods._post : methods._update,
  );
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    const formattedPayload = {
      addressLine1: e.addressLine1,
      // addressLine2: e.addressLine2,
      // street: e.street,
      city: e.city,
      state: e.state,
      zipCode: e.zipCode,
      countryId: Number(e.countryId),
      dob: e.dob,
      latitude: e.latitude,
      longitude: e.longitude,
    };
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
  };

  return {loading, handleSubmit};
};
