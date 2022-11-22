/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AppForm from '../../../common/Form/AppForm';
import AppStripe from '../../../common/Stripe/AppStripe';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {debitAndCreditCard} from '../../../../utils/config/creditandDebitCard/initialValues';
import {CreditAndDebitCardSchema} from '../../../../utils/config/creditandDebitCard/validationSchema';
import Text_Size from '../../../../constants/textScaling';
import CardFormHeader from './components/CardFormHeader';
import {useAddCardForm} from './utils/useAddCardForm';
import AddCardFormBody from './components/AddCardFormBody';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddCardForm = ({navigation, route}: any) => {
  const {colors} = useTheme();
  const {sequence} = route.params;
  const {handleValues, idemLoading, loading, appointmentLoading, tokenLoading} =
    useAddCardForm(navigation, sequence);

  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        extraScrollHeight={200}
        enableAutomaticScroll={true}
        enableOnAndroid={true}>
        <CardFormHeader />
        <AppForm
          initialValues={debitAndCreditCard}
          validationSchema={CreditAndDebitCardSchema}>
          <AppStripe>
            <AddCardFormBody
              handleValues={handleValues}
              loading={
                loading || tokenLoading || idemLoading || appointmentLoading
              }
              sequence={sequence}
            />
          </AppStripe>
        </AppForm>
      </KeyboardAwareScrollView>
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
