import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';

interface Props {
  children: any;
}
const AppStripe = ({children}: Props) => {
  return (
    <StripeProvider publishableKey="pk_live_51LTB7cKt0zm1z41kH4PmsdhU5hLqobeIlvKmvA1PmhuWylEW5i14gumFk52G8CZGTkNnql3g7MJ1CviR1h0Zb3C700iTaU4mBS">
      {children}
    </StripeProvider>
  );
};

export default AppStripe;

// test : pk_test_51LuUiGCbzlJgV59MLQDvLPoQfCi1Yml8IXBftc32xcwf6TKDzwcVMcGTmS0CudaErVG1gKVCFI4lQ8ZA7wLrKPCT003isLHUPS
// stage: pk_test_51LTB7cKt0zm1z41kPTt1L4KXeMUPfd4qyWjQdYQR69ejOa2wdd2kpoO2ucIgYG8WJWZTohiDbdmtzG0m04nF0ff900964FN1Vr
