/* eslint-disable react-native/no-inline-styles */
import {Alert, ScrollView, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import TitleText from '../../../../components/common/text/TitleText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import AppTouchableOpacity from '../../../../components/common/AppClickEvents/AppTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

const AppointmentSuccess = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedLottieView
        autoPlay
        loop={true}
        source={require('../../../../assets/appointmentSuccess.json')}
        style={{
          width: '95%',
        }}
      />
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: colors.borderColor,
          backgroundColor: Colors.iosBG,
          marginBottom: 20,
        }}>
        <TitleText
          textStyle={{textAlign: 'justify'}}
          text={
            'You have successfully booked this appointment. If you want to cancel this appointment your have to provide a valid response for cancelling appointment. After review your cancellation we will refund your payment'
          }
        />
      </View>
      <AppTouchableOpacity
        onPress={() => Alert.alert('No Cancellation added yet')}
        style={{
          width: '80%',
          backgroundColor: Colors.primary,
          paddingVertical: 10,
          borderRadius: 100,
          marginVertical: 20,
        }}>
        <TitleText
          textStyle={{
            textAlign: 'center',
            color: Colors.background,
            fontWeight: 'bold',
          }}
          text={'Cancel Appointment'}
        />
      </AppTouchableOpacity>
      <AppTouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: '80%',
          backgroundColor: Colors.primary,
          paddingVertical: 10,
          borderRadius: 100,
          marginBottom: 10,
        }}>
        <TitleText
          textStyle={{
            textAlign: 'center',
            color: Colors.background,
            fontWeight: 'bold',
          }}
          text={'Go Back'}
        />
      </AppTouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentSuccess;
