import {View, StyleSheet} from 'react-native';
import React from 'react';
import ContactScreen from '../../profile/ContactScreen/ContactScreen';

const PhoneNumberSitter = ({route}) => {
  return (
    <View style={styles.container}>
      <ContactScreen route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PhoneNumberSitter;
