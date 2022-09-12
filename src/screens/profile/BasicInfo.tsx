import {View, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BasicInfoInput from '../../components/ScreenComponent/setting/BasicInfoInput';
import {basicInfoValidationSchema} from '../../utils/config/setting/validationSchema';
import AppForm from '../../components/common/Form/AppForm';
import {useBasicInitalState} from './useBasicInitalState';
import {useBasicInfo} from './utils/useBasicInfo';
import {SCREEN_WIDTH} from '../../constants/WindowSize';

const BasicInfo = () => {
  const {colors} = useTheme();
  const {loading, handleSubmit} = useBasicInfo();

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
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 0,
  },
  container: {flex: 1},
});

export default BasicInfo;
