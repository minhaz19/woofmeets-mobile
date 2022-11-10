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
interface Props {
  route: any;
}
const Appointment = ({route}: Props) => {
  const {colors} = useTheme();
  // const appointmentType = 'create';
  // const providerOpk = 'vxUC7v6J';
  const {appointmentType, providerOpk} = route?.params;
  const {handleSubmit, loading, btnLoading, refreshing, onRefresh} =
    useAppointment(providerOpk);
  return (
    <>
      {loading && <AppActivityIndicator visible />}
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <AppForm
            initialValues={appointmentInit}
            validationSchema={appointmentValidationSchema}>
            <AppointmentBody
              handleSubmit={handleSubmit}
              loading={btnLoading}
              appointmentType={appointmentType}
            />
          </AppForm>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {flex: 1},
});
