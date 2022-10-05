/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import methods from '../../../../api/methods';
import Colors from '../../../../constants/Colors';
import {useApi} from '../../../../utils/helpers/api/useApi';
import storage from '../../../../utils/helpers/auth/storage';
import {useNavigation} from '@react-navigation/native';

import Ion from 'react-native-vector-icons/Ionicons';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
const endpoint = '/stripe-payment-method/add-card';
const customerEndPoint = '/stripe-payment-method/customers';
const STRIPE_PK =
  'pk_test_51LTB7cKt0zm1z41kPTt1L4KXeMUPfd4qyWjQdYQR69ejOa2wdd2kpoO2ucIgYG8WJWZTohiDbdmtzG0m04nF0ff900964FN1Vr';

const AddCardForm = (props: any) => {
  const [customerId, setCustomerId] = useState<string | null | undefined>('');
  const {loading, request} = useApi(methods._post);
  const {request: getReq} = useApi(methods._get);
  const cd = async () => {
    const response = await getReq(customerEndPoint);
    console.log('res', response);
    response.ok && setCustomerId(response?.data?.data.stripeCustomerId);
  };
  useEffect(() => {
    cd();
  }, []);

  const htmlContent = `
    
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>Payment Page</title>
               <script src="https://js.stripe.com/v3/"></script>
               <script src="https://cdn.tailwindcss.com"></script>
               <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                <style>
       
                </style>
            
            
            </head>
            <body>
                
      <div class='w-full h-[30%] bg-black mx-auto flex flex-col justify-center items-center rounded-b-2xl'>
   
         <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_egmSxc.json"  background="transparent"  speed="1"  style="width: 350px; "  loop  autoplay></lottie-player>
        <p class='text-3xl font-bold text-center text-white -mt-10 mb-10'>Add New Card</p>
         </div>

   <div class="mt-5  mx-6">
      <div class="info-container">
        <p class="text-sm mb-5">
          Select your default method for payments. We accepts all major credit
          and debit cards.
        </p>
      </div>
      <div class="row">
        <label class="card-errors" id="card-errors"></label>
      </div>
                        <form>
                           <div class="card-holder">
          <label class="mb-6 flex flex-col space-y-2">
            <span class="text-gray-700 font-bold">Name on card</span>
            <input
              type="text"
              placeholder="Card Holder Name"
              id="card-name"
              class="border rounded border-gray-300 py-2 px-3" />
          </label>
          <span class="text-gray-700 font-bold ">Card Information</span>
          <div
            id="card-element"
            class="border border-gray-300 py-2 px-3 mt-2 rounded mb-6">
            <div class="form-group">
              <label for="card_number">Carn Number</label>
              <input
                type="text"
                class="form-control"
                id="card_number"
                data-stripe="number" />
            </div>
            <div class="form-row">
              <label>
                <span class="card-placeholder" style="color: red">
                  Card number</span
                >
                <input type="text" size="20" data-stripe="number" />
              </label>
            </div>

            <div class="form-row">
              <label>
                <span>Expiration (MM/YY)</span>
                <input type="text" size="2" data-stripe="exp_month" />
              </label>
              <span> / </span>
              <input type="text" size="2" data-stripe="exp_year" />
            </div>

            <div class="form-row">
              <label>
                <span>CVC</span>
                <input type="text" size="4" data-stripe="cvc" />
              </label>
            </div>

            <div class="form-row">
              <label>
                <span>Billing Zip</span>
                <input size="6" data-stripe="address_zip" value="400012" />
              </label>
            </div>
          </div>

          <label class="mb-6 flex flex-col space-y-2">
            <span class="text-gray-700 font-bold">Address </span>
            <input
              name="address1"
              type="text"
                id="address-line1"
              class="border border-gray-300 py-2 px-3 rounded"
              placeholder="Enter address" />
          </label>
     
         
         <div class='flex flex-wrap justify-between '>
            <label class="mb-6 flex flex-col space-y-2 w-[48%]">
              <span class="text-gray-700 font-bold">City</span>
              <input
                name="city"
                type="text"
                  id="address-city"
                class="border border-gray-300 py-2 px-3 rounded"
                placeholder="Enter city" />
            </label>

            <label class="mb-6 flex flex-col space-y-2 w-[48%]">
              <span class="text-gray-700 font-bold">State/Province</span>
              <input
                name="state"
                type="text"
                  id="address-state"
                class="border border-gray-300 py-2 px-3 rounded"
                placeholder="Enter state" />
            </label>
          </div>
            <label class="mb-6 flex flex-col space-y-2">
              <span class="text-gray-700 font-bold">Zip/Postal code</span>
              <input
                name="zip"
                type="text"
                  id="address-zip"
                class="border border-gray-300 py-2 px-3 rounded"
                placeholder="Enter postal code" />
            </label>
        
          <div class="mb-40">
            <button
              type="submit"
           
              class="w-full rounded-full py-2 text-white font-bold bg-black">
              Add Card
            </button>
        
        </div>
        </div>
  
                        </form>
            
                    
                </div>
                
                <script>
                function goBack() {
  window.history.back()
}
                    var stripe = Stripe('${STRIPE_PK}');
                    var elements = stripe.elements();
            
            
                        var card = elements.create("card", {
                            hidePostalCode: true,
                             style: {
                                base: {
                                color: 'black',
                                fontWeight: 500,
                                // fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                '::placeholder': {
                                    color: '',
                                },
                                ':-webkit-autofill': {
                                    color: 'black',
                                },
                            },
                            invalid: {
                                color: '#FC011F',
                                '::placeholder': {
                                    color: '#FFCCA5',
                                },
                            },
                            }
                        });
                        // Add an instance of the card Element into the 'card-element' <div>.
                        card.mount('#card-element');
                        /**
                         * Error Handling
                         */
                        //show card error if entered Invalid Card Number
                        function showCardError(error){
                            document.getElementById('card-errors').innerHTML = ""
                            if(error){
                                document.getElementById('card-errors').innerHTML = error
                            } 
                        }
                        
                        card.on('change', function(event) {
                            if (event.complete) {
                                showCardError()
                                // enable payment button
                            } else if (event.error) {
                                const { message} = event.error
                                console.log(message)
                                showCardError(message)
                            }
                        });
                        
                        card.mount('#card-element');
                        
                    
                        var form =  document.querySelector('form');
                        form.addEventListener('submit', function(e) {
                            e.preventDefault();
           
                            var additionalData = {
                                name: document.getElementById('card-name').value,
                                address_line1: document.getElementById('address-line1').value,
                                address_line2: null,
                                address_city:  document.getElementById('address-city').value,
                                address_state: document.getElementById('address-state').value,
                                address_zip: document.getElementById('address-zip').value,
                                country: null,
                            };
                       
                        
                            stripe.createToken(card, additionalData).then(function(result) {
                      
                            if (result.token) {
                                window.postMessage(JSON.stringify(result))
                            } else {
                                window.postMessage(JSON.stringify(result))
                            }
                        });
                        })
                </script>
            </body>
            </html>
    `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = async (event: any) => {
    const {data} = event.nativeEvent;
    const da = JSON.parse(data);

    // if (data?.token) {
    const reqPayload = {
      customerId: customerId,
      countryId: 1,
      token: da?.token?.id,
    };
    console.log('card', customerId, da?.token?.id);
    const result = await request(endpoint, reqPayload);
    console.log('result', result);
    // }
  };
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppTouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back}>
        <Ion
          name="ios-chevron-back"
          size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
          style={styles.iconStyle}
          color={Colors.primary}
        />
      </AppTouchableOpacity>
      <WebView
        ref={webViewRef}
        startInLoadingState={true}
        javaScriptEnabled={true}
        renderLoading={() => <AppActivityIndicator visible />}
        style={styles.container}
        originWhitelist={['*']}
        source={{html: htmlContent}}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AddCardForm;
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
