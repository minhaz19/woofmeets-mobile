import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BasicInfoSitterInput from '../../../components/ScreenComponent/becomeSitter/basicInfo';
import {basicInfoValue} from '../../../utils/config/becomeSitter/initalValues';
import {basicInfoValidationSchema} from '../../../utils/config/becomeSitter/validationSchema';
import AppForm from '../../../components/common/Form/AppForm';

const BasicInfoSitter = () => {
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
        validationSchema={basicInfoValidationSchema}
        handleSubmit={handleSubmit}>
        <BasicInfoSitterInput initialValues={basicInfoValue} />
      </AppForm>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default BasicInfoSitter;
