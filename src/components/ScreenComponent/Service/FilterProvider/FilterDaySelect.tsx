import {StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';


interface Props {
  serviceFrequency: any;
  setServiceFrequency: (arg: any) => void;
}

const FilterDaySelect = ({serviceFrequency, setServiceFrequency}: Props) => {
  const handleMultipleCheck = (id: number) => {
    const myNewPet = serviceFrequency.map((item: any) => {
      if (item.id === id) {
        return {...item, selected: !item.selected};
      } else {
        return item;
      }
    });
    setServiceFrequency(myNewPet);
  };
  return (
    <View style={styles.container}>
      <TitleText
        textStyle={styles.titleText}
        text={'What days would you like drop-ins?'}
      />
      <View style={styles.daysContainer}>
        {serviceFrequency.map((item: any) => (
          <Pressable
            key={item.id}
            style={[
              styles.day,
              {borderColor: item.selected ? Colors.primary : Colors.border},
            ]}
            onPress={() => {
              handleMultipleCheck(item.id);
            }}>
            <TitleText text={item.day} textStyle={styles.text} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default FilterDaySelect;

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
