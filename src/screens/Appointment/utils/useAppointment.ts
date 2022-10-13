/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {Alert} from 'react-native';
import methods from '../../../api/methods';
import {getProviderServices} from '../../../store/slices/Appointment/ProviderServices/getProviderServices';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useApi} from '../../../utils/helpers/api/useApi';
import storage from '../../../utils/helpers/auth/storage';

const endpoint = 'appointment/create/proposal';
export const useAppointment = () => {
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
    const payload = {
      providerServiceId: data.providerServiceId,
      userId: user?.id,
      providerId: providerServices[0].providerId,
      petsId: data.petsId,
      length: data.visitLength,
      isRecurring: data.isRecurring,
      providerTimeZone: 'string',
      appointmentserviceType: 'NONE',
      proposalOtherDate: data.isRecurring ? [] : data.DIVspecificDates,
      recurringStartDate: data.recurringStartDate,
      recurringSelectedDay: data.recurringSelectedDay,
      firstMessage: data.firstMessage,
      isRecivedPhotos: data.isRecivedPhotos,
    };
    // const response = await request(endpoint, payload);
    Alert.alert('Appointment under maintainance');
    // console.log('res', response);
  };
  useEffect(() => {
    providerServices === null && dispatch(getProviderServices('HFJHx6EP'));
  }, []);
  return {
    handleSubmit,
    btnLoading,
    loading,
  };
};
