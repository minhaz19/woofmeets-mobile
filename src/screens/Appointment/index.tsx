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
import {useApi} from '../../utils/helpers/api/useApi';
import methods from '../../api/methods';
import storage from '../../utils/helpers/auth/storage';
const endpoint = 'appointment/create/proposal';
const Appointment = () => {
  const {loading: btnLoading, request} = useApi(methods._post);
  const dispatch = useAppDispatch();
  const {providerServices, loading} = useAppSelector(
    state => state.providerServices,
  );
  const handleSubmit = async (data: any) => {
    const user: any = await storage.getUser();
    // const boardingPayload = {
    //   providerServiceId: data.providerServiceId,
    //   userId: user?.id,
    //   providerId: providerServices[0].providerId,
    //   petsId: data.petsId,
    //   providerTimeZone: 'string',
    //   appointmentserviceType: 'NONE',
    //   dropOffStartTime: data.dropOffStartTime,
    //   dropOffEndTime: data.dropOffEndTime,
    //   pickUpStartTime: data.pickUpStartTime,
    //   pickUpEndTime: data.pickUpEndTime,
    //   proposalStartDate: data.proposalStartDate,
    //   proposalEndDate: data.proposalEndDate,
    //   // proposalOtherDate: data.proposalEndDate,
    //   // isRecurring: data.isRecurring,
    //   // recurringStartDate: data.recurringStartDate,
    //   // recurringSelectedDay: data.recurringSelectedDay,
    //   firstMessage: data.firstMessage,
    //   isRecivedPhotos: data.isRecivedPhotos,
    // };
    const boardingPayload = {
      providerServiceId: data.providerServiceId,
      userId: user?.id,
      providerId: providerServices[0].providerId,
      petsId: data.petsId,
      length: data.visitLength,
      isRecurring: data.isRecurring,
      providerTimeZone: 'string',
      appointmentserviceType: 'NONE',
      // proposalOtherDate: data.proposalEndDate,
      recurringStartDate: data.recurringStartDate,
      recurringSelectedDay: data.recurringSelectedDay,
      firstMessage: data.firstMessage,
      isRecivedPhotos: data.isRecivedPhotos,
    };
    console.log('user', boardingPayload);
    const result = await request(endpoint, boardingPayload);
    console.log('result', result);
  };
  useEffect(() => {
    providerServices === null && dispatch(getProviderServices('HFJHx6EP'));
  }, []);
  return (
    <>
      {loading && <AppActivityIndicator visible />}
      <SafeAreaView style={styles.container}>
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
