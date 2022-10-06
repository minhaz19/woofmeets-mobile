import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from '../../../common/TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';

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
  console.log(newData);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  return (
    <View>
      {newData.map((item, index) => (
        <>
          {index === 0 ? (
            <View>
              <TitleText
                textStyle={styles.headerText}
                text={'Pick walk times'}
              />
              <TitleText textStyle={styles.day} text={'Monday'} />
              <DescriptionText text={'Add one or more walk times'} />
              <TimeMultiSlotPicker />
            </View>
          ) : (
            <View style={styles.section}>
              <TitleText textStyle={styles.day} text={'Monday'} />
              <View style={styles.checkContainer}>
                <DescriptionText text="Use same walk times as Mondays" />
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
        </>
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
