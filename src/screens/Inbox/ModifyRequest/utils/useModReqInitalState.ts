import {useAppSelector} from '../../../../store/store';

function getDatesInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate?.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
export const useModReqInitialState = () => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  // const d1 = new Date(proposedServiceInfo?.proposalStartDate);
  // const d2 = new Date(proposedServiceInfo?.proposalEndDate);

  // console.log(proposedServiceInfo.specificModDates);

  return {
    providerServiceId: null,
    serviceTypeId: proposedServiceInfo?.serviceTypeId,
    visitLength: proposedServiceInfo?.visitLength,
    isRecurring: proposedServiceInfo?.isRecurring,

    dropOffStartTime: proposedServiceInfo?.dropOffStartTime
      ? proposedServiceInfo.dropOffStartTime
      : '',
    dropOffEndTime: proposedServiceInfo?.dropOffEndTime
      ? proposedServiceInfo.dropOffEndTime
      : '',
    pickUpStartTime: proposedServiceInfo?.pickUpStartTime
      ? proposedServiceInfo.pickUpStartTime
      : '',
    pickUpEndTime: proposedServiceInfo?.pickUpEndTime
      ? proposedServiceInfo.pickUpEndTime
      : '',
    recurringStartDate: proposedServiceInfo?.recurringStartDate
      ? proposedServiceInfo.recurringStartDate
      : '',
    recurringSelectedDay: proposedServiceInfo?.recurringSelectedDay
      ? proposedServiceInfo.recurringSelectedDay
      : [],
    repeatDate: [],
    proposalStartDate: proposedServiceInfo?.proposalStartDate
      ? proposedServiceInfo.proposalStartDate
      : '',
    proposalEndDate: proposedServiceInfo?.proposalEndDate
      ? proposedServiceInfo.proposalEndDate
      : '',
    proposalOtherDate: proposedServiceInfo?.proposalOtherDate
      ? proposedServiceInfo.proposalOtherDate
      : [],
    petsId: proposedServiceInfo?.appointmentPet
      ? proposedServiceInfo.appointmentPet
      : [],
    recurringModDates: proposedServiceInfo?.recurringModDates
      ? proposedServiceInfo.recurringModDates
      : [],
    specificModDates: proposedServiceInfo?.specificModDates
      ? proposedServiceInfo.specificModDates
      : [],
    multiDate: [],
    // selectedRange: getDatesInRange(d1, d2),
    selectDate: [],
    markedStyle: {},
  };
};
