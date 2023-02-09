/* eslint-disable react-native/no-inline-styles */
import {Alert, StyleSheet, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {
  setTrackingStatus,
  setTimee,
  setDistance,
  setCoordinates,
} from '../../../store/slices/misc/trackingToggle';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderText from '../../../components/common/text/HeaderText';

interface Props {
  distance: number;
  coordinates: any[];
}
// let interval: any = null;
const WatchMiles = ({distance, coordinates}: Props) => {
  const {trackingStatus, timee} = useAppSelector(state => state.trackingStatus);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const [running, setRunning] = useState(fa∂lse);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const startTimer = () => {
    dispatch(setTrackingStatus(true));
    let id: any = setInterval(() => {
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
    intervalId && clearInterval(intervalId);
    dispatch(setTrackingStatus(false));
    dispatch(setTimee(time));
    dispatch(setDistance(distance));
    dispatch(setCoordinates(coordinates));
  };

  const resetTimer = () => {
    intervalId && clearInterval(intervalId);
    dispatch(setTrackingStatus(false));
    dispatch(setTimee({hours: 0, minutes: 0, seconds: 0}));
    dispatch(setDistance(0));
    dispatch(setCoordinates([{latitude: 0, longitude: 0}]));
    // setMapInfo();
  };
  const formattedTime = (timeValue: any) => {
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
          }
          // else if (hasWalked) {
          //   Alert.alert(
          //     'Warning!',
          //     'Are you sure you want Submit walk report before going back going back',
          //   );
          // }
          else {
            dispatch(setTimee(time));
            dispatch(setDistance(distance));
            dispatch(setCoordinates(coordinates));
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
            'To generate your pet walking report please stay on this screen and tab the START button while you starts walking with pet and tap STOP if you talk any pause or stopped walking. And do forgot to hit the GENERATE REPORT button once you done with pet walking'
          }
        />
      </View>
      <View style={styles.miles}>
        <HeaderText
          textStyle={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          text={`Distance travelled: ${distance.toFixed(2)} miles`}
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

          <TitleText
            text={`${formattedTime(time.hours)}:${formattedTime(
              time.minutes,
            )}:${formattedTime(time.seconds)}`}
          />
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
  miles: {
    padding: 10,
    // paddingHorizontal: 30,
    backgroundColor: Colors.lightShade,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 20,
    // width: ,
  },
});

export default memo(WatchMiles);
