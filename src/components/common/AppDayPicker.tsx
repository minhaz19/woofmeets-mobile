/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import TitleText from './text/TitleText';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Text_Size from '../../constants/textScaling';
import {useFormContext} from 'react-hook-form';

const day = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
let selectedDays: string[] = [];
const AppDayPicker = () => {
  const [newData, setDatas] = useState<any>([]);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  const {setValue, watch} = useFormContext();
  const {selectedDays: sDays} = watch();
  useEffect(() => {
    const modDays = day.map((item, index) => ({
      id: index + 1,
      day: item.charAt(0),
      value: item,
      active:
        sDays?.findIndex((it: string) => it === item) !== -1 ? true : false,
    }));
    setDatas(modDays);
  }, []);

  return (
    <View style={styles.container}>
      <TitleText
        textStyle={styles.titleText}
        text={'What days would you like drop-ins?'}
      />
      <View style={styles.daysContainer}>
        {newData.map((item: any, index: number) => (
          <Pressable
            key={index}
            style={[
              styles.day,
              {borderColor: item.active ? Colors.primary : Colors.border},
            ]}
            onPress={() => {
              const matchIndex = selectedDays.indexOf(item.value);
              if (matchIndex === -1) {
                // petIds.push(...petIds, item.id);
                selectedDays.push(item.value);
              } else {
                selectedDays.splice(matchIndex, 1);
              }
              setValue('selectedDays', selectedDays);
              handleMultipleCheck(item.id);
            }}>
            <TitleText text={item.day} textStyle={styles.text} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AppDayPicker;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    backgroundColor: Colors.background,
    width: (SCREEN_WIDTH - 50) / 7.5,
    height: (SCREEN_WIDTH - 50) / 7.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 5,
  },
  titleText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: Colors.gray,
    fontWeight: 'bold',
  },
});
