import {format} from 'date-fns';
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
var dayss = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const useModReqInitialState = () => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  const d1 = new Date(proposedServiceInfo?.proposalStartDate);
  const d2 = new Date(proposedServiceInfo?.proposalEndDate);

  const next6Days =
    proposedServiceInfo.recurringStartDate !== undefined &&
    [...Array(7).keys()].map(index => {
      const date = new Date(proposedServiceInfo.recurringStartDate);
      date?.setDate(date.getDate() + index);
      var d = new Date(date);
      var dayName = dayss[d.getDay()];
      return {date: date?.toDateString(), day: dayName};
    });

  const modMultiDates = proposedServiceInfo?.proposalOtherDate?.map(
    (item: {date: string}) => item.date,
  );
  const modMultiDateTimes = proposedServiceInfo?.proposalOtherDate?.filter(
    (item: {sameAsStartDate: boolean}) => item.sameAsStartDate === false,
  );
  console.log('inital state', proposedServiceInfo, modMultiDateTimes);

  return {
    providerServiceId: null,
    userId: proposedServiceInfo?.userId,
    providerId: proposedServiceInfo?.providerId,
    serviceTypeId: proposedServiceInfo?.serviceTypeId,
    visitLength: proposedServiceInfo.length,
    isRecurring: proposedServiceInfo.isRecurring,

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
    recurringStartDate:
      proposedServiceInfo?.recurringStartDate !== undefined
        ? format(
            new Date(proposedServiceInfo?.recurringStartDate),
            'yyyy-MM-dd',
          )
        : '',
    recurringSelectedDay: proposedServiceInfo?.recurringSelectedDay
      ? proposedServiceInfo.recurringSelectedDay
      : [],
    repeatDate: next6Days ? next6Days : [],
    proposalStartDate: proposedServiceInfo?.proposalStartDate
      ? format(new Date(proposedServiceInfo?.proposalStartDate), 'yyyy-MM-dd')
      : '',
    proposalEndDate: proposedServiceInfo?.proposalEndDate
      ? format(new Date(proposedServiceInfo?.proposalEndDate), 'yyyy-MM-dd')
      : '',
    proposalOtherDate: proposedServiceInfo?.proposalOtherDate
      ? proposedServiceInfo.proposalOtherDate
      : [],
    petsId: proposedServiceInfo?.appointmentPet
      ? proposedServiceInfo.appointmentPet.map(
          (item: {petId: number}) => item.petId,
        )
      : [],
    recurringModDatesRef: [],
    specificModDatesRef: [],
    recurringModDates:
      proposedServiceInfo.isRecurring && proposedServiceInfo?.proposalOtherDate
        ? modMultiDateTimes
        : [],
    specificModDates:
      !proposedServiceInfo.isRecurring && proposedServiceInfo?.proposalOtherDate
        ? modMultiDateTimes
        : [],
    multiDate: !proposedServiceInfo.isRecurring ? modMultiDates : [],
    selectedRange: getDatesInRange(d1, d2),
    selectDate: [],
    markedStyle: {},
  };
};
