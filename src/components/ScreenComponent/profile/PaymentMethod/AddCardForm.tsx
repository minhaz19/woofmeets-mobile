/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import methods from '../../../../api/methods';
import Colors from '../../../../constants/Colors';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {useNavigation} from '@react-navigation/native';

import Ion from 'react-native-vector-icons/Ionicons';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import HeaderText from '../../../common/text/HeaderText';
import ShortText from '../../../common/text/ShortText';
import AppForm from '../../../common/Form/AppForm';
import AppStripe from '../../../common/Stripe/AppStripe';
import CheckoutInputForm from '../../Checkout/CheckoutInputForm';
import {useCreditDebitCard} from '../../../../screens/checkout/utils/useCreditDebitCard';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {debitAndCreditCard} from '../../../../utils/config/creditandDebitCard/initialValues';
import {CreditAndDebitCardSchema} from '../../../../utils/config/creditandDebitCard/validationSchema';
import Text_Size from '../../../../constants/textScaling';
import CardFormHeader from './components/CardFormHeader';

const AddCardForm = ({navigation}: any) => {
  const {colors} = useTheme();
  const {handleValues, loading, tokenLoading} = useCreditDebitCard(navigation);
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardFormHeader />
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

export default AddCardForm;
const styles = StyleSheet.create({
  rootContainer: {
    // paddingTop: 20,
    flex: 1,
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
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
