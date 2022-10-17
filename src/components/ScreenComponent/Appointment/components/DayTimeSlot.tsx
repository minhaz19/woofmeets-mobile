import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from '../../../common/TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';
import {useFormContext, useWatch} from 'react-hook-form';

let modData: any = [];
const DayTimeSlot = () => {
  const {setValue} = useFormContext();
  // const {DIVSpecificDate} = getValues();
  const {
    recurringSelectedDay,
    specificModDates,
    recurringModDates,
    isRecurring,
    repeatDate,
    multiDate,
    proposalOtherDate,
  } = useWatch();
  const [newData, setDatas] = useState(modData);
  const handleMultipleCheck = (id: number) => {
    console.log('reloading day time slo');
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  const getRecurringDays = (rd: any, rsd: any, pod: any) => {
    const output = rd?.filter((obj: any) => {
      return rsd.indexOf(obj.day) !== -1;
    });

    const recurring = output?.map((item: any, index: number) => ({
      id: index + 1,
      date: item.day,
      active:
        pod.length !== 0
          ? pod.some(
              (elm: any) =>
                elm.date === item.day && elm.sameAsStartDate === true,
            )
          : true,
      initalSlot:
        pod.length !== 0
          ? pod?.find((elm: any) => elm.date === item.day).visitTime
          : [],
    }));
    return recurring;
  };
  useEffect(() => {
    console.log('1');
    if (isRecurring) {
      const recurring = getRecurringDays(
        repeatDate,
        recurringSelectedDay,
        proposalOtherDate,
      );
      setDatas(recurring);
      console.log('recurring', recurring, repeatDate, recurringSelectedDay);
    } else {
      const multi = multiDate?.map((item: any, index: number) => ({
        id: index + 1,
        date: item,
        active: true,
      }));
      setDatas(multi);
    }
  }, [
    isRecurring,
    repeatDate,
    recurringSelectedDay,
    multiDate,
    proposalOtherDate,
  ]);
  useEffect(() => {
    console.log('2');
    if (isRecurring) {
      const unMatched = newData?.filter((item: {date: string}) => {
        return !recurringModDates?.some(
          (it: {date: string}) => item.date === it.date,
        );
      });
      console.log('un matched', unMatched);
      if (recurringModDates?.length !== 0) {
        const sameData = unMatched?.map((item: any) => ({
          date: item.date,
          visitTime: recurringModDates ? recurringModDates[0].visitTime : [],
          sameAsStartDate: true,
        }));
        sameData?.length > 0 &&
          recurringModDates?.length > 0 &&
          setValue('recurringModDates', [...recurringModDates, ...sameData]);
        console.log('recurringModDates', [...recurringModDates, ...sameData]);
      }
    } else {
      const unMatched = multiDate?.filter((item: string) => {
        return !specificModDates?.some(
          (it: {date: string}) => item === it.date,
        );
      });
      console.log('un', unMatched);
      if (specificModDates && specificModDates?.length > 0) {
        const sameData = unMatched?.map((item: any) => ({
          date: item,
          visitTime: specificModDates ? specificModDates[0].visitTime : [],
        }));
        sameData?.length > 0 &&
          specificModDates?.length > 0 &&
          setValue('specificModDates', [...specificModDates, ...sameData]);
        console.log('specificModDates', [...specificModDates, ...sameData]);
      }
    }
  }, [
    isRecurring,
    multiDate,
    newData,
    recurringModDates,
    setValue,
    specificModDates,
  ]);
  console.log('rmd', newData);
  console.log('day time slot');
  return (
    <View>
      {newData?.map((item: any, index: number) => (
        <View key={index}>
          {index === 0 ? (
            <View>
              <TitleText
                textStyle={styles.headerText}
                text={'Pick walk times'}
              />
              <TitleText textStyle={styles.day} text={item.date} />
              {/* <TitleText textStyle={styles.day} text={item.day} /> */}
              <DescriptionText text={'Add one or more walk times'} />
              <TimeMultiSlotPicker
                date={item.date}
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
                  date={item.date}
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
