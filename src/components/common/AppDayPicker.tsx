import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from './text/TitleText';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Text_Size from '../../constants/textScaling';
// const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const days = [
  {
    id: 1,
    day: 'M',
    active: false,
  },
  {
    id: 2,
    day: 'T',
    active: false,
  },
  {
    id: 3,
    day: 'W',
    active: false,
  },
  {
    id: 4,
    day: 'T',
    active: false,
  },
  {
    id: 5,
    day: 'F',
    active: false,
  },
  {
    id: 6,
    day: 'S',
    active: false,
  },
  {
    id: 7,
    day: 'S',
    active: false,
  },
];
const AppDayPicker = () => {
  const [newData, setDatas] = useState(days);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...days];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  return (
    <View style={styles.container}>
      <TitleText
        textStyle={styles.titleText}
        text={'What days would you like drop-ins?'}
      />
      <View style={styles.daysContainer}>
        {newData.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.day,
              {borderColor: item.active ? Colors.primary : Colors.border},
            ]}
            onPress={() => handleMultipleCheck(item.id)}>
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
    // paddingHorizontal: 20,
  },
  day: {
    // padding: 10,

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
