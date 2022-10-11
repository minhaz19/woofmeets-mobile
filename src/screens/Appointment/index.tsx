import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import AppForm from '../../components/common/Form/AppForm';
import AppointmentBody from '../../components/ScreenComponent/Appointment/AppointmentBody';
import {appointmentInit} from '../../utils/config/initalValues/initalValues';
import {appointmentValidationSchema} from '../../utils/config/ValidationSchema/validationSchema';
const Appointment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppForm
        initialValues={appointmentInit}
        validationSchema={appointmentValidationSchema}>
        <AppointmentBody />
      </AppForm>
    </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {flex: 1},
});
