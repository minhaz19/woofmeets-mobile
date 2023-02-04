import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BasicInfoInput from '../../../components/ScreenComponent/setting/BasicInfoInput';
import {basicInfoValidationSchema} from '../../../utils/config/setting/validationSchema';
import {useBasicInitalState} from './utils/useBasicInitalState';
import {useBasicInfo} from './utils/useBasicInfo';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import AppForm from '../../../components/common/Form/AppForm';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {getUserProfileInfo} from '../../../store/slices/userProfile/userProfileAction';

const BasicInfo = ({route}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {postUpdateLoading, handleSubmit, locationLoading} =
    useBasicInfo(route);
  const basicInitialValue = useBasicInitalState();
  const {loading} = useAppSelector(state => state.userProfile);
  useEffect(() => {
    dispatch(getUserProfileInfo());
  }, []);
  return (
    <>
      {loading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <View
          style={[
            styles.rootContainer,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <AppForm
            initialValues={basicInitialValue}
            validationSchema={basicInfoValidationSchema}>
            <BasicInfoInput
              handleSubmit={handleSubmit}
              loading={postUpdateLoading || locationLoading}
            />
          </AppForm>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 0,
  },
  container: {flex: 1},
});

export default BasicInfo;
