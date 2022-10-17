/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import methods from '../../../api/methods';
import {getProviderServices} from '../../../store/slices/Appointment/ProviderServices/getProviderServices';
import {getAllPets} from '../../../store/slices/pet/allPets/allPetsAction';
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
  const navigation = useNavigation<any>();
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
      multiDate,
    } = data;

    if (isRecurring && serviceTypeId === 4 && recurringStartDate === '') {
      console.log('heere1');
      Alert.alert('You have to select recurring start date');
    } else if (serviceTypeId === 4 && !isRecurring && multiDate.length === 0) {
      console.log('heere2');
      Alert.alert('You must select schedule dates');
    } else if (
      (serviceTypeId === 1 || serviceTypeId === 2) &&
      (proposalStartDate === '' || proposalEndDate === '')
    ) {
      console.log('heer3e');
      Alert.alert('You must select schedule dates');
    } else if (
      (serviceTypeId === 1 ||
        (serviceTypeId === 2 && serviceTypeId === 4 && isRecurring)) &&
      (dropOffStartTime === '' ||
        dropOffEndTime === '' ||
        pickUpStartTime === '' ||
        pickUpEndTime === '')
    ) {
      console.log('heere5');
      Alert.alert('You must select Drop-off & Pick-up times');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      isRecurring &&
      recurringSelectedDay.length === 0
    ) {
      Alert.alert('You have to recurring days');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      isRecurring &&
      recurringStartDate === ''
    ) {
      Alert.alert('You have recurring start date');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      isRecurring &&
      recurringModDates.length === 0
    ) {
      Alert.alert('You have select recurring time slots');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      !isRecurring &&
      multiDate.length === 0
    ) {
      Alert.alert('You have select specific dates');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      !isRecurring &&
      specificModDates.length === 0
    ) {
      Alert.alert('You have select walk / visit times');
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
          serviceTypeId === 3 || serviceTypeId === 5 || serviceTypeId === 4
            ? isRecurring
              ? recurringModDates
              : specificModDates
            : [],
        recurringStartDate:
          serviceTypeId === 1 || serviceTypeId === 2
            ? ''
            : isRecurring
            ? recurringStartDate
            : '',
        recurringSelectedDay:
          serviceTypeId === 1 || serviceTypeId === 2
            ? []
            : isRecurring
            ? recurringSelectedDay
            : [],
        firstMessage: firstMessage,
        isRecivedPhotos: isRecivedPhotos,
      };
      const response = await request(endpoint, payload);
      response.ok &&
        navigation.navigate('ActivityScreen', {
          appointmentOpk: response.data.data.appointment.opk,
          screen: 'Inbox',
        });
      console.log('res', payload, response);
    }
  };
  useEffect(() => {
    providerServices === null && dispatch(getProviderServices('HFJHx6EP'));
    dispatch(getAllPets());
  }, []);
  return {
    handleSubmit,
    btnLoading,
    loading,
  };
};
