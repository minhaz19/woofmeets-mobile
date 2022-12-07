/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';

import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {useAppSelector} from '../../../store/store';
import storage from '../../../utils/helpers/auth/storage';
import TitleText from '../../../components/common/text/TitleText';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
const reportEndPoint = `${msgUrl}/v1/locations/visit/`;
interface Props {
  navigation: any;
  route: any;
}
const ReportCardInitial = ({navigation, route}: Props) => {
  const {appointmentId} = route?.params;
  const [trackLocation, setTrackLocation] = useState(false);
  const [distance, setDistance] = useState(0);
  const [walkTime, setWalkTime] = useState('');
  const {request, loading} = useApi(methods._put);
  const token = storage.getToken();
  const {user} = useAppSelector(state => state.whoAmI);
  const handleGenerate = async () => {
    if (trackLocation) {
      Alert.alert('Stop tracking to generate report');
    } else {
      const result = await request(reportEndPoint + appointmentId, {
        token: await token,
        user: user.id,
        visit: appointmentId,
      });
      console.log('generate report', result);
      // if (result.ok) {
      //   navigation.navigate('GenerateReport', {
      //     screen: 'InboxNavigator',
      //     distance: distance,
      //     walkTime: walkTime,
      //     appointmentDateId: appointmentId,
      //   });
      // } else {
      //   Alert.alert('Please generate your walk again...');
      // }
    }
  };
  return (
    <>
      {/* <AppTouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons
          name="ios-chevron-back"
          size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
          style={styles.iconStyle}
          color={Colors.black}
        />
        <TitleText text={'Back'} textStyle={styles.backText} />
      </AppTouchableOpacity> */}

      <ScrollView
        style={{flex: 1, backgroundColor: Colors.background}}
        showsVerticalScrollIndicator={false}>
        <View>
          <RealtimeLocation
            appointmentId={appointmentId}
            trackLocation={trackLocation}
            setTrackLocation={setTrackLocation}
          />
        </View>

        <BottomSpacing />
      </ScrollView>

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
    </>
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
  buttonContainer: {position: 'absolute', right: 20, left: 20, bottom: 60},
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
export default ReportCardInitial;
