/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleText from '../../common/text/TitleText';
import AppTimeRangeSelect from '../../common/Form/AppTimeRangeSelect';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';

const options = [
  {value: 0, label: '12:00 AM'},
  {value: 1, label: '12:30 AM'},
  {value: 2, label: '1:00 AM'},
  {value: 3, label: '1:30 AM'},
  {value: 4, label: '2:00 AM'},
  {value: 5, label: '2:30 AM'},
  //   {value: 6, label: '3:00 AM'},
  //   {value: 7, label: '3:30 AM'},
  //   {value: 8, label: '4:00 AM'},
  //   {value: 9, label: '4:30 AM'},
  //   {value: 10, label: '5:00 AM'},
  //   {value: 11, label: '5:30 AM'},
  //   {value: 12, label: '6:00 AM'},
  //   {value: 13, label: '6:30 AM'},
  //   {value: 14, label: '7:00 AM'},
  //   {value: 15, label: '7:30 AM'},
  //   {value: 16, label: '8:00 AM'},
  //   {value: 17, label: '8:30 AM'},
  //   {value: 18, label: '9:00 AM'},
  //   {value: 19, label: '9:30 AM'},
  //   {value: 20, label: '10:00 AM'},
  //   {value: 21, label: '10:30 AM'},
  //   {value: 22, label: '11:00 AM'},
  //   {value: 23, label: '11:30 AM'},
  //   {value: 24, label: '12:00 PM'},
  //   {value: 25, label: '12:30 PM'},
  //   {value: 26, label: '1:00 PM'},
  //   {value: 27, label: '1:30 PM'},
  //   {value: 28, label: '2:00 PM'},
  //   {value: 29, label: '2:30 PM'},
  //   {value: 30, label: '3:00 PM'},
  //   {value: 31, label: '3:30 PM'},
  //   {value: 32, label: '4:00 PM'},
  //   {value: 33, label: '4:30 PM'},
  //   {value: 34, label: '5:00 PM'},
  //   {value: 35, label: '5:30 PM'},
  //   {value: 36, label: '6:00 PM'},
  //   {value: 37, label: '6:30 PM'},
  //   {value: 38, label: '7:00 PM'},
  //   {value: 39, label: '7:30 PM'},
  //   {value: 40, label: '8:00 PM'},
  //   {value: 41, label: '8:30 PM'},
  //   {value: 42, label: '9:00 PM'},
  //   {value: 43, label: '9:30 PM'},
  //   {value: 44, label: '10:00 PM'},
  //   {value: 45, label: '10:30 PM'},
  //   {value: 56, label: '11:00 PM'},
  //   {value: 57, label: '11:30 PM'},
];

interface props {
  title: string;
  time: {
    startTime: string;
    endTime: string;
  };
  setTime: (arg1: any) => void;
  icon:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

const TimeRange = ({title, time, setTime, icon}: props) => {
  const [endOptions, setEndOptions] = useState(options);
  //   useEffect(() => {
  //     if (errors) {
  //       if (time?.startTime && time.endTime) {
  //         setErrors(null);
  //       }
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [time]);

  useEffect(() => {
    //If Start time is exists but not endTime
    if (time?.startTime && !time?.endTime) {
      const findObj = options?.find(op => op?.label === time?.startTime);
      if (findObj && findObj !== undefined) {
        const filterObj = options?.filter(op => op?.value >= findObj?.value);
        if (filterObj?.length > 0) {
          setEndOptions(filterObj);
        }
      }

      //If Start time & End Time is exists
    } else if (time?.endTime) {
      const findStartObj = options?.find(op => op?.label === time?.startTime);
      const findEndObj = options?.find(op => op?.label === time?.endTime);

      //If Start time greater then End Time
      if (findStartObj?.value > findEndObj?.value) {
        if (findStartObj && findStartObj !== undefined) {
          const filterObj = options?.filter(
            op => op?.value >= findStartObj?.value,
          );
          if (filterObj?.length > 0) {
            setTime({...time, endTime: filterObj?.[0]?.label});
            setEndOptions(filterObj);
          }
        }
        //If Start time less then or equal End Time
      } else {
        if (findStartObj && findStartObj !== undefined) {
          const filterObj = options?.filter(
            op => op?.value >= findStartObj?.value,
          );
          if (filterObj?.length > 0) {
            setEndOptions(filterObj);
          }
        }
      }
    }
  }, []);

  return (
    <View style={styles.innerContainer}>
      {icon}
      <View style={styles.textContainer}>
        <TitleText text={title} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 6}}>
          <View style={styles.selectField}>
            <AppTimeRangeSelect
              placeholder={'From'}
              data={options}
              value={time?.startTime}
              // onChange={e => setTime({...time, startTime: e.label})}
              time={time}
              setTime={setTime}
            />
            {/* <Dropdown
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.backgroundColor,
                  borderColor: isDarkMode ? Colors.gray : Colors.border,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={{
                backgroundColor: colors.backgroundColor,
                borderWidth: 1,
              }}
              data={options}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'From' : '...'}
              value={time?.startTime}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              disable={false}
              renderItem={renderItem}
              onChange={item => {
                setTime({...time, startTime: item.label});
                setIsFocus(false);
              }}
            /> */}
          </View>
          <View style={styles.selectField}>
            <AppTimeRangeSelect
              placeholder={'To'}
              data={endOptions}
              value={time?.endTime}
              // onChange={e => setTime({...time, endTime: e.label})}
              time={time}
              setTime={setTime}
            />
            {/* <Dropdown
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.backgroundColor,
                  borderColor: isDarkMode ? Colors.gray : Colors.border,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={{
                backgroundColor: colors.backgroundColor,
                borderWidth: 1,
              }}
              data={endOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'To' : '...'}
              value={time?.startTime}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              disable={false}
              renderItem={renderItem}
              onChange={item => {
                setTime({...time, endTime: item.label});
                setIsFocus(false);
              }}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimeRange;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2%',
    flex: 1,
  },
  textContainer: {
    paddingLeft: '2%',
  },
  selectField: {
    width: '40%',
  },

  container: {paddingVertical: 16},
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  dropdown: {
    padding: 2,
    borderRadius: 2,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_10 : Text_Size.Text_12,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_10 : Text_Size.Text_12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_10 : Text_Size.Text_12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  selectedStyle: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    marginTop: 10,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: Text_Size.Text_0,
    color: Colors.background,
  },
});
