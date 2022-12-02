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

  const modRecurringSelectedDay =
    proposedServiceInfo?.recurringSelectedDay?.map((item: any) =>
      dayss
        .filter(it => it.substring(0, 3).toLowerCase() === item.name)
        .join(', '),
    );
  // const modRecurringSelectedDay =
  //   proposedServiceInfo?.recurringSelectedDay?.map((item: any) => item.date);

  const DoggySelected = dayss?.filter(item =>
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
    providerTimeZone: proposedServiceInfo.providerTimeZone,
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
        ? proposedServiceInfo?.recurringStartDate
        : '',
    selectedDays:
      proposedServiceInfo?.serviceTypeId === 4
        ? DoggySelected
        : proposedServiceInfo?.recurringSelectedDay
        ? modRecurringSelectedDay
        : [],
    repeatDate: next6Days ? next6Days : [],
    proposalStartDate: proposedServiceInfo?.proposalStartDate
      ? proposedServiceInfo?.proposalStartDate
      : '',
    proposalEndDate: proposedServiceInfo?.proposalEndDate
      ? proposedServiceInfo?.proposalEndDate
      : '',
    // proposalScheduleDate: modProposalScheduleDate,
    // proposalRecurringDate: modProposalRecurringDate,
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
            date: dayss?.filter(
              d => d.substring(0, 3).toLowerCase() === it.name,
            )[0],
            visits: it?.visits?.map((vis: any) => vis.time),
          }))
        : [],
    specificModDates:
      !proposedServiceInfo?.isRecurring &&
      proposedServiceInfo?.proposalOtherDate
        ? proposedServiceInfo?.proposalOtherDate
        : [],
    multiDate: !proposedServiceInfo?.isRecurring
      ? proposedServiceInfo?.proposalOtherDate?.map(
          (di: {date: string}) => di.date,
        )
      : [],
    // multiDate:
    //   proposedServiceInfo?.serviceTypeId === 4 &&
    //   !proposedServiceInfo?.isRecurring
    //     ? proposedServiceInfo?.proposalOtherDate?.map(
    //         (di: {date: string}) => di.date,
    //       )
    //     : !proposedServiceInfo?.isRecurring
    //     ? modMultiDates
    //     : [],
    selectedRange: getDatesInRange(d1, d2),
    selectDate: [],
  };
};
