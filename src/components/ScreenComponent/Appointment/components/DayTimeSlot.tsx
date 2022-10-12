import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from '../../../common/TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';
import {useWatch} from 'react-hook-form';

const DayTimeSlot = () => {
  const {recurringSelectedDay, isRecurring, repeatDate, multiDate} = useWatch();

  const output = repeatDate.filter((obj: any) => {
    return recurringSelectedDay.indexOf(obj.day) !== -1;
  });
  const modData = isRecurring
    ? output?.map((item: any, index: number) => ({
        id: index + 1,
        date: item.day,
        // day: item.day,
        active: index === 0 ? null : true,
      }))
    : multiDate?.map((item: any, index: number) => ({
        id: index + 1,
        date: item,
        active: index === 0 ? null : true,
      }));
  const [active, setActive] = useState(true);
  const [newData, setDatas] = useState(modData);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
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
              <TitleText textStyle={styles.day} text={item.date} />
              {/* <TitleText textStyle={styles.day} text={item.day} /> */}
              <DescriptionText text={'Add one or more walk times'} />
              <TimeMultiSlotPicker />
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
