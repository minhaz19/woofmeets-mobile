/* eslint-disable react-native/no-inline-styles */
import {ScrollView, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import TitleText from '../../../../components/common/text/TitleText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import AppTouchableOpacity from '../../../../components/common/AppClickEvents/AppTouchableOpacity';
import {useNavigation} from '@react-navigation/native';
import MiddleModal from '../../../../components/UI/modal/MiddleModal';
import Text_Size from '../../../../constants/textScaling';

const AppointmentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {colors, isDarkMode} = useTheme();
  const navigation = useNavigation();
  return (
    <>
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
              'You have successfully booked this appointment. If you want to cancel this appointment your have to provide a valid reason for cancelling appointment. After review your cancellation we will refund your 50% payment'
            }
          />
        </View>
        <AppTouchableOpacity
          onPress={() => setIsVisible(true)}
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
      <MiddleModal
        onBlur={() => {}}
        setIsModalVisible={setIsVisible}
        isModalVisible={isVisible}
        children={
          <>
            <View style={{width: '100%', padding: 20}}>
              <TitleText
                text={'Why you want to cancel this subscription?'}
                textStyle={{fontWeight: 'bold', fontSize: Text_Size.Text_1}}
              />
              <TextInput
                // autoCapitalize={}
                keyboardType={'default'}
                placeholder={'Provider short description...'}
                onChangeText={() => {}}
                value={''}
                numberOfLines={10}
                style={{
                  // alignSelf: 'flex-start',
                  height: 120,
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                  borderRadius: 4,
                  color: isDarkMode ? 'white' : 'black',
                  fontSize: Text_Size.Text_11,
                  marginTop: 20,
                  padding: 10,
                }}
              />
              <AppTouchableOpacity
                onPress={() => {}}
                style={{
                  // width: '100%',

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
                  text={'Submit Cancellation'}
                />
              </AppTouchableOpacity>
            </View>
          </>
        }
      />
    </>
  );
};

export default AppointmentSuccess;
