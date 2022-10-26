import {useNavigation} from '@react-navigation/native';
import format from 'date-fns/format';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {getProviderProposal} from '../../../../store/slices/Appointment/Proposal/getProviderProposal';
import {useAppSelector, useAppDispatch} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';

export const useModifyAppointment = (route: any) => {
  const {} = useAppSelector(state => state.proposal);
  const {loading, request} = useApi(methods._put);
  const {appointmentOpk} = route.params;
  const dispatch = useAppDispatch();
  const endpoint = `/appointment/update/${appointmentOpk}/proposal`;
  const navigation = useNavigation<any>();
  const {user} = useAppSelector(state => state.whoAmI);
  const handleSubmit = async (data: any) => {
    // const user: any = await storage.getUser();
    const {
      petsId,
      userId,
      providerId,
      proposalStartDate,
      proposalEndDate,
      dropOffStartTime,
      dropOffEndTime,
      pickUpStartTime,
      pickUpEndTime,
      serviceTypeId,
      specificModDates,
      recurringModDates,
      selectedDays,
      recurringStartDate,
      isRecurring,
      visitLength,
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
      (serviceTypeId === 3 || serviceTypeId === 4 || serviceTypeId === 5) &&
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
      (serviceTypeId === 3 || serviceTypeId === 4 || serviceTypeId === 5) &&
      !isRecurring &&
      multiDate.length === 0
    ) {
      Alert.alert('You have select specific dates');
    } else if (
      (serviceTypeId === 3 || serviceTypeId === 4 || serviceTypeId === 5) &&
      !isRecurring &&
      specificModDates.length === 0
    ) {
      Alert.alert('You have select walk / visit times');
    } else if (petsId.length === 0 || petsId === undefined) {
      Alert.alert('You have to select at least one pet');
    } else {
      if (serviceTypeId === 1 || serviceTypeId === 2) {
        const boardingSittingFT = `${
          serviceTypeId === 1
            ? 'Boarding Proposal: \n'
            : 'House Sitting Proposal:\n'
        }Starting from:\n ${format(
          new Date(proposalStartDate),
          'iii LLL d',
        )} ${pickUpStartTime} - ${pickUpEndTime} \n ending at:\n ${format(
          new Date(proposalEndDate),
          'iii LLL d',
        )} at ${dropOffStartTime} - ${dropOffEndTime}`;

        const boardSittingPayload = {
          proposedBy:
            user?.id === userId
              ? 'USER'
              : user?.provider?.id === providerId && 'PROVIDER',
          petsId: petsId,
          dropOffStartTime: dropOffStartTime,
          dropOffEndTime: dropOffEndTime,
          pickUpStartTime: pickUpStartTime,
          pickUpEndTime: pickUpEndTime,
          proposalStartDate: proposalStartDate,
          proposalEndDate: proposalEndDate,
          formattedMessage: boardingSittingFT,
          appointmentserviceType: 'NONE',
        };
        const result = await request(endpoint, boardSittingPayload);
        if (result.ok) {
          dispatch(getProviderProposal(result.data.data.appointment.opk));
          navigation.navigate('ActivityScreen', {
            appointmentOpk: result.data.data.appointment.opk,
          });
        }
      } else if (serviceTypeId === 3 || serviceTypeId === 5) {
        const sortedSpecificModDates = !isRecurring
          ? specificModDates.map((item: any, i: number) => ({
              id: i + 1,
              date: new Date(item.date).toISOString(),
              name: item.date,
              startDate: item.startDate !== undefined ? item.startDate : false,
              sameAsStartDate: item.sameAsStartDate,
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
              sameAsStartDate: item.sameAsStartDate,
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
                    } at ${item.visitTime.join(', ')}`,
                )}  `
              : `Drop In Visit Proposal:\n${specificModDates.map(
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
              proposedBy:
                user?.id === userId
                  ? 'USER'
                  : user?.provider?.id === providerId && 'PROVIDER',
              petsId: petsId,
              length: visitLength,
              isRecurring: isRecurring,
              formattedMessage: dropInVisitFT,
              appointmentserviceType:
                serviceTypeId === 3
                  ? 'VISIT'
                  : serviceTypeId === 5
                  ? 'WALK'
                  : 'NONE',
              recurringStartDate: new Date(recurringStartDate).toISOString(),
              recurringSelectedDay: sortedRecurringDates,
            }
          : {
              proposedBy:
                user?.id === userId
                  ? 'USER'
                  : user?.provider?.id === providerId && 'PROVIDER',
              petsId: petsId,
              length: visitLength,
              isRecurring: isRecurring,
              formattedMessage: dropInVisitFT,
              appointmentserviceType:
                serviceTypeId === 3
                  ? 'VISIT'
                  : serviceTypeId === 5
                  ? 'WALK'
                  : 'NONE',
              proposalOtherDate: sortedSpecificModDates,
            };
        const result = await request(endpoint, dropDogPayload);

        if (result.ok) {
          dispatch(getProviderProposal(result.data.data.appointment.opk));
          navigation.navigate('ActivityScreen', {
            appointmentOpk: result.data.data.appointment.opk,
          });
        }
      } else if (serviceTypeId === 4) {
        const DoggyDayFT = isRecurring
          ? `Doggy Day Care Proposal:\nRepeat service starting from: ${recurringStartDate}\n 
          Drop-off: ${dropOffStartTime} - ${dropOffEndTime}\n
          Pick-Up: ${pickUpStartTime} - ${pickUpEndTime}`
          : `Doggy Day Care Proposal:\n  
          One time servcie on:\n
          ${multiDate.join(', ')}\n
            Drop-off: ${dropOffStartTime} - ${dropOffEndTime} \n
          Pick-Up: ${pickUpStartTime} - ${pickUpEndTime}`;

        const doggyPayload = isRecurring
          ? {
              proposedBy:
                user?.id === userId
                  ? 'USER'
                  : user?.provider?.id === providerId && 'PROVIDER',
              petsId: petsId,
              isRecurring: isRecurring,
              formattedMessage: DoggyDayFT,
              appointmentserviceType: 'NONE',
              dropOffStartTime: dropOffStartTime,
              dropOffEndTime: dropOffEndTime,
              pickUpStartTime: pickUpStartTime,
              pickUpEndTime: pickUpEndTime,
              recurringStartDate: new Date(recurringStartDate).toISOString(),
              recurringSelectedDay: selectedDays.map((item: string) =>
                item.substring(0, 3).toLowerCase(),
              ),
            }
          : {
              proposedBy:
                user?.id === userId
                  ? 'USER'
                  : user?.provider?.id === providerId
                  ? 'PROVIDER'
                  : null,
              petsId: petsId,
              isRecurring: isRecurring,
              formattedMessage: DoggyDayFT,
              appointmentserviceType: 'NONE',
              dropOffStartTime: dropOffStartTime,
              dropOffEndTime: dropOffEndTime,
              pickUpStartTime: pickUpStartTime,
              pickUpEndTime: pickUpEndTime,
              proposalOtherDate: multiDate.map((item: string) => ({
                date: new Date(item).toISOString(),
              })),
            };
        const result = await request(endpoint, doggyPayload);

        if (result.ok) {
          dispatch(getProviderProposal(result.data.data.appointment.opk));
          navigation.navigate('ActivityScreen', {
            appointmentOpk: result.data.data.appointment.opk,
          });
        }
      }
    }
  };

  return {handleSubmit, loading};
};
