import {View, StyleSheet} from 'react-native';
import React from 'react';
import ContactScreen from '../../profile/ContactScreen';

const PhoneNumberSitter = () => {
  return (
    <View style={styles.container}>
      <ContactScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PhoneNumberSitter;
