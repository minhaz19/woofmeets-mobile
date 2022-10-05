/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import Ion from 'react-native-vector-icons/Ionicons';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {usePaymentSheet, useStripe} from '@stripe/stripe-react-native';
const endpoint = '/stripe-payment-method/add-card';
const customerEndPoint = '/stripe-payment-method/customers';
const STRIPE_PK =
  'pk_test_51LTB7cKt0zm1z41kPTt1L4KXeMUPfd4qyWjQdYQR69ejOa2wdd2kpoO2ucIgYG8WJWZTohiDbdmtzG0m04nF0ff900964FN1Vr';

const PaymentSheett = (props: any) => {
  const [customerId, setCustomerId] = useState<string | null | undefined>('');

  // const stripe = useStripe();
  const {loading, initPaymentSheet, presentPaymentSheet} = usePaymentSheet();

  const ab = async () => {
    const result = await methods._get(
      '/stripe-payment-method/setup-intent/get-client-secret',
    );
    console.log(result);
    if (result.ok) {
      const clientSecret = result!.data.data.clientSecret;
      const initSheet = await initPaymentSheet({
        setupIntentClientSecret: clientSecret,
        merchantDisplayName: '',
      });
      console.log('initsheet', initSheet);
      if (initSheet.error) {
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await presentPaymentSheet();
      if (presentSheet.error) {
        return Alert.alert(presentSheet.error.message);
      }
      Alert.alert('Payment complete, thank you!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginTop: 50}} onPress={ab}>
        <Text style={{color: 'black'}}>click</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSheett;
const styles = StyleSheet.create({
  container: {flex: 1},
  iconStyle: {paddingRight: 10},
  back: {
    position: 'absolute',
    left: 10,
    top: 30,
    padding: 10,
    zIndex: 9999,
  },
});
