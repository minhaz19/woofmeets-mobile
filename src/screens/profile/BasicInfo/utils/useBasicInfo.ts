import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {setProfileData} from '../../../../store/slices/onBoarding/initial';
import {getUserProfileInfo} from '../../../../store/slices/userProfile/userProfileAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
const slug = '/user-profile/basic-info';

export const useBasicInfo = () => {
  const {userInfo} = useAppSelector(state => state.userProfile);
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
      countryId: e.countryId,
      dob: e.dob,
      latitude: e.lat,
      longitude: e.lng,
    };
    const result = await request(slug, formattedPayload);
    if (result.ok) {
      Alert.alert('Information Updated!');
      dispatch(getUserProfileInfo());
      dispatch(setProfileData({pass: 0}));
    } else {
      Alert.alert(result?.data?.message);
    }
  };

  return {loading, handleSubmit};
};
