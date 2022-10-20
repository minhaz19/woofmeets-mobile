import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from './TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';
import {useDayTimeSlot} from './utils/useDayTimeSlot';

const DayTimeSlot = () => {
  // const {setValue} = useFormContext();
  // // const {DIVSpecificDate} = getValues();
  // const {
  //   recurringSelectedDay,
  //   specificModDatesRef,
  //   recurringModDatesRef,
  //   isRecurring,
  //   repeatDate,
  //   multiDate,
  //   proposalOtherDate,
  // } = useWatch();
  // const [newData, setDatas] = useState(modData);
  // const handleMultipleCheck = (id: number) => {
  //   console.log('reloading day time slo');
  //   const newArray = [...newData];
  //   const index = newArray.findIndex(item => item.id === id);
  //   newArray[index].active = !newArray[index].active;
  //   setDatas(newArray);
  // };
  // const getRecurringDays = (rd: any, rsd: any, pod: any) => {
  //   const output = rd?.filter((obj: any) => {
  //     return rsd.indexOf(obj.day) !== -1;
  //   });

  //   const recurring = output?.map((item: any, index: number) => ({
  //     id: index + 1,
  //     date: item.day,
  //     active:
  //       pod.length !== 0
  //         ? pod.some(
  //             (elm: any) =>
  //               elm.date === item.day && elm.sameAsStartDate === true,
  //           )
  //         : true,
  //     startDate:
  //       pod.length !== 0
  //         ? pod.some(
  //             (elm: any) => elm.date === item.day && elm?.startDate === true,
  //           )
  //         : index === 0
  //         ? true
  //         : false,
  //     initalSlot:
  //       pod.length !== 0
  //         ? pod?.find((elm: any) => elm.date === item.day).visitTime
  //         : [],
  //   }));
  //   return recurring;
  // };
  // useEffect(() => {
  //   console.log('1');
  //   if (isRecurring) {
  //     const recurring = getRecurringDays(
  //       repeatDate,
  //       recurringSelectedDay,
  //       proposalOtherDate,
  //     );
  //     setDatas(recurring);
  //     console.log('recurring', recurring, repeatDate, recurringSelectedDay);
  //   } else if (!isRecurring) {
  //     const multi = multiDate?.map((item: any, index: number) => ({
  //       id: index + 1,
  //       date: item,
  //       startDate:
  //         proposalOtherDate.length !== 0
  //           ? proposalOtherDate.some(
  //               (elm: any) => elm.date === item.day && elm?.startDate === true,
  //             )
  //           : index === 0
  //           ? true
  //           : false,
  //       active:
  //         proposalOtherDate.length !== 0
  //           ? proposalOtherDate.some(
  //               (elm: any) => elm.date === item && elm.sameAsStartDate === true,
  //             )
  //           : true,
  //       initalSlot:
  //         proposalOtherDate.length !== 0
  //           ? proposalOtherDate?.find((elm: any) => elm.date === item)
  //               ?.visitTime
  //           : [],
  //     }));
  //     setDatas(multi);
  //   }
  // }, [
  //   isRecurring,
  //   repeatDate,
  //   recurringSelectedDay,
  //   multiDate,
  //   proposalOtherDate,
  // ]);
  // useEffect(() => {
  //   console.log('2');
  //   if (isRecurring) {
  //     const unMatched = newData?.filter((item: {date: string}) => {
  //       return !recurringModDatesRef?.some(
  //         (it: {date: string}) => item.date === it.date,
  //       );
  //     });
  //     console.log('un matched', unMatched, newData, recurringModDatesRef);
  //     if (recurringModDatesRef?.length !== 0) {
  //       const sameData = unMatched?.map((item: any) => ({
  //         date: item.date,
  //         visitTime: recurringModDatesRef
  //           ? recurringModDatesRef[0].visitTime
  //           : [],
  //         sameAsStartDate: true,
  //       }));
  //       sameData?.length > 0 &&
  //         recurringModDatesRef?.length > 0 &&
  //         setValue('recurringModDates', [...recurringModDatesRef, ...sameData]);
  //       console.log('recurringModDates', sameData, recurringModDatesRef, [
  //         ...recurringModDatesRef,
  //         ...sameData,
  //       ]);
  //     }
  //   } else if (!isRecurring) {
  //     const unMatched = newData?.filter((item: any) => {
  //       return !specificModDatesRef?.some(
  //         (it: {date: string}) => item.date === it.date,
  //       );
  //     });

  //     if (specificModDatesRef && specificModDatesRef?.length > 0) {
  //       const sameData = unMatched?.map((item: any) => ({
  //         date: item.date,
  //         visitTime: specificModDatesRef
  //           ? specificModDatesRef[0].visitTime
  //           : [],
  //         sameAsStartDate: true,
  //       }));
  //       sameData &&
  //         sameData?.length > 0 &&
  //         specificModDatesRef?.length > 0 &&
  //         setValue('specificModDates', [...specificModDatesRef, ...sameData]);
  //       console.log('specificModDatesRef', [
  //         ...specificModDatesRef,
  //         ...sameData,
  //       ]);
  //     }
  //     console.log(
  //       'rmd',

  //       isRecurring,
  //       newData,
  //       specificModDatesRef,
  //       unMatched,
  //     );
  //   }
  // }, [
  //   isRecurring,
  //   newData,
  //   recurringModDatesRef,
  //   setValue,
  //   specificModDatesRef,
  // ]);
  const {newData, isRecurring, handleMultipleCheck} = useDayTimeSlot();

  return (
    <View>
      {newData?.map((item: any, index: number) => (
        <View key={index}>
          {item.startDate ? (
            <View>
              <TitleText
                textStyle={styles.headerText}
                text={'Pick walk times'}
              />
              <TitleText textStyle={styles.day} text={item.date} />
              {/* <TitleText textStyle={styles.day} text={item.day} /> */}
              <DescriptionText text={'Add one or more walk times'} />
              <TimeMultiSlotPicker
                singleItem={item}
                isRecurring={isRecurring}
                initalSlot={item?.initalSlot}
              />
            </View>
          ) : (
            <View style={styles.section}>
              <TitleText textStyle={styles.day} text={item.date} />
              <View style={styles.checkContainer}>
                <DescriptionText text={`Use same walk times as ${item.day}`} />
                <SwitchView
                  isActive={item.active}
                  activeText=""
                  inActiveText=""
                  onSelect={() => {
                    // setActive(!active);
                    handleMultipleCheck(item.id);
                  }}
                />
              </View>
              {!item.active && (
                <TimeMultiSlotPicker
                  singleItem={item}
                  isRecurring={isRecurring}
                  initalSlot={item?.initalSlot}
                />
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default DayTimeSlot;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  day: {
    fontSize: Text_Size.Text_2,
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginVertical: 10,
  },
});
