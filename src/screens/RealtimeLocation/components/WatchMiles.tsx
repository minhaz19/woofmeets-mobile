/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
// import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
// import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
interface Props {
  trackLocation: boolean;
  setTrackLocation: any;
}
const WatchMiles = ({setTrackLocation, trackLocation}: Props) => {
  //   const [isPaused, setIsPaused] = useState(true);
  //   const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (trackLocation) {
      interval = setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [trackLocation]);

  return (
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
            title={trackLocation ? 'Stop' : 'Start'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={{
              // ...btnStyles.containerStyleFullWidth,
              borderRadius: 8,
              height: 45,
            }}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => {
              setTrackLocation(!trackLocation);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(WatchMiles);

const styles = StyleSheet.create({});
