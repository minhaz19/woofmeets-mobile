import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AppForm from '../../../components/common/Form/AppForm';
import Screen from '../../../components/common/Screen';
import AvailablityCalendar from '../../../components/ScreenComponent/Provider/AvailablityCalendar/AvailablityCalendar';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {getUserServices} from '../../../store/slices/profile/services';
import {getAvailableDays} from '../../../store/slices/Provider/Unavailability/getAvailableDay';
import {useAppDispatch} from '../../../store/store';
import {providerAvailablityValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';

const ProviderAvailablity = () => {
  const dispatch = useAppDispatch();
  const {isDarkMode} = useTheme();

  useEffect(() => {
    dispatch(getUserServices());
    dispatch(getAvailableDays());
  }, []);

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
        <AvailablityCalendar />
      </AppForm>
    </Screen>
  );
};

export default ProviderAvailablity;

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', paddingBottom: 0},
});
