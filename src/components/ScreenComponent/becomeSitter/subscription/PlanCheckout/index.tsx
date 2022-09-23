import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import AppForm from '../../../../common/Form/AppForm';
import PlanCheckoutBody from './components/PlanCheckoutBody';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import AppStripe from '../../../../common/Stripe/AppStripe';
import {planCheckoutInit} from '../../../../../utils/config/initalValues/initalValues';
import {planCheckoutValidationSchema} from '../../../../../utils/config/ValidationSchema/validationSchema';
import Screen from '../../../../common/Screen';
import CheckoutANI from '../../../../common/LottieAnimations/CheckoutANI';
import {usePlanCheckout} from './utils/usePlanCheckout';
interface Props {
  route: any;
}
const PlanCheckout = ({route}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const {loading, handleSubmit, saveCard, setSaveCard} = usePlanCheckout(route);
  return (
    <Screen style={styles.screen}>
      <ScrollView
        style={[
          styles.rootContainer,
          {
            backgroundColor: isDarkMode
              ? colors.lightBackgroundColor
              : colors.backgroundColor,
          },
        ]}>
        <CheckoutANI />
        <AppForm
          initialValues={planCheckoutInit}
          validationSchema={planCheckoutValidationSchema}>
          <AppStripe>
            <PlanCheckoutBody
              handleSubmit={handleSubmit}
              loading={loading}
              handleCheck={() => setSaveCard(!saveCard)}
            />
          </AppStripe>
        </AppForm>
      </ScrollView>
    </Screen>
  );
};

export default PlanCheckout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 20,
  },
  container: {flex: 1},
  screen: {flex: 1},
});
