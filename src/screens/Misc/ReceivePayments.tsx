import {View, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import DescriptionText from '../../components/common/text/DescriptionText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import IOSButton from '../../components/UI/IOSButton';
import {ReceivePaymentsIcon} from '../../assets/svgs/Misc_LOGOS';
import Colors from '../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import authStorage from '../../utils/helpers/auth/storage';
import {getUserOnboardStatus} from '../../store/slices/connect/stripe';
import methods from '../../api/methods';
import {useApi} from '../../utils/helpers/api/useApi';

const ReceivePayments = () => {
  const {colors} = useTheme();
  const {userOnboardStatus} = useAppSelector(state => state.stripe);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {loading, request} = useApi(methods._post);
  const [token, setToken] = useState<any>();

  const getDecodedToken = async () => {
    const tok: any = await authStorage.getToken();
    if (tok) {
      const decode: any = await jwtDecode(tok);
      setToken(decode);
      return decode;
    }
  };
  useEffect(() => {
    getDecodedToken();
    dispatch(getUserOnboardStatus());
  }, []);
  const handleStripeConnect = async () => {
    const response = await request('/stripe-connect/user-onboarding');
    if (response.ok) {
      if (response.data?.data?.alreadyInitiated) {
        const res = await request(
          '/stripe-connect/user-onboarding/refresh-url',
          {
            email: token.email,
          },
        );
        if (res.data?.data?.url) {
          navigation.navigate('StripeOnboardScreen', {
            url: res.data?.data?.url,
          });
        }
      }
    } else {
      Alert.alert(response?.data?.message);
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.textContainer}>
        <View style={styles.SvgContainer}>
          <ReceivePaymentsIcon />
        </View>
        {userOnboardStatus?.userStripeConnectAccount?.requirements?.errors
          ?.length === 0 ? (
          <View style={styles.warningTextContainer}>
            <HeaderText
              text="Your Woofmeets account is enabled to receive payments"
              textStyle={{...styles.warningText, color: Colors.alert}}
            />
          </View>
        ) : (
          <View>
            <View style={styles.warningTextContainer}>
              <HeaderText
                text="Your Woofmeets account is NOT enabled to receive payments yet"
                textStyle={{...styles.warningText, color: Colors.alert}}
              />
            </View>
            <DescriptionText
              textStyle={styles.textStyle}
              text="Get funds directly deposited into your bank account, with no additional fees. Woofmeets uses Stripe, one of the most popular payment platforms, to transfer your Woofmeets earnings to your bank account."
            />
            <DescriptionText text="Set up your Stripe account seamlessly with one click and at no additional cost to you." />
          </View>
        )}

        <IOSButton
          containerStyle={styles.containerStyleSmall}
          onSelect={handleStripeConnect}
          disabled={loading}
          textAlignment={{
            backgroundColor: colors.backgroundColor,
            borderColor: Colors.primaryDif,
            borderWidth: 1,
            borderRadius: 100,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          titleStyle={{
            color: Colors.primaryDif,
          }}
          title={
            loading
              ? 'Connecting...'
              : userOnboardStatus?.userStripeConnectAccount?.requirements
                  ?.errors?.length === 0
              ? 'View connected account'
              : 'Connect to stripe'
          }
        />
        <DescriptionText
          textStyle={{color: Colors.alert}}
          text={
            userOnboardStatus?.userStripeConnectAccount?.requirements?.errors[0]
              ?.reason
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SvgContainer: {
    alignItems: 'center',
    paddingTop: '10%',
  },
  textContainer: {
    width: '90%',
    paddingLeft: '5%',
  },
  headerText: {
    lineHeight: 20,
  },
  warningTextContainer: {
    alignItems: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  warningText: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    paddingBottom: 20,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    marginTop: '15%',
  },
});

export default ReceivePayments;
