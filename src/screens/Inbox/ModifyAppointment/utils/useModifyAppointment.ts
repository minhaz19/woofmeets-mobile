/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {io} from 'socket.io-client';
import methods from '../../../../api/methods';
import {
  convertDateTZ,
  formatDate,
} from '../../../../components/common/formatDate';
import {getProviderProposal} from '../../../../store/slices/Appointment/Proposal/getProviderProposal';
import {getProviderServices} from '../../../../store/slices/Appointment/ProviderServices/getProviderServices';
import {getAllPets} from '../../../../store/slices/pet/allPets/allPetsAction';
import {useAppSelector, useAppDispatch} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {msgUrl} from '../../../../utils/helpers/httpRequest';

export const useModifyAppointment = (route: any) => {
  const [socket, setSocket] = useState<any>(null);
  const {loading, request} = useApi(methods._put);
  const {appointmentOpk} = route.params;
  const dispatch = useAppDispatch();
  const endpoint = `/appointment/update/${appointmentOpk}/proposal`;
  const navigation = useNavigation<any>();
  const {user} = useAppSelector(state => state.whoAmI);
  const handleSubmit = async (data: any) => {
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
      providerTimeZone,
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
      (serviceTypeId === 1 || serviceTypeId === 2 || serviceTypeId === 4) &&
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
        }Starting from:\n ${formatDate(
          proposalStartDate,
          'iii LLL d',
        )} ${pickUpStartTime} - ${pickUpEndTime} \n ending at:\n ${formatDate(
          proposalEndDate,
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
          proposalStartDate: convertDateTZ(proposalStartDate, providerTimeZone),
          proposalEndDate: convertDateTZ(proposalEndDate, providerTimeZone),
          formattedMessage: boardingSittingFT,
          appointmentserviceType: 'NONE',
        };
        const result = await request(endpoint, boardSittingPayload);
        if (result.ok) {
          const payloadData: any = {
            sender: user?.id,
            group: result.data.data.appointment.messageGroupId,
            content: boardingSittingFT,
            createdAt: new Date(),
          };
          socket.emit('send-message', payloadData);
          dispatch(getProviderProposal(result.data.data.appointment.opk));
          navigation.navigate('ActivityScreen', {
            appointmentOpk: result.data.data.appointment.opk,
          });
        } else {
          Alert.alert(result.data.message);
        }
      } else if (serviceTypeId === 3 || serviceTypeId === 5) {
        const sortedSpecificModDates = !isRecurring
          ? specificModDates.map((item: any, i: number) => ({
              id: i + 1,
              date: convertDateTZ(item.date, providerTimeZone),
              name: formatDate(item.date, 'yyyy-MM-dd'),
              visits: item.visits.map((time: string, index: number) => ({
                id: index + 1,
                time: time,
              })),
            }))
          : [];
        const sortedRecurringDates = isRecurring
          ? recurringModDates?.map((item: any, i: number) => ({
              id: i + 1,
              date: item.date,
              name: item.date.substring(0, 3).toLowerCase(),
              visits: item?.visits?.map((time: string, index: number) => ({
                id: index + 1,
                time: time,
              })),
            }))
          : [];
        const dropInVisitFT =
          serviceTypeId === 3
            ? isRecurring
              ? `Drop In Visit Proposal:\nRepeat service starting from: ${recurringStartDate}\n${recurringModDates?.map(
                  (item: any) =>
                    `${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.length
                        : item.visits.length
                    } Visits on: ${item.date} at ${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.join(', ')
                        : item.visits.join(', ')
                    }\n`,
                )}  `
              : `Drop In Visit Proposal:\n${specificModDates.map(
                  (item: any) =>
                    `${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.length
                        : item.visits.length
                    } Visits on: ${formatDate(item.date, 'iii, LLL d')} at ${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.join(', ')
                        : item.visits.join(', ')
                    }`,
                )}  `
            : serviceTypeId === 5
            ? isRecurring
              ? `Dog Walking Proposal:\nRepeat service starting from: ${recurringStartDate}\n${recurringModDates.map(
                  (item: any) =>
                    `${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.length
                        : item.visits.length
                    } Visits on: ${item.date} at ${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.join(', ')
                        : item.visits.join(', ')
                    }`,
                )}  `
              : `Dog Walking Proposal:\n${specificModDates.map(
                  (item: any) =>
                    `${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.length
                        : item.visits.length
                    } Visits on: ${formatDate(item.date, 'iii, LLL d')} at ${
                      item?.visits && item?.visits.length !== 0
                        ? item?.visits.join(', ')
                        : item.visits.join(', ')
                    }`,
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
              // recurringStartDate: isRecurring
              //   ? new Date(
              //       new Date(
              //         recurringStartDate.replace(/-/g, '/').replace(/T.+/, ''),
              //       ).toLocaleString('en-US', {
              //         providerTimeZone,
              //       }),
              //     )
              //   : null,
              recurringStartDate: convertDateTZ(
                recurringStartDate,
                providerTimeZone,
              ),
              proposalVisits: sortedRecurringDates,
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
              proposalVisits: sortedSpecificModDates,
            };

        const result = await request(endpoint, dropDogPayload);

        if (result.ok) {
          const payloadData: any = {
            sender: user?.id,
            group: result.data.data.appointment.messageGroupId,
            content: dropInVisitFT,
            createdAt: new Date(),
          };
          socket.emit('send-message', payloadData);
          dispatch(getProviderProposal(result.data.data.appointment.opk));
          navigation.navigate('ActivityScreen', {
            appointmentOpk: result.data.data.appointment.opk,
          });
        } else {
          Alert.alert(result.data.message);
        }
      } else if (serviceTypeId === 4) {
        const DoggyDayFT = isRecurring
          ? `Doggy Day Care Proposal:\nRepeat service starting from: ${recurringStartDate}\nDrop-off: ${dropOffStartTime} - ${dropOffEndTime}\nPick-Up: ${pickUpStartTime} - ${pickUpEndTime}`
          : `Doggy Day Care Proposal:\nOne time servcie on:\n${multiDate.join(
              ', ',
            )}\nDrop-off: ${dropOffStartTime} - ${dropOffEndTime}\nPick-Up: ${pickUpStartTime} - ${pickUpEndTime}`;

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
              // recurringStartDate: isRecurring
              //   ? new Date(
              //       new Date(
              //         recurringStartDate.replace(/-/g, '/').replace(/T.+/, ''),
              //       ).toLocaleString('en-US', {
              //         providerTimeZone,
              //       }),
              //     )
              //   : null,
              recurringStartDate: convertDateTZ(
                recurringStartDate,
                providerTimeZone,
              ),
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
              proposalOtherDate: multiDate.map((item: string) =>
                convertDateTZ(item, providerTimeZone),
              ),
            };
        const result = await request(endpoint, doggyPayload);

        if (result.ok) {
          const payloadData: any = {
            sender: user?.id,
            group: result.data.data.appointment.messageGroupId,
            content: DoggyDayFT,
            createdAt: new Date(),
          };
          socket.emit('send-message', payloadData);
          dispatch(getProviderProposal(result.data.data.appointment.opk));
          navigation.navigate('ActivityScreen', {
            appointmentOpk: result.data.data.appointment.opk,
          });
        } else {
          Alert.alert(result.data.message);
        }
      }
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(getProviderServices(appointmentOpk));
    dispatch(getAllPets());
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (socket === null) {
      let tempSocket = io(`${msgUrl}`);
      setSocket(tempSocket);
    }
  }, [socket]);
  return {handleSubmit, loading, refreshing, onRefresh};
};
