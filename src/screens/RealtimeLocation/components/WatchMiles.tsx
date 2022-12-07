/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Text_Size from '../../../constants/textScaling';
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
// import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
// import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
interface Props {}
const WatchMiles = ({}: Props) => {
  //   const [isPaused, setIsPaused] = useState(true);
  //   const [isActive, setIsActive] = useState(false);
  const {trackingStatus, timee} = useAppSelector(state => state.trackingStatus);
  const [time, setTime] = useState(timee);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let interval: any = null;
    if (trackingStatus) {
      interval = setInterval(() => {
        setTime(tim => tim + 10);
        // dispatch(setTime(time + 10));
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, trackingStatus]);
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

            <TitleText
              textStyle={{fontSize: Text_Size.Text_1}}
              text={`${('0' + Math.floor((time / 60000) % 60)).slice(-2)}:${(
                '0' + Math.floor((time / 1000) % 60)
              ).slice(-2)}.${('0' + ((time / 10) % 100)).slice(-2)}`}
            />
          </View>
          {/* <View>
          <TitleText text="Distance" textStyle={{fontWeight: 'bold'}} />
          <BigText text="00:00:40" textStyle={{fontSize: Text_Size.Text_1}} />
        </View> */}
          <View style={{width: '30%'}}>
            <ButtonCom
              title={trackingStatus ? 'Stop' : 'Start'}
              textAlignment={btnStyles.textAlignment}
              containerStyle={{
                // ...btnStyles.containerStyleFullWidth,
                borderRadius: 8,
                height: 45,
              }}
              titleStyle={btnStyles.titleStyle}
              onSelect={() => {
                dispatch(setTrackingStatus(!trackingStatus));
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
    // paddingVertical: 20,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  iconStyle: {paddingRight: 5, paddingLeft: 10},
  backText: {color: Colors.black, fontWeight: 'bold', paddingRight: 20},
});
export default memo(WatchMiles);
