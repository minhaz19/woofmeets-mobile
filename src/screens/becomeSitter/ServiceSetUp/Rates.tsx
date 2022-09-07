import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import AppForm from '../../../components/common/Form/AppForm';
import SubRates from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubRates';
import {BoardingSettingsSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {BoardingSettings} from '../../../utils/config/initalValues/initalValues';

const Rates = () => {
  const {colors} = useTheme();
  const handleRates = () => {};
  return (
    <ScrollView
      style={[styles.rootContainer, {backgroundColor: colors.backgroundColor}]}>
      <ReusableHeader />
      <AppForm
        initialValues={BoardingSettings}
        validationSchema={BoardingSettingsSchema}>
        <SubRates handleRates={handleRates} />
      </AppForm>
    </ScrollView>
  );
};

export default Rates;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
