/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BasicInfoInput from '../../components/ScreenComponent/setting/BasicInfoInput';
import {basicInfoValidationSchema} from '../../utils/config/setting/validationSchema';
import {useBasicInitalState} from './useBasicInitalState';
import {useBasicInfo} from './utils/useBasicInfo';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import {getUserProfileInfo} from '../../store/slices/userProfile/userProfileAction';
import {useAppDispatch} from '../../store/store';
import AppForm from '../../components/common/Form/AppForm';

const BasicInfo = () => {
  const {colors} = useTheme();
  const {loading, handleSubmit} = useBasicInfo();
  const dispatch = useAppDispatch();
  const [, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserProfileInfo());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, []);

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
          initialValues={useBasicInitalState()}
          validationSchema={basicInfoValidationSchema}
          enableReset>
          <BasicInfoInput handleSubmit={handleSubmit} loading={loading} />
        </AppForm>
      </View>
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
