/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AppForm from '../../components/common/Form/AppForm';
import AppointmentBody from '../../components/ScreenComponent/Appointment/AppointmentBody';
import {appointmentInit} from '../../utils/config/initalValues/initalValues';
import {appointmentValidationSchema} from '../../utils/config/ValidationSchema/validationSchema';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getProviderServices} from '../../store/slices/Appointment/ProviderServices/getProviderServices';
import AppActivityIndicator from '../../components/common/Loaders/AppActivityIndicator';
const Appointment = () => {
  const dispatch = useAppDispatch();
  const {providerServices, loading} = useAppSelector(
    state => state.providerServices,
  );
  useEffect(() => {
    providerServices === null && dispatch(getProviderServices('HFJHx6EP'));
  }, []);
  const handleSubmit = async (data: any) => {
    console.log('data', data);
  };
  return (
    <>
      {loading && <AppActivityIndicator visible />}
      <SafeAreaView style={styles.container}>
        <AppForm
          initialValues={appointmentInit}
          validationSchema={appointmentValidationSchema}>
          <AppointmentBody handleSubmit={handleSubmit} />
        </AppForm>
      </SafeAreaView>
    </>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {flex: 1},
});
