/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BasicInfoSitterInput from '../../../components/ScreenComponent/becomeSitter/basicInfo';
import {basicInfoValue} from '../../../utils/config/becomeSitter/initalValues';
import {basicInfoValidationSchema} from '../../../utils/config/becomeSitter/validationSchema';

const BasicInfoSitter = () => {
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
      <BasicInfoSitterInput
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

export default BasicInfoSitter;
