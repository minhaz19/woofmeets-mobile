import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderText from '../../components/common/text/HeaderText';
import ShortText from '../../components/common/text/ShortText';
import AppForm from '../../components/common/Form/AppForm';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {CreditAndDebitCardSchema} from '../../utils/config/creditandDebitCard/validationSchema';
import {debitAndCreditCard} from '../../utils/config/creditandDebitCard/initialValues';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import CheckoutInputForm from '../../components/ScreenComponent/Checkout/components/CheckoutInputForm';
import {Token, createToken} from '@stripe/stripe-react-native';
import AppStripe from '../../components/common/Stripe/AppStripe';
import {useApi} from '../../utils/helpers/api/useApi';
import methods from '../../api/methods';
const endpoint = '/stripe-payment-method/add-card';
const CreditAndDebitCard = () => {
  const {colors} = useTheme();
  const {loading, request} = useApi(methods._post);
  const handleValues = async (cardData: any) => {
    // : Token.CreateParams
    const tokenPayload = {
      type: 'Card',
      address: {
        city: cardData.city,
        country: cardData.cardInfo.city,
        state: cardData.state,
        postalCode: cardData.cardInfo.city,
        line1: cardData.line1,
        line2: cardData.line2,
      },
      currency: 'USD',
      name: cardData.name,
      exp_month: 8,
      exp_year: 2023,
      last4: '4242',
      cvc: '412',
    };
    const {error, token} = await createToken(tokenPayload);
    console.log('error token', error, token);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log(`Error: ${JSON.stringify(error)}`);
    } else if (token) {
      Alert.alert(
        'Success',
        `The token was created successfully! token: ${token.id}`,
      );
    }
    const reqPayload = {
      customerId: 'cus_MShSRbPwuM9ohF',
      countryId: 0,
      token: token?.id,
    };
    const result = await request(endpoint, reqPayload);
    console.log('reslult', result);
  };

  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
        <HeaderText
          text={'Credit card and Debit card'}
          textStyle={styles.headerText}
        />
        <ShortText
          text="All transactions are secured and encrypted"
          textStyle={styles.shortText}
        />
        <AppForm
          initialValues={debitAndCreditCard}
          validationSchema={CreditAndDebitCardSchema}>
          <AppStripe>
            <CheckoutInputForm handleValues={handleValues} />
          </AppStripe>
        </AppForm>
      </ScrollView>
    </View>
  );
};

export default CreditAndDebitCard;

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 20,
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: Text_Size.Text_2,
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  shortText: {
    fontSize: Text_Size.Text_0,
    color: Colors.subText,
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
});
