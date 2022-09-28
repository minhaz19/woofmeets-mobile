import {StyleSheet, View} from 'react-native';
import React from 'react';
import ProviderProfileInfo from './components/ProviderProfileInfo';
import ProviderProfileFeature from './components/ProviderProfileFeature';
import VerifiedSitter from './components/VerifiedSitter';

const ProviderHeader = () => {
  return (
    <View style={styles.container}>
      <ProviderProfileInfo />
      <VerifiedSitter />
      <ProviderProfileFeature />
    </View>
  );
};

export default ProviderHeader;

const styles = StyleSheet.create({
  container: {},
});
