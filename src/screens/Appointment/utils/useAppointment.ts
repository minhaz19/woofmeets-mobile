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

      recurringStartDate,
      isRecurring,
      visitLength,
      firstMessage,
      isRecivedPhotos,
      selectedDays,
      multiDate,
    } = data;

    if (isRecurring && serviceTypeId === 4 && recurringStartDate === '') {
      Alert.alert('You have to select recurring start date');
    } else if (serviceTypeId === 4 && !isRecurring && multiDate.length === 0) {
      Alert.alert('You must select schedule dates');
    } else if (
      (serviceTypeId === 1 || serviceTypeId === 2) &&
      (proposalStartDate === '' || proposalEndDate === '')
    ) {
      Alert.alert('You must select schedule dates');
    } else if (
      (serviceTypeId === 1 ||
        (serviceTypeId === 2 && serviceTypeId === 4 && isRecurring)) &&
      (dropOffStartTime === '' ||
        dropOffEndTime === '' ||
        pickUpStartTime === '' ||
        pickUpEndTime === '')
    ) {
      Alert.alert('You must select Drop-off & Pick-up times');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 5) &&
      isRecurring &&
      selectedDays.length === 0
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
      const sortedSpecificModDates = specificModDates.map(
        (item: any, i: number) => ({
          id: i + 1,
          date: new Date(item.date).toISOString(),
          name: item.date,
          startDate: item.startDate !== undefined ? item.startDate : false,
          sameAsStartDate: item.sameAsStartDate,
          visits: item.visitTime.map((time: string, index: number) => ({
            id: index + 1,
            time: time,
          })),
        }),
      );
      const sortedRecurringDates = recurringModDates.map(
        (item: any, i: number) => ({
          id: i + 1,
          date: item.date,
          name: item.date.substring(0, 3).toLowerCase(),
          startDate: item.startDate !== undefined ? item.startDate : false,
          sameAsStartDate: item.sameAsStartDate,
          visits: item.visitTime.map((time: string, index: number) => ({
            id: index + 1,
            time: time,
          })),
        }),
      );
      console.log('sortedSpecificModDates', sortedSpecificModDates);
      const boardSittingPayload = {
        providerServiceId: providerServiceId,
        userId: user?.id,
        providerId: providerServices[0].providerId,
        petsId: petsId,
        dropOffStartTime: dropOffStartTime,
        dropOffEndTime: dropOffEndTime,
        pickUpStartTime: pickUpStartTime,
        pickUpEndTime: pickUpEndTime,
        proposalStartDate: proposalStartDate,
        proposalEndDate: proposalEndDate,
        appointmentserviceType: 'NONE',
        firstMessage: firstMessage,
        isRecivedPhotos: isRecivedPhotos,
        formattedMessage: 'string',
      };
      const dropDogPayload = isRecurring
        ? {
            providerServiceId: providerServiceId,
            userId: user?.id,
            providerId: providerServices[0].providerId,
            petsId: petsId,
            length: visitLength,
            isRecurring: isRecurring,

            appointmentserviceType:
              serviceTypeId === 3
                ? 'VISIT'
                : serviceTypeId === 5
                ? 'WALK'
                : 'NONE',
            recurringStartDate: new Date(recurringStartDate).toISOString(),

            recurringSelectedDay: sortedRecurringDates,
            firstMessage: firstMessage,
            isRecivedPhotos: isRecivedPhotos,
            formattedMessage: 'string',
          }
        : {
            providerServiceId: providerServiceId,
            userId: user?.id,
            providerId: providerServices[0].providerId,
            petsId: petsId,
            length: visitLength,
            isRecurring: isRecurring,

            appointmentserviceType:
              serviceTypeId === 3
                ? 'VISIT'
                : serviceTypeId === 5
                ? 'WALK'
                : 'NONE',
            proposalOtherDate: sortedSpecificModDates,
            firstMessage: firstMessage,
            isRecivedPhotos: isRecivedPhotos,
            formattedMessage: 'string',
          };
      const doggyPayload = isRecurring
        ? {
            providerServiceId: providerServiceId,
            userId: user?.id,
            providerId: providerServices[0].providerId,
            petsId: petsId,
            isRecurring: isRecurring,
            appointmentserviceType: 'NONE',
            dropOffStartTime: dropOffStartTime,
            dropOffEndTime: dropOffEndTime,
            pickUpStartTime: pickUpStartTime,
            pickUpEndTime: pickUpEndTime,
            recurringStartDate: new Date(recurringStartDate).toISOString(),
            recurringSelectedDay: selectedDays.map((item: string) =>
              item.substring(0, 3).toLowerCase(),
            ),
            firstMessage: firstMessage,
            formattedMessage: 'string',
            isRecivedPhotos: isRecivedPhotos,
          }
        : {
            providerServiceId: providerServiceId,
            userId: user?.id,
            providerId: providerServices[0].providerId,
            petsId: petsId,
            isRecurring: isRecurring,
            appointmentserviceType: 'NONE',
            dropOffStartTime: dropOffStartTime,
            dropOffEndTime: dropOffEndTime,
            pickUpStartTime: pickUpStartTime,
            pickUpEndTime: pickUpEndTime,
            proposalOtherDate: multiDate.map((item: string) => ({
              date: new Date(item).toISOString(),
            })),
            firstMessage: firstMessage,
            formattedMessage: 'string',
            isRecivedPhotos: isRecivedPhotos,
          };
      const payload =
        serviceTypeId === 1 || serviceTypeId === 2
          ? boardSittingPayload
          : serviceTypeId === 3 || serviceTypeId === 5
          ? dropDogPayload
          : doggyPayload;
      const response = await request(endpoint, payload);
      console.log('re', response);
      response.ok &&
        navigation.navigate('ActivityScreen', {
          appointmentOpk: response.data.data.appointment.opk,
          screen: 'Inbox',
        });
      console.log('pay', payload);
    }
  };
  useEffect(() => {
    providerServices === null && dispatch(getProviderServices('dOkDx5rM'));
    dispatch(getAllPets());
  }, []);
  return {
    handleSubmit,
    btnLoading,
    loading,
  };
};
