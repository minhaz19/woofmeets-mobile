import {ScrollView, StyleSheet, View} from 'react-native';
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
import CheckoutInputForm from '../../components/ScreenComponent/Checkout/CheckoutInputForm';
import AppStripe from '../../components/common/Stripe/AppStripe';
import {useCreditDebitCard} from './utils/useCreditDebitCard';
const CreditAndDebitCard = () => {
  const {colors} = useTheme();

  const {loading, tokenLoading, handleValues} = useCreditDebitCard();
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
            <CheckoutInputForm
              handleValues={handleValues}
              loading={loading || tokenLoading}
            />
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
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
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