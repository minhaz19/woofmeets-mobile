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
    const {
      providerServiceId,
      petsId,
      proposalStartDate,
      proposalEndDate,
      dropOffStartTime,
      dropOffEndTime,
      pickUpStartTime,
      pickUpEndTime,
      serviceTypeId,
      specificModDates,
      recurringModDates,
      recurringSelectedDay,
      recurringStartDate,
      isRecurring,
      visitLength,
      firstMessage,
      isRecivedPhotos,
    } = data;
    console.log('pet', petsId.length === 0);
    if (
      (serviceTypeId === 1 || serviceTypeId === 2 || serviceTypeId === 4) &&
      (proposalStartDate === '' ||
        proposalEndDate === '' ||
        dropOffStartTime === '' ||
        dropOffEndTime === '' ||
        pickUpStartTime === '' ||
        pickUpEndTime === '')
    ) {
      if (proposalStartDate === '' || proposalEndDate === '') {
        Alert.alert('You must select schedule dates');
      } else if (
        dropOffStartTime === '' ||
        dropOffEndTime === '' ||
        pickUpStartTime === '' ||
        pickUpEndTime === ''
      ) {
        Alert.alert('You must select Drop-off & Pick-up times');
      }
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      (recurringModDates.length === 0 ||
        specificModDates.length === 0 ||
        recurringSelectedDay.length === 0 ||
        recurringStartDate === '')
    ) {
      if (isRecurring && recurringSelectedDay.length === 0) {
        Alert.alert('You have to recurring days');
      } else if (isRecurring && recurringStartDate === '') {
        Alert.alert('You have recurring start date');
      } else if (isRecurring && recurringModDates.length === 0) {
        Alert.alert('You have select recurring time slots');
      } else {
        Alert.alert('You have select specific dates');
      }
    } else if (petsId.length === 0 || petsId === undefined) {
      Alert.alert('You have to select at least one pet');
    } else {
      const payload = {
        providerServiceId: providerServiceId,
        userId: user?.id,
        providerId: providerServices[0].providerId,
        petsId: petsId,
        length: serviceTypeId === 3 || serviceTypeId === 5 ? visitLength : null,
        isRecurring: isRecurring,
        dropOffStartTime:
          serviceTypeId === 3 || serviceTypeId === 5 ? '' : dropOffStartTime,
        dropOffEndTime:
          serviceTypeId === 3 || serviceTypeId === 5 ? '' : dropOffEndTime,
        pickUpStartTime:
          serviceTypeId === 3 || serviceTypeId === 5 ? '' : pickUpStartTime,
        pickUpEndTime:
          serviceTypeId === 3 || serviceTypeId === 5 ? '' : pickUpEndTime,
        proposalStartDate:
          serviceTypeId === 3 || serviceTypeId === 5 ? '' : proposalStartDate,
        proposalEndDate:
          serviceTypeId === 3 || serviceTypeId === 5 ? '' : proposalEndDate,
        providerTimeZone: 'string',
        appointmentserviceType:
          serviceTypeId === 3 ? 'VISIT' : serviceTypeId === 5 ? 'WALK' : 'NONE',
        proposalOtherDate:
          serviceTypeId === 3 || serviceTypeId === 5
            ? isRecurring
              ? recurringModDates
              : specificModDates
            : [],
        recurringStartDate:
          serviceTypeId === 1 || serviceTypeId === 2 ? '' : recurringStartDate,
        recurringSelectedDay:
          serviceTypeId === 1 || serviceTypeId === 2
            ? []
            : recurringSelectedDay,
        firstMessage: firstMessage,
        isRecivedPhotos: isRecivedPhotos,
      };
      // const response = await request(endpoint, payload);

      // console.log('res', data, payload, response);
    }
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
