/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';

import {SCREEN_HEIGHT} from '../../../constants/WindowSize';
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
      console.log('r', result);
      if (result.ok) {
        navigation.navigate('GenerateReport', {
          screen: 'InboxNavigator',
          distance: distance,
          walkTime: walkTime,
          appointmentDateId: appointmentId,
        });
      } else {
        Alert.alert('Please generate your walk again...');
      }
    }
  };
  console.log('appointmentId', appointmentId);
  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: 350}}>
          <RealtimeLocation
            appointmentId={appointmentId}
            trackLocation={trackLocation}
            setTrackLocation={setTrackLocation}
          />
        </View>

        <BottomSpacing />
      </ScrollView>
      {
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
      }
    </ScreenRapperGrey>
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
});
export default ReportCardInitial;
