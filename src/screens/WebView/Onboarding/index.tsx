import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const OnboardingWebView = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setError(false);
  };

  const handleLoadError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={{flex: 1}}>
      {loading && <AppActivityIndicator visible={loading} />}
      {error && <Text>Error loading page</Text>}
      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'https://woof.hirebeet.com/provider-profile/service-selector',
        }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleLoadError}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
        }}
        // onNavigationStateChange={navState => {
        //   // Keep track of going back navigation within component
        //   if (
        //     navState.url == 'https://woofmeets.com' ||
        //     navState.url == 'https://woofmeets.com/provider-profile' ||
        //     navState.url == 'https://www.woofmeets.com/provider-profile'
        //   ) {
        //     // dispatch(getUserOnboardStatus());
        //     props.navigation.goBack();
        //   }
        // }}
      />
    </View>
  );
};

export default OnboardingWebView;

const styles = StyleSheet.create({});
