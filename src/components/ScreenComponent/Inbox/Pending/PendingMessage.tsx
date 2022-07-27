import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';

const PendingMessage = () => {
  return (
    <View style={styles.container}>
        <View>
            
        </View>
      <Text>PendingMessage</Text>
    </View>
  );
};

export default PendingMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
});
