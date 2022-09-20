/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckoutInputForm from './components/CheckoutInputForm';
import {
  CardField,
  CardForm,
  Token,
  useStripe,
} from '@stripe/stripe-react-native';
import AppStripe from '../../common/Stripe/AppStripe';

interface Props {
  handleValues: () => void;
}
const CheckoutMethod = ({handleValues}: Props) => {
  const { createToken} = useStripe();

  const _createToken = async (type: Token.Type) => {
    const objTyep: Token.CreateParams = {
      type: 'Card',
      address: {
        city: 'chittagong',
        country: 'USA',
        line1: 'empty',
        line2: 'null ball chall',
        state: 'null ball chall',
        postalCode: '42424',
      },

      currency: 'USD',
      name: 'meer habib',
      //   exp_month: 8,
      //   exp_year: 2023,
      //   last4: '4242',
    };
    const {error, token} = await createToken(objTyep);
    console.log('error token', error, token);
    // if (error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    //   console.log(`Error: ${JSON.stringify(error)}`);
    // } else if (token) {
    //   Alert.alert(
    //     'Success',
    //     `The token was created successfully! token: ${token.id}`,
    //   );
    // }
  };

  return (
    <View>
      <AppStripe>
        <CardForm
          onFormComplete={cardDetails => {
            console.log('card details', cardDetails);
            // setCard(cardDetails);
          }}
          style={{height: 200}}
        />
        <Button
          onPress={() => _createToken('Card')}
          title="Create a token from a card"
          accessibilityLabel="Create a token from a card"
        />
      </AppStripe>
      {/* <CheckoutInputForm handleValues={handleValues} /> */}
    </View>
  );
};

export default CheckoutMethod;

const styles = StyleSheet.create({});
