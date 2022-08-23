import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BasicInfoInput from '../../components/ScreenComponent/setting/BasicInfoInput';
import {basicInfoValue} from '../../utils/config/setting/initalValues';
import {basicInfoValidationSchema} from '../../utils/config/setting/validationSchema';
import AppForm from '../../components/common/Form/AppForm';

const BasicInfo = () => {
  const {colors} = useTheme();
  const handleSubmit = () => {};
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <AppForm
        initialValues={basicInfoValue}
        validationSchema={basicInfoValidationSchema}>
        <BasicInfoInput handleSubmit={handleSubmit} />
      </AppForm>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default BasicInfo;
