/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../constants/Colors';

interface Props {
  title: string;
  serviceTypeId: number;
  data: any;
  setValue: (arg1: string, ar2: any) => void;
}
const BoardingDayAV = ({title, data, setValue}: Props) => {
  const [days, setDays] = useState(data.days.length > 0 ? data.days : []);
  const {isDarkMode} = useTheme();
  //   const {setValue} = useFormContext();
  const handleMultiSelect = (id: number) => {
    const newHoliday = [...days];
    const index = newHoliday.findIndex(item => item.id === id);
    newHoliday[index].active = !newHoliday[index].active;
    const modDays = newHoliday.map(day => ({
      [day.key]: day.active,
      putServiceId: day.putServiceId,
    }));
    //@ts-ignore
    const daysPayload = Object.assign(...modDays);
    setValue(String(data.id), daysPayload);
    setDays(newHoliday);
    setValue;
  };
  return (
    <View style={styles.parent}>
      <View>
        <View style={styles.container}>
          <View style={styles.serviceContainer}>
            <View style={styles.textContainer}>
              <TitleText textStyle={styles.title} text={title} />
            </View>
          </View>
        </View>
        <View style={styles.multiSelect}>
          {days?.map((it: any, i: number) => (
            <Pressable
              onPress={() => handleMultiSelect(it.id)}
              key={i}
              style={{
                flex: 1,
                borderWidth: 2,
                marginHorizontal: 3,
                padding: 10,
                borderRadius: 6,
                backgroundColor: it.active
                  ? isDarkMode
                    ? Colors.primary
                    : 'black'
                  : Colors.background,
              }}>
              <TitleText
                textStyle={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: it.active ? 'white' : 'black',
                }}
                text={it.label}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BoardingDayAV;

const styles = StyleSheet.create({
  parent: {width: '100%', padding: 10},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  serviceContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {fontWeight: 'bold', fontSize: Text_Size.Text_1},
  multiSelect: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
