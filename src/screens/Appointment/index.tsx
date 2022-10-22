import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import AppForm from '../../components/common/Form/AppForm';
import AppointmentBody from '../../components/ScreenComponent/Appointment/AppointmentBody';
import {appointmentInit} from '../../utils/config/initalValues/initalValues';
import {appointmentValidationSchema} from '../../utils/config/ValidationSchema/validationSchema';
import AppActivityIndicator from '../../components/common/Loaders/AppActivityIndicator';
import {useAppointment} from './utils/useAppointment';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {RefreshControl} from 'react-native-gesture-handler';
const Appointment = () => {
  const {handleSubmit, loading, btnLoading, refreshing, onRefresh} =
    useAppointment();
  const {colors} = useTheme();

  return (
    <>
      {loading && <AppActivityIndicator visible />}
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <AppForm
          initialValues={appointmentInit}
          validationSchema={appointmentValidationSchema}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <AppointmentBody handleSubmit={handleSubmit} loading={btnLoading} />
          </ScrollView>
        </AppForm>
      </SafeAreaView>
    </>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {flex: 1},
});
