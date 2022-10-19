import { useNavigation } from '@react-navigation/native';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
import storage from '../../../../utils/helpers/auth/storage';

export const useModifyAppointment = (route: any) => {
  const {proposal} = useAppSelector(state => state.proposal);
  const {loading, request} = useApi(methods._put);
  const {appointmentOpk} = route.params;
  const endpoint = `/appointment/update/${appointmentOpk}/proposal`;
  const navigation = useNavigation();
  const handleSubmit = async (data: any) => {
    const user: any = await storage.getUser();
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
      recurringSelectedDay,
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
      recurringSelectedDay.length === 0
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
      const boardSittingPayload = {
        proposedBy:
          user?.id === userId ? 'USER' : user?.id === providerId && 'PROVIDER',
        petsId: petsId,
        dropOffStartTime: dropOffStartTime,
        dropOffEndTime: dropOffEndTime,
        pickUpStartTime: pickUpStartTime,
        pickUpEndTime: pickUpEndTime,
        proposalStartDate: proposalStartDate,
        proposalEndDate: proposalEndDate,
        formattedMessage: 'string',
        appointmentserviceType: 'NONE',
      };
      const dropDogPayload = {
        proposedBy:
          user?.id === userId ? 'USER' : user?.id === providerId && 'PROVIDER',
        petsId: petsId,
        length: visitLength,
        isRecurring: isRecurring,
        formattedMessage: 'string',
        appointmentserviceType:
          serviceTypeId === 3 ? 'VISIT' : serviceTypeId === 5 ? 'WALK' : 'NONE',
        proposalOtherDate: isRecurring ? recurringModDates : specificModDates,
        recurringStartDate: isRecurring
          ? new Date(recurringStartDate).toISOString()
          : undefined,
        recurringSelectedDay: isRecurring ? recurringSelectedDay : [],
      };
      const doggyPayload = {
        proposedBy:
          user?.id === userId ? 'USER' : user?.id === providerId && 'PROVIDER',
        petsId: petsId,
        isRecurring: isRecurring,
        formattedMessage: 'string',
        appointmentserviceType: 'NONE',
        dropOffStartTime: dropOffStartTime,
        dropOffEndTime: dropOffEndTime,
        pickUpStartTime: pickUpStartTime,
        pickUpEndTime: pickUpEndTime,
        proposalOtherDate: isRecurring ? recurringModDates : specificModDates,
        recurringStartDate: isRecurring
          ? new Date(recurringStartDate).toISOString()
          : undefined,
        recurringSelectedDay: isRecurring ? recurringSelectedDay : [],
      };
      const payload =
        serviceTypeId === 1 || serviceTypeId === 2
          ? boardSittingPayload
          : serviceTypeId === 3 || serviceTypeId === 5
          ? dropDogPayload
          : doggyPayload;
      const result = await request(endpoint, payload);

      if (result.ok) {
        navigation.navigate('Inbox');
      }
    }
  };

  return {handleSubmit, loading};
};
