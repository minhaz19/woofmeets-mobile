import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import AppForm from '../../components/common/Form/AppForm';
import AppointmentBody from '../../components/ScreenComponent/Appointment/AppointmentBody';
import {appointmentInit} from '../../utils/config/initalValues/initalValues';
import {appointmentValidationSchema} from '../../utils/config/ValidationSchema/validationSchema';
import AppActivityIndicator from '../../components/common/Loaders/AppActivityIndicator';
import {useAppointment} from './utils/useAppointment';
import {useTheme} from '../../constants/theme/hooks/useTheme';
const Appointment = () => {
  const {handleSubmit, loading, btnLoading} = useAppointment();
  const {colors} = useTheme();
  return (
    <>
      {loading && <AppActivityIndicator visible />}
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <AppForm
          initialValues={appointmentInit}
          validationSchema={appointmentValidationSchema}>
          <AppointmentBody handleSubmit={handleSubmit} loading={btnLoading} />
        </AppForm>
      </SafeAreaView>
    </>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {flex: 1},
});
