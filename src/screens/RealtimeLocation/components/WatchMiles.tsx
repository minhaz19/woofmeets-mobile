/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
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
  const {trackingStatus, timee, reset} = useAppSelector(
    state => state.trackingStatus,
  );
  const [time, setTime] = useState(timee);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  useEffect(() => {
    setResetStopwatch(reset);
  }, [reset]);
  useEffect(() => {
    setIsTimerStart(trackingStatus);
  }, [trackingStatus]);


  return (
    <>
      <AppTouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          dispatch(setTimee(time));
          navigation.goBack();
        }}>
        <Ionicons
          name="ios-chevron-back"
          size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
          style={styles.iconStyle}
          color={Colors.black}
        />
        <TitleText text={'Back'} textStyle={styles.backText} />
      </AppTouchableOpacity>
      <View style={{height: '100%'}}>
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
            <TitleText textStyle={{fontWeight: 'bold'}} text="Dog Walk Time" />
            <Stopwatch
              start={isTimerStart}
              reset={resetStopwatch}
              startTime={timee}
              options={options}
              getMsecs={(t: any) => {
                setTime(t);
              }}
            />
            {/* <TitleText
              textStyle={{fontSize: Text_Size.Text_1}}
              text={`${('0' + Math.floor((time / 60000) % 60)).slice(-2)}:${(
                '0' + Math.floor((time / 1000) % 60)
              ).slice(-2)}:${('0' + ((time / 10) % 100)).slice(-2)}`}
            /> */}
          </View>

          <View style={{width: '30%'}}>
            <ButtonCom
              title={trackingStatus ? 'Stop' : 'Start'}
              textAlignment={btnStyles.textAlignment}
              containerStyle={{
                borderRadius: 8,
                height: 45,
              }}
              titleStyle={btnStyles.titleStyle}
              onSelect={() => {
                dispatch(setTrackingStatus(!trackingStatus));
                // handleTimer();
              }}
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
