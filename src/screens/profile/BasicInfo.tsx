import {View, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BasicInfoInput from '../../components/ScreenComponent/setting/BasicInfoInput';
import {basicInfoValidationSchema} from '../../utils/config/setting/validationSchema';
import AppForm from '../../components/common/Form/AppForm';
import {useApi} from '../../utils/helpers/api/useApi';
import methods from '../../api/methods';
import {getUserProfileInfo} from '../../store/slices/userProfile/userProfileAction';
import {useAppDispatch} from '../../store/store';
const slug = '/user-profile/basic-info';

const BasicInfo = () => {
  const {colors} = useTheme();
  const {request, loading} = useApi(methods._update);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: any) => {
    const formatedPayload = {
      addressLine1: e.addressLine1,
      addressLine2: e.addressLine2,
      street: e.street,
      city: e.city,
      state: e.state,
      zipCode: e.zipCode,
      countryId: e.countryId,
      dob: e.dob,
    };
    const result = await request(slug, formatedPayload);
    console.log('result', result, formatedPayload);
    if (result.ok) {
      Alert.alert('Information Updated!');
      dispatch(getUserProfileInfo());
    }
  };
  return (
    <>
      <View
        style={[
          styles.rootContainer,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <AppForm
          // initialValues={basicInfoValue}
          validationSchema={basicInfoValidationSchema}>
          <BasicInfoInput handleSubmit={handleSubmit} loading={loading} />
        </AppForm>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default BasicInfo;
