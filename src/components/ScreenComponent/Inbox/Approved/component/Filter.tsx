/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../common/text/TitleText';

import Ion from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import Text_Size from '../../../../../constants/textScaling';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';

const daycount = [
  {
    title: 'One Week',
    day: 7,
  },
  {
    title: 'One Month',
    day: 30,
  },
  {
    title: 'Six Month',
    day: 180,
  },
  {
    title: 'One Year',
    day: 365,
  },
];

interface Props {
  setDayCount: (arg: {title: string; day: number}) => void;
  setAscDesc: (arg: boolean) => void;
  ascDesc: boolean;
  dayCount: {title: string; day: number};
}
const Filter = ({setDayCount, dayCount, setAscDesc, ascDesc}: Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 20,
        }}>
        <TitleText
          text={'Filter Inbox :'}
          textStyle={{
            color: Colors.primaryDif,
            fontSize: Text_Size.Text_2,
            fontWeight: 'bold',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                backgroundColor: Colors.primaryDif,
                padding: 10,
                flex: 0,
                borderRadius: 5,
                marginRight: 10,
              }}>
              <TitleText
                textStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
                text={dayCount?.title}
              />
            </View>
          </View>
          <View>
            {ascDesc ? (
              <AppTouchableOpacity onPress={() => setAscDesc(!ascDesc)}>
                <Ion
                  name="sort-calendar-ascending"
                  size={
                    SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 32 : 28
                  }
                  style={styles.iconStyle}
                  color={Colors.primaryDif}
                />
              </AppTouchableOpacity>
            ) : (
              <AppTouchableOpacity onPress={() => setAscDesc(!ascDesc)}>
                <Ion
                  name="sort-calendar-descending"
                  size={
                    SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 32 : 28
                  }
                  style={styles.iconStyle}
                  color={Colors.primaryDif}
                />
              </AppTouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 20,
        }}>
        {daycount.map((item, index) => (
          <View key={index}>
            <AppTouchableOpacity
              onPress={() => setDayCount(item)}
              style={{
                backgroundColor: false ? Colors.primaryDif : Colors.background,
                padding: 10,
                flex: 0,
                borderRadius: 5,
                marginRight: 10,
                borderWidth: 1,
                borderColor: Colors.border,
              }}>
              <TitleText
                textStyle={{
                  color: false ? Colors.background : Colors.black,
                  fontWeight: 'bold',
                }}
                text={item.title}
              />
            </AppTouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  iconStyle: {paddingRight: 10},
});
