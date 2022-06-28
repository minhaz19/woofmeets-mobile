import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';

const AppInput = ({...otherProps}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'gray'}
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    borderRadius: 5,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
});
