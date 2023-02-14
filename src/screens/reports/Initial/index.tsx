/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import BottomSpacing from '../../../components/UI/BottomSpacing';
// import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {ScrollView} from 'react-native-gesture-handler';

import RealtimeLocation from '../../RealtimeLocation';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useApi} from '../../../utils/helpers/api/useApi';

import methods from '../../../api/methods';
import {msgUrl} from '../../../utils/helpers/httpRequest';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import storage from '../../../utils/helpers/auth/storage';
// import TitleText from '../../../components/common/text/TitleText';
// import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {
  setCoordinates,
  setDistance,
  setReset,
  setTimee,
  setTrackingStatus,
} from '../../../store/slices/misc/trackingToggle';
const reportEndPoint = `${msgUrl}/v1/locations/visit/`;
interface Props {
  navigation: any;
  route: any;
}
const ReportCardInitial = ({navigation, route}: Props) => {
  const {appointmentId, reportInfo} = route?.params;
  const [trackLocation, setTrackLocation] = useState(false);
  const {trackingStatus, timee} = useAppSelector(state => state.trackingStatus);
  const {distance} = useAppSelector(state => state.trackingStatus);
  // const [distance, setDistance] = useState(0);
  // const [walkTime, setWalkTime] = useState('');
  const {request, loading} = useApi(methods._put);
  const token = storage.getToken();
  const {user} = useAppSelector(state => state.whoAmI);
  const dispatch = useAppDispatch();
  const handleGenerate = async () => {
    if (trackingStatus) {
      Alert.alert(
        'Warning!',
        'Stop tracking Stopwatch and then generate report',
      );
    } else {
      const authToken = await storage.getToken();
      const result = await request(
        reportEndPoint + appointmentId,
        {
          token: await token,
          user: user.id,
          visit: appointmentId,
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      if (result.ok) {
        const formattedTime = (timeValue: any) => {
          return timeValue < 10 ? `0${timeValue}` : timeValue;
        };
        navigation.navigate('GenerateReport', {
          screen: 'InboxNavigator',
          reportInfo: reportInfo,
          distance: distance?.toFixed(2),
          walkTime: `${formattedTime(timee.hours)}:${formattedTime(
            timee.minutes,
          )}:${formattedTime(timee.seconds)}`,
          appointmentDateId: appointmentId,
        });

        dispatch(setTimee({hours: 0, minutes: 0, seconds: 0}));
        dispatch(setCoordinates([{latitude: 0, longitude: 0}]));
        dispatch(setDistance(0));
        dispatch(setTrackingStatus(false));
        dispatch(setReset(true));
      } else {
        Alert.alert('Error!', 'Please generate your walk again...');
      }
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.background,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <RealtimeLocation
            appointmentId={appointmentId}
            trackLocation={trackLocation}
            setTrackLocation={setTrackLocation}
          />
        </View>
        <BottomSpacing />

        <View style={styles.buttonContainer}>
          <ButtonCom
            loading={loading}
            title={'Generate Report'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={{
              ...btnStyles.containerStyleFullWidth,
              borderRadius: 8,
            }}
            titleStyle={btnStyles.titleStyle}
            onSelect={handleGenerate}
          />
        </View>

        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  containerStyle: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 50,
    width: '40%',
    marginTop: '1%',
    borderRadius: 4,
  },
  textAlignment: {
    color: Colors.light.background,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_8,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Text_Size.Text_8,
  },
  buttonContainer: {marginHorizontal: 20},

  iconStyle: {paddingRight: 5, paddingLeft: 10},
  backText: {color: Colors.black, fontWeight: 'bold', paddingRight: 20},
});
export default ReportCardInitial;
