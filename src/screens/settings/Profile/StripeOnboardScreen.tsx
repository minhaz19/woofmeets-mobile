import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { getUserOnboardStatus } from '../../../store/slices/connect/stripe';
import { useAppDispatch } from '../../../store/store';

const StripeOnboardScreen = (props: { route: { params: { url: any } }; navigation: { goBack: () => void } }) => {
    const dispatch = useAppDispatch();
return (
    <View style={{flex: 1}}>
        <WebView
            source={{ uri: props.route.params.url}}
            onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn(
                  'WebView received error status code: ',
                  nativeEvent.statusCode,
                );
              }}
            onNavigationStateChange={(navState) => {
                // Keep track of going back navigation within component
                console.log('state', navState);
                if (navState.url == 'http://localhost:3000/provider-profile' || 
                    'http://woofmeets.com/provider-profile' || 
                    'http://www.woofmeets.com/provider-profile')
                {
                    dispatch(getUserOnboardStatus())
                    props.navigation.goBack();
                }
            }}
        />
    </View>
    )
}

export default StripeOnboardScreen