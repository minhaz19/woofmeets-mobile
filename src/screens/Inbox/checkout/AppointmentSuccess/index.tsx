/* eslint-disable react-native/no-inline-styles */
import {Alert, ScrollView, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import TitleText from '../../../../components/common/text/TitleText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import AppTouchableOpacity from '../../../../components/common/AppClickEvents/AppTouchableOpacity';
import {useNavigation} from '@react-navigation/native';
import MiddleModal from '../../../../components/UI/modal/MiddleModal';
import Text_Size from '../../../../constants/textScaling';
import {Controller, useForm} from 'react-hook-form';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getProviderApnt} from '../../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import ButtonCom from '../../../../components/UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {getAppointmentStatus} from '../../../../store/slices/Appointment/Inbox/User/Proposal/getAppointmentStatus';
import {getProviderInprogressApnt} from '../../../../store/slices/Appointment/Inbox/Provider/InProgress/getPInprogressApnt';
import {getInprogressApnt} from '../../../../store/slices/Appointment/Inbox/User/InProgress/getInprogressApnt';
const endPoint = '/appointment/cancel/';
const AppointmentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const dispatch = useAppDispatch();
  const {loading, request} = useApi(methods._put);
  const {control, handleSubmit} = useForm({
    defaultValues: {
      cancelText: '',
    },
  });
  const handleCancel = async (text: any) => {
    const payload = {
      cancelReason: text,
    };
    const result = await request(
      endPoint + proposedServiceInfo.appointmentOpk,
      payload,
    );
    if (result.ok) {
      dispatch(getInprogressApnt('PAID'));
      dispatch(getProviderInprogressApnt('PAID'));
      // dispatch(getProviderApnt(proposedServiceInfo.appointmentOpk));
      setIsVisible(false);
      navigation.navigate('Inbox');
    } else {
      Alert.alert(result.data.message);
      setIsVisible(false);
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.backgroundColor,
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
              'You have successfully booked this appointment. If you want to cancel this appointment your have to provide a valid reason for cancelling appointment.'
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
          onPress={() => {
            navigation.navigate('Inbox');
            dispatch(getAppointmentStatus('PROPOSAL'));
            dispatch(getProviderApnt('PROPOSAL'));
          }}
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
            text={'Go Home'}
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
                text={'Why you want to cancel this Appointment?'}
                textStyle={{fontWeight: 'bold', fontSize: Text_Size.Text_1}}
              />
              <Controller
                control={control}
                name="cancelText"
                render={({field: {onChange, value}, fieldState: {}}) => {
                  return (
                    <TextInput
                      // autoCapitalize={}
                      autoCorrect={false}
                      keyboardType={'default'}
                      placeholder={'Provider short description...'}
                      onChangeText={onChange}
                      value={value}
                      numberOfLines={10}
                      multiline
                      style={{
                        // alignSelf: 'flex-start',
                        height: 120,
                        borderWidth: 1,
                        borderColor: colors.borderColor,
                        borderRadius: 4,
                        color: 'black',
                        fontSize: Text_Size.Text_8,
                        // marginTop: 20,
                        padding: 10,
                        paddingVertical: 10,

                        marginVertical: 20,
                      }}
                    />
                  );
                }}
              />
              <ButtonCom
                title="Cancel Appointment"
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                onSelect={handleSubmit(handleCancel)}
                loading={loading}
              />
            </View>
          </>
        }
      />
    </>
  );
};

export default AppointmentSuccess;
