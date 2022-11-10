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

  if (
    proposedServiceInfo?.serviceTypeId === 3 ||
    proposedServiceInfo?.serviceTypeId === 5
  ) {
  }
  const d1 = new Date(proposedServiceInfo?.proposalStartDate);
  const d2 = new Date(proposedServiceInfo?.proposalEndDate);

  const next6Days =
    proposedServiceInfo?.recurringStartDate !== '' &&
    [...Array(7).keys()].map(index => {
      const date = new Date(proposedServiceInfo?.recurringStartDate);
      date?.setDate(date.getDate() + index);
      var d = new Date(date);
      var dayName = dayss[d.getDay()];
      return {date: date?.toDateString(), day: dayName};
    });

  const modMultiDates = proposedServiceInfo?.proposalOtherDate?.map(
    (item: {name: string}) => item.name,
  );
  const modRecurringSelectedDay =
    proposedServiceInfo?.recurringSelectedDay?.map((item: any) => item.date);

  const modProposalRecurringDate =
    proposedServiceInfo?.recurringSelectedDay?.map((item: any) => ({
      date: item?.date,
      visits: item?.visits?.map((it: any) => it.time),
    }));
  const modProposalScheduleDate = proposedServiceInfo?.proposalOtherDate?.map(
    (item: any) => ({
      date: item?.name,
      visits: item?.visits?.map((it: any) => it.time),
    }),
  );
  const DoggySelected = dayss.filter(item =>
    proposedServiceInfo?.recurringSelectedDay?.includes(
      item.substring(0, 3).toLowerCase(),
    ),
  );
  return {
    providerServiceId: null,
    userId: proposedServiceInfo?.userId,
    providerId: proposedServiceInfo?.providerId,
    serviceTypeId: proposedServiceInfo?.serviceTypeId,
    visitLength: proposedServiceInfo?.length,
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
    recurringStartDate:
      proposedServiceInfo?.isRecurring &&
      proposedServiceInfo?.recurringStartDate !== ''
        ? format(
            new Date(proposedServiceInfo?.recurringStartDate),
            'yyyy-MM-dd',
          )
        : '',
    selectedDays:
      proposedServiceInfo?.serviceTypeId === 4
        ? DoggySelected
        : proposedServiceInfo?.recurringSelectedDay
        ? modRecurringSelectedDay
        : [],
    repeatDate: next6Days ? next6Days : [],
    proposalStartDate: proposedServiceInfo?.proposalStartDate
      ? format(new Date(proposedServiceInfo?.proposalStartDate), 'yyyy-MM-dd')
      : '',
    proposalEndDate: proposedServiceInfo?.proposalEndDate
      ? format(new Date(proposedServiceInfo?.proposalEndDate), 'yyyy-MM-dd')
      : '',
    proposalScheduleDate: modProposalScheduleDate,
    proposalRecurringDate: modProposalRecurringDate,
    petsId:
      proposedServiceInfo?.appointmentPet &&
      proposedServiceInfo?.appointmentPet.length > 0
        ? proposedServiceInfo.appointmentPet.map(
            (item: {petId: number}) => item.petId,
          )
        : [],
    recurringModDates:
      proposedServiceInfo?.isRecurring &&
      proposedServiceInfo?.recurringSelectedDay
        ? proposedServiceInfo?.recurringSelectedDay.map((it: any) => ({
            date: it?.date,
            visits: it?.visits?.map((vis: any) => vis.time),
          }))
        : [],
    specificModDates:
      !proposedServiceInfo?.isRecurring &&
      proposedServiceInfo?.proposalOtherDate
        ? proposedServiceInfo?.proposalOtherDate.map((it: any) => ({
            date: it?.date,
            name: it?.name,
            visits: it?.visits?.map((vis: any) => vis.time),
          }))
        : [],
    multiDate:
      proposedServiceInfo?.serviceTypeId === 4 &&
      !proposedServiceInfo?.isRecurring
        ? proposedServiceInfo?.proposalOtherDate?.map((di: {date: string}) =>
            format(new Date(di.date), 'yyyy-MM-dd'),
          )
        : !proposedServiceInfo?.isRecurring
        ? modMultiDates
        : [],
    selectedRange: getDatesInRange(d1, d2),
    selectDate: [],
  };
};
