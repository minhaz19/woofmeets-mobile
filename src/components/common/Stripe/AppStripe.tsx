import React from 'react';
import {View} from 'react-native';

// import {StripeProvider} from '@stripe/stripe-react-native';
interface Props {
  children: any;
}
const AppStripe = ({children}: Props) => {
  return (
    <View />
    // <StripeProvider publishableKey="pk_test_51LTB7cKt0zm1z41kPTt1L4KXeMUPfd4qyWjQdYQR69ejOa2wdd2kpoO2ucIgYG8WJWZTohiDbdmtzG0m04nF0ff900964FN1Vr">
    //   {children}
    // </StripeProvider>
  );
};

export default AppStripe;
