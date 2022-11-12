import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppFormField from '../../common/Form/AppFormField';
import SubmitButton from '../../common/Form/SubmitButton';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';
import {useFormContext} from 'react-hook-form';
import InputText from '../../common/input/InputText';
import IOSButton from '../../UI/IOSButton';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import AuthForm from '../Auth/Common/AuthForm';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../api/client';
import DescriptionText from '../../common/text/DescriptionText';
import TitleText from '../../common/text/TitleText';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppForm from '../../common/Form/AppForm';
import {otpValue} from '../../../utils/config/initalValues/initalValues';
import {otpValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {phoneNumberReg} from '../../../constants/regex';
import {useAppSelector, useAppDispatch} from '../../../store/store';
import {getContactInfo} from '../../../store/slices/profile/contact';
import MiddleModal from '../../UI/modal/MiddleModal';
import {QuestionIcon} from '../../../assets/svgs/SVG_LOGOS';
import ServiceReusableModal from '../becomeSitter/ServiceSetup/Common/ServiceReusableModal';
import { CountryPicker } from 'react-native-country-codes-picker';
import BigText from '../../common/text/BigText';

const contactInput = [
  {
    title: 'Emergency Contact Name',
    placeholder: 'Enter Emergency Contact Name',
    name: 'emergencyContactName',
  },
  {
    title: 'Phone number',
    placeholder: 'Enter Phone number',
    name: 'emergencyPhone',
  },
];

const ContactInput = (props: {handleSubmit: any}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const dispatch = useAppDispatch();
  const contact = useAppSelector(state => state.contact);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [textInput, setTextInput] = useState(
    contact.phoneNumber ? contact.phoneNumber : '',
  );
  const [globalError, setGlobalError] = useState('');
  const [otpVerificationStatus, setOtpVerificationStatus] = useState(
    contact.phoneNumber ? true : false,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>();
  const {request, loading} = useApi(methods._post);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');

  const mobilevalidate = (text: any) => {
    const reg = phoneNumberReg;
    if (reg.test(text) === false) {
      setTextInput(text);
      setPhoneNumberError('Please input a valid phone number');
      return false;
    } else {
      setTextInput(text);
      setPhoneNumberError(null);
      return true;
    }
  };

  const handleSubmit = async () => {
    if (mobilevalidate(textInput)) {
      setIsPhoneLoading(true);
      setPhoneNumberError(null);
      try {
        const response: ApiResponse<any> = await apiClient.post(
          '/user-profile/generate-phone-otp',
          {
            phoneNumber: `${countryCode}${textInput}`,
          },
        );
        if (!response.ok) {
          setPhoneNumberError(response.data.message);
          throw new Error(response.data.message);
        }
        if (response.ok) {
          setIsModalVisible(!isModalVisible);
        }
        // return response.data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
        }
      }
    } else {
      setPhoneNumberError('Please input a valid phone number');
    }
    setIsPhoneLoading(false);
  };
  const route = '/user-profile/add-contact-number';
  const sendOtp = async ({code}: any) => {
    const result = await request(route, {
      phoneNumber: `${countryCode}${textInput}`,
      otp: code,
    });
    if (result.ok) {
      setOtpVerificationStatus(true);
      dispatch(getContactInfo());
      setIsModalVisible(!isModalVisible);
    } else if (!result.ok) {
      Alert.alert(result.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <MiddleModal
        isModalVisible={isModalVisible}
        setIsModalVisible={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <TitleText
          text="OTP has sent successfully, Please verify the OTP"
          textStyle={styles.textStyle1}
        />
        <AppForm
          initialValues={otpValue}
          validationSchema={otpValidationSchema}>
          <AuthForm
            handleSubmit={sendOtp}
            btnTitle="Continue"
            btn2Title="Resend Code"
            forgotPasswordOpt
            loading={loading}
          />
        </AppForm>
      </MiddleModal>
      <View style={styles.inputContainer}>
        <ServiceReusableModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          question="How is my phone number used?"
          description="Woofmeets needs to have a phone number for you on file as one of the methods for contacting you. If we ever need to speak to you, we will endeavor to reach out via email. If that method proves ineffective, we may use the phone number we have on file."
        />
        <View>
          <View style={styles.nameContainer}>
            <HeaderText
              text="Add your phone number"
              textStyle={styles.textStyle}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.iconContainer}>
              <QuestionIcon fill={Colors.primary} />
            </TouchableOpacity>
          </View>
          {
            <View>
              <InputText
                title={'Your Phone Number'}
                placeholder={'Phone Number'}
                description={
                  "WoofMeet requires a verified phone number to keep your account safe and for important updates. We'll send a code via text message."
                }
                value={textInput}
                setValue={setTextInput}
                leftIcon={<TouchableOpacity
                  onPress={() => setShow(true)}
                  style={{
                  }}
                >
                  <BigText text={countryCode} />
                </TouchableOpacity>}
                keyboardType="numeric"
                onChangeText={number => {
                  mobilevalidate(number);
                }}
              />
              <CountryPicker
                  show={show}
                  // when picker button press you will get the country object with dial code
                  pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                  }}
                />
              <TitleText text={globalError} textStyle={{color: Colors.alert}} />
              {phoneNumberError && (
                <DescriptionText
                  text={phoneNumberError}
                  textStyle={styles.errorText}
                />
              )}
              {isPhoneLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <IOSButton
                  title={'Verify Phone Number'}
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={btnStyles.containerStyleFullWidth}
                  titleStyle={styles.titleStyle}
                  onSelect={() => handleSubmit()}
                />
              )}
            </View>
          }
          <View style={{paddingBottom: 10}}>
            <HeaderText text="Emergency Contact" textStyle={styles.textStyle} />
            <DescriptionText
              text={
                'Who can we contact, other than you, in case of an emergency?'
              }
            />
          </View>

          {contactInput.map((item, index) => {
            return (
              <View key={index}>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'default'}
                  placeholder={item.placeholder}
                  textContentType={'none'}
                  name={item.name}
                  label={item.title}
                  textInputStyle={styles.textInputStyle}
                  control={control}
                  errors={errors}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.footerContainer}>
          <SubmitButton
            title="Save"
            onPress={() => {
              if (otpVerificationStatus) {
                setGlobalError('');
                props.handleSubmit();
              } else {
                setGlobalError('Please submit and verify phone number');
              }
            }}
            loading={contact.loading}
          />
        </View>
      </View>
    </View>
  );
};

export default ContactInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  container1: {
    flex: 1,
  },
  inputContainer: {marginHorizontal: 20},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  textStyle1: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
    padding: 20,
  },
  footerContainer: {
    paddingVertical: '6%',
  },
  titleStyle: {
    color: Colors.blue,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_1,
    flex: 1,
  },
  errorText: {
    color: Colors.alert,
  },
  iconContainer: {
    paddingLeft: 10,
  },
});
