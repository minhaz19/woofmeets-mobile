/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import format from 'date-fns/format';
import {useEffect, useState} from 'react';
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
    } else if (firstMessage === '') {
      Alert.alert('You have to provider a message to Provider');
    } else {
      if (serviceTypeId === 1 || serviceTypeId === 2) {
        const boardingSittingFT = `${
          serviceTypeId === 1
            ? 'Boarding Proposal:\n'
            : 'House Sitting Proposal:\n'
        }Starting from:\n${format(
          new Date(proposalStartDate),
          'iii LLL d',
        )} ${pickUpStartTime} - ${pickUpEndTime} \nEnding at:\n${format(
          new Date(proposalEndDate),
          'iii LLL d',
        )} at ${dropOffStartTime} - ${dropOffEndTime} `;

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
          formattedMessage: boardingSittingFT,
        };

        const response = await request(endpoint, boardSittingPayload);
        response.ok &&
          navigation.navigate('ActivityScreen', {
            appointmentOpk: response.data.data.appointment.opk,
            screen: 'Inbox',
          });
      } else if (serviceTypeId === 3 || serviceTypeId === 5) {
        const sortedSpecificModDates = !isRecurring
          ? specificModDates.map((item: any, i: number) => ({
              id: i + 1,
              date: new Date(item.date).toISOString(),
              name: format(new Date(item.date), 'yyyy-MM-dd'),
              startDate: item.startDate !== undefined ? item.startDate : false,
              visits: item.visitTime.map((time: string, index: number) => ({
                id: index + 1,
                time: time,
              })),
            }))
          : [];
        const sortedRecurringDates = isRecurring
          ? recurringModDates.map((item: any, i: number) => ({
              id: i + 1,
              date: item.date,
              name: item.date.substring(0, 3).toLowerCase(),
              startDate: item.startDate !== undefined ? item.startDate : false,
              visits: item.visitTime.map((time: string, index: number) => ({
                id: index + 1,
                time: time,
              })),
            }))
          : [];
        const dropInVisitFT =
          serviceTypeId === 3
            ? isRecurring
              ? `Drop In Visit Proposal:\nRepeat service starting from: ${recurringStartDate}\n${recurringModDates.map(
                  (item: any) =>
                    `${item.visitTime.length} Visits on: ${
                      item.date
                    }at ${item.visitTime.join(', ')}`,
                )}  `
              : `Drop In Visit Proposal:\n  ${specificModDates.map(
                  (item: any) =>
                    `${item.visitTime.length} Visits on: ${format(
                      new Date(item.date),
                      'iii, LLL d',
                    )} at ${item.visitTime.join(', ')}`,
                )}  `
            : serviceTypeId === 5
            ? isRecurring
              ? `Dog Walking Proposal:\nRepeat service starting from: ${recurringStartDate}\n${recurringModDates.map(
                  (item: any) =>
                    `${item.visitTime.length} Visits on: ${
                      item.date
                    } at ${item.visitTime.join(', ')}`,
                )}  `
              : `Dog Walking Proposal:\n${specificModDates.map(
                  (item: any) =>
                    `${item.visitTime.length} Visits on: ${format(
                      new Date(item.date),
                      'iii, LLL d',
                    )} at ${item.visitTime.join(', ')}`,
                )}  `
            : null;
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
              formattedMessage: dropInVisitFT,
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
              formattedMessage: dropInVisitFT,
            };
        const response = await request(endpoint, dropDogPayload);
        response.ok &&
          navigation.navigate('ActivityScreen', {
            appointmentOpk: response.data.data.appointment.opk,
            screen: 'Inbox',
          });
      } else if (serviceTypeId === 4) {
        const DoggyDayFT = isRecurring
          ? `Doggy Day Care Proposal:\nRepeat service starting from: ${recurringStartDate}\nDrop-off: ${dropOffStartTime} - ${dropOffEndTime}\nPick-Up: ${pickUpStartTime} - ${pickUpEndTime}`
          : `Doggy Day Care Proposal:\nOne time servcie on: \n
          ${multiDate.join(
            ', ',
          )}\nDrop-off: ${dropOffStartTime} - ${dropOffEndTime}\nPick-Up: ${pickUpStartTime} - ${pickUpEndTime}`;

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
              formattedMessage: DoggyDayFT,
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
              formattedMessage: DoggyDayFT,
              isRecivedPhotos: isRecivedPhotos,
            };
        console.log('asdfasdf', doggyPayload);
        const response = await request(endpoint, doggyPayload);
        response.ok &&
          navigation.navigate('ActivityScreen', {
            appointmentOpk: response.data.data.appointment.opk,
            screen: 'Inbox',
          });
      }
    }
  };
  useEffect(() => {
    providerServices === null && dispatch(getProviderServices('EtD85E1m'));
    dispatch(getAllPets());
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProviderServices('EtD85E1m'));
    dispatch(getAllPets());
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return {
    handleSubmit,
    btnLoading,
    loading,
    refreshing,
    onRefresh,
  };
};
