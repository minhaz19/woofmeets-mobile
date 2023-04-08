import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {getUserOnboardStatus} from '../../../store/slices/connect/stripe';
import {useAppDispatch} from '../../../store/store';

const StripeOnboardScreen = (props: {
  route: {params: {url: any}};
  navigation: {goBack: () => void};
}) => {
  const dispatch = useAppDispatch();
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: props.route.params.url}}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
    
        }}
        onNavigationStateChange={navState => {
          // Keep track of going back navigation within component
          if (
            navState.url == 'https://woofmeets.com' ||
            navState.url == 'https://woofmeets.com/provider-profile' ||
            navState.url == 'https://www.woofmeets.com/provider-profile'
          ) {
            dispatch(getUserOnboardStatus());
            props.navigation.goBack();
          }
        }}
      />
    </View>
  );
};

export default StripeOnboardScreen;
