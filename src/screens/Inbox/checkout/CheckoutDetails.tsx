import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Pricing from '../../../components/ScreenComponent/Inbox/Details/Pricing';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import BottomSpacingNav from '../../../components/UI/BottomSpacingNav';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import AppointmentProposalInfo from '../../../components/ScreenComponent/Checkout/components/AppointmentProposalInfo';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {
  // getProposalPricing,
  getSettleProposalPricing,
} from '../../../store/slices/Appointment/Details/getProposalPricing';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {useNavigation} from '@react-navigation/native';
import AppStripe from '../../../components/common/Stripe/AppStripe';

const CheckoutDetails = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  // const dispatch = useAppDispatch();
  // const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  // useEffect(() => {
  //   dispatch(getSettleProposalPricing(proposedServiceInfo.appointmentOpk));
  //   // dispatch(getProposalPricing(proposedServiceInfo.appointmentOpk));
  // }, []);
  const handlePayment = () => {
    navigation.navigate('PaymentMethod', {
      sequence: 'Appointment',
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}
      keyboardVerticalOffset={120}>
      <AppStripe>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerContainer}>
            {/* Appointment Proposal infos */}
            <AppointmentProposalInfo />
            {/* Charges & Services */}
            <Pricing screen="checkout" />
            {/* <PromoCode /> */}
            <BottomSpacing />
          </View>
          <View style={styles.footerContainer}>
            <ButtonCom
              title="Proceed To Payment"
              textAlignment={btnStyles.textAlignment}
              containerStyle={btnStyles.containerStyleFullWidth}
              titleStyle={btnStyles.titleStyle}
              onSelect={handlePayment}
            />
          </View>
          <BottomSpacingNav />
        </ScrollView>
      </AppStripe>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: '5%',
  },
  footerContainer: {
    paddingHorizontal: '5%',
  },
});

export default CheckoutDetails;
