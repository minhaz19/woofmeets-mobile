import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from '../../../common/TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';
import {useFormContext} from 'react-hook-form';

const dates = [
  {
    id: 1,
    date: '10-20-30',
    active: null,
  },
  {
    id: 2,
    date: '10-20-30',
    active: true,
  },
  {
    id: 3,
    date: '10-20-30',
    active: true,
  },
  {
    id: 4,
    date: '10-20-30',
    active: true,
  },
  {
    id: 5,
    date: '10-20-30',
    active: true,
  },
  {
    id: 6,
    date: '10-20-30',
    active: true,
  },
  {
    id: 7,
    date: '10-20-30',
    active: true,
  },
];
const DayTimeSlot = () => {
  const [active, setActive] = useState(true);
  const [newData, setDatas] = useState(dates);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  const {watch} = useFormContext();
  const {recurringSelectedDay, repeatDate} = watch();

  const output = repeatDate.filter((obj: any) => {
    return recurringSelectedDay.indexOf(obj.day) !== -1;
  });
  const modData = output?.map((item: any, index: number) => ({
    id: index + 1,
    date: item.date,
    day: item.day,
    active: index === 0 ? null : true,
  }));
  console.log('recurringSelectedDay', recurringSelectedDay, repeatDate, output);
  return (
    <View>
      {modData?.map((item: any, index: number) => (
        <View key={index}>
          {index === 0 ? (
            <View>
              <TitleText
                textStyle={styles.headerText}
                text={'Pick walk times'}
              />
              <TitleText textStyle={styles.day} text={item.day} />
              <DescriptionText text={'Add one or more walk times'} />
              <TimeMultiSlotPicker />
            </View>
          ) : (
            <View style={styles.section}>
              <TitleText textStyle={styles.day} text={item.day} />
              <View style={styles.checkContainer}>
                <DescriptionText text={`Use same walk times as ${item.day}`} />
                <SwitchView
                  isActive={item.active}
                  activeText=""
                  inActiveText=""
                  onSelect={() => {
                    setActive(!active);
                    handleMultipleCheck(item.id);
                  }}
                />
              </View>
              {!item.active && <TimeMultiSlotPicker />}
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
