import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import AppFormField from '../../common/Form/AppFormField';
import SubmitButton from '../../common/Form/SubmitButton';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';
import {useFormContext} from 'react-hook-form';
import InputText from '../../common/input/InputText';
import { USAFlag } from '../../../assets/svgs/Setting_SVG';
import IOSButton from '../../UI/IOSButton';
import { btnStyles } from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import BottomHalfModal from '../../UI/modal/BottomHalfModal';
import AuthForm from '../Auth/Common/AuthForm';
import { ApiResponse } from 'apisauce';
import apiClient from '../../../api/client';
import DescriptionText from '../../common/text/DescriptionText';
import TitleText from '../../common/text/TitleText';
import { useApi } from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppForm from '../../common/Form/AppForm';
import { otpValue } from '../../../utils/config/initalValues/initalValues';
import { otpValidationSchema } from '../../../utils/config/ValidationSchema/validationSchema';
import { phoneNumberReg } from '../../../constants/regex';
import { useAppSelector } from '../../../store/store';

const contactInput = [
  {
    title: 'Emergency Contact Name',
    placeholder: 'Enter Emergency Contact Name',
    name: 'emergencyContactName',
  },
  {
    title: 'Email',
    placeholder: 'Enter Email',
    name: 'email',
  },
  {
    title: 'Phone number',
    placeholder: 'Enter Phone number',
    name: 'emergencyPhone',
  },
];

const ContactInput = (props: { navigation: { navigate: (arg0: string) => void; }; handleSubmit: any; }) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const contact = useAppSelector(
    state => state.contact,
  );
  const [textInput, setTextInput] = useState(contact.phoneNumber ? contact.phoneNumber : '+1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string|null>();
  const {request, loading} = useApi(methods._post);

  const mobilevalidate = (text: any) =>{
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
        const response: ApiResponse<any> = await apiClient.post('/user-profile/generate-phone-otp', {
          phoneNumber: textInput,
        });
        console.log(response);
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
          // console.log(error.response);
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
      phoneNumber: textInput,
      otp: code,
    });

    if (result.ok) {
      setIsModalVisible(!isModalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <BottomHalfModal isModalVisible={isModalVisible} setIsModalVisible={() => {
        setIsModalVisible(!isModalVisible);
      }}>
        <TitleText text="OTP has sent successfully, Please verify the OTP" textStyle={styles.textStyle1} />
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
      </BottomHalfModal>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.nameContainer}>
            <HeaderText
              text="Add your phone number"
              textStyle={styles.textStyle}
            />
          </View>
          {<View>
            <InputText
              title={'Your Phone Number'}
              placeholder={'Phone Number'}
              value={textInput}
              setValue={setTextInput}
              leftIcon={<USAFlag height={24} width={24}/>}
              keyboardType="numeric"
              onChangeText={(number) => {
                mobilevalidate(number);
              }}
            />
            {phoneNumberError && <DescriptionText text={phoneNumberError} textStyle={styles.errorText}/>}
            {isPhoneLoading ? <ActivityIndicator size="small" /> : <IOSButton
              title={'Change Phone Number'}
              textAlignment={btnStyles.textAlignment}
              containerStyle={btnStyles.containerStyleFullWidth}
              titleStyle={styles.titleStyle}
              onSelect={() => handleSubmit()}
            />}
          </View>}
          <View style={styles.nameContainer}>
            <HeaderText
              text="Add Emergency Contact"
              textStyle={styles.textStyle}
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
          <SubmitButton title="Save" onPress={props.handleSubmit} loading={contact.loading} />
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
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_1,
    flex: 1,
  },
  errorText: {
    color: Colors.alert,
  },
});
