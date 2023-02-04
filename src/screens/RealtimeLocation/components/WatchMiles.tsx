/* eslint-disable react-native/no-inline-styles */
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {
  setTrackingStatus,
  setTimee,
} from '../../../store/slices/misc/trackingToggle';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import {Stopwatch} from 'react-native-stopwatch-timer';
interface Props {}
// let interval: any = null;
const WatchMiles = ({}: Props) => {
  const {trackingStatus, timee} = useAppSelector(state => state.trackingStatus);
  // const {hours, minutes, seconds} = timee;
  // const [time, setTime] = useState(timee);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  // const [isTimerStart, setIsTimerStart] = useState(false);
  // const [resetStopwatch, setResetStopwatch] = useState(false);

  // useEffect(() => {
  //   setResetStopwatch(reset);
  // }, [reset]);
  // useEffect(() => {
  //   setIsTimerStart(trackingStatus);
  // }, [trackingStatus]);

  // const [time, setTime] = useState(0);
  // const [isRunning, setIsRunning] = useState(false);

  // useEffect(() => {
  //   let interval = null;
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setTime(time => time + 1);
  //     }, 1000);
  //   } else if (!isRunning && time !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isRunning, time]);

  // const start = () => {
  //   setIsRunning(true);
  // };

  // const stop = () => {
  //   setIsRunning(false);
  // };

  // const reset = () => {
  //   setIsRunning(false);
  //   setTime(0);
  // };
  // const formatTime = time => {
  //   let seconds = time % 60;
  //   let minutes = Math.floor(time / 60) % 60;
  //   let hours = Math.floor(time / 3600);
  //   return `${hours < 10 ? `0${hours}` : hours}:${
  //     minutes < 10 ? `0${minutes}` : minutes
  //   }:${seconds < 10 ? `0${seconds}` : seconds}`;
  // };

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    dispatch(setTrackingStatus(true));
    let id = setInterval(() => {
      setTime(prevTime => {
        let {hours, minutes, seconds} = prevTime;
        if (seconds < 59) {
          seconds++;
        } else if (minutes < 59) {
          minutes++;
          seconds = 0;
        } else {
          hours++;
          minutes = 0;
          seconds = 0;
        }
        return {hours, minutes, seconds};
      });
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    dispatch(setTrackingStatus(false));
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    dispatch(setTrackingStatus(false));
    dispatch(setTimee({hours: 0, minutes: 0, seconds: 0}));
  };
  const formattedTime = timeValue => {
    return timeValue < 10 ? `0${timeValue}` : timeValue;
  };
  useEffect(() => {
    setTime(timee);
  }, [timee]);
  return (
    <>
      <AppTouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          if (trackingStatus) {
            Alert.alert(
              'Warning!',
              'Please stop stopwatch timer before going back',
            );
          } else {
            dispatch(setTimee(time));
            navigation.goBack();
          }
        }}>
        <Ionicons
          name="ios-chevron-back"
          size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
          style={styles.iconStyle}
          color={Colors.black}
        />
        <TitleText text={'Back'} textStyle={styles.backText} />
      </AppTouchableOpacity>
      <View style={{width: '100%', height: '100%'}}>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.border,
            backgroundColor: Colors.iosBG,
            borderRadius: 4,
            marginTop: 30,
            marginHorizontal: 10,
          }}>
          <TitleText
            textStyle={{
              fontWeight: 'bold',
              textAlign: 'justify',
            }}
            text={
              'Please tab the START if you started walk with pets and tap STOP if you talk any pause or stop walking. And do forgot to hit the generate report button once you done with pet walking'
            }
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 15,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TitleText textStyle={{fontWeight: 'bold'}} text="Pet Walk Time" />
            <View>
              <Text>
                {`${formattedTime(time.hours)}:${formattedTime(
                  time.minutes,
                )}:${formattedTime(time.seconds)}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginLeft: 10,
              // width: '100%',
            }}>
            <ButtonCom
              title={trackingStatus ? 'Stop' : 'Start'}
              textAlignment={btnStyles.textAlignment}
              containerStyle={{
                borderRadius: 8,
                height: 45,
                width: 110,
              }}
              titleStyle={btnStyles.titleStyle}
              onSelect={
                trackingStatus ? stopTimer : startTimer
                // dispatch(setTrackingStatus(!trackingStatus));
                // handleTimer();
              }
            />
            <ButtonCom
              title="Reset"
              textAlignment={btnStyles.textAlignment}
              disabled={trackingStatus}
              containerStyle={{
                borderRadius: 8,
                height: 45,
                width: 100,
              }}
              titleStyle={btnStyles.titleStyle}
              onSelect={resetTimer}
              color={trackingStatus ? Colors.gray : undefined}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    position: 'absolute',
    top: 50,
    zIndex: 999,
    left: '2%',
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  iconStyle: {paddingRight: 5, paddingLeft: 10},
  backText: {color: Colors.black, fontWeight: 'bold', paddingRight: 20},
});
const options = {
  container: {
    borderRadius: 5,
    marginTop: 5,
  },
  text: {
    color: Colors.black,
  },
};
export default memo(WatchMiles);
