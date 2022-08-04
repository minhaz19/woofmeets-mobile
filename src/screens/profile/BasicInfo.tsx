/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BasicInfoInput from '../../components/ScreenComponent/setting/BasicInfoInput';
import {basicInfoValue} from '../../utils/config/setting/initalValues';
import {basicInfoValidationSchema} from '../../utils/config/setting/validationSchema';

const BasicInfo = () => {
  const {colors} = useTheme();
  const handleSubmit = (e: any) => {};
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <BasicInfoInput
        initialValues={basicInfoValue}
        validationSchema={basicInfoValidationSchema}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default BasicInfo;
