import React from 'react';
import {StyleSheet} from 'react-native';
import AppCalendar from '../../../components/common/AppCalendar';
import AppForm from '../../../components/common/Form/AppForm';
import Screen from '../../../components/common/Screen';
// import AvailablityCalendar from '../../../components/ScreenComponent/Provider/AvailablityCalendar/AvailablityCalendar';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {providerAvailablityValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';

const ProviderAvailablity = () => {
  const {isDarkMode} = useTheme();
  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.background,
        },
      ]}>
      <AppForm
        validationSchema={providerAvailablityValidationSchema}
        initialValues={{
          dateRange: '',
        }}>
        {/* <AvailablityCalendar /> */}
        <AppCalendar />
      </AppForm>
    </Screen>
  );
};

export default ProviderAvailablity;

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', paddingBottom: 0},
});
