import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {EyeClose, EyeOpen} from '../../../assets/SVG_LOGOS';
const screen = SCREEN_WIDTH;
const AppInput = ({...otherProps}) => {
  const [show, setShow] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'gray'}
        style={styles.text}
        {...otherProps}
        secureTextEntry={otherProps.secureTextEntry ? show : false}
      />
      {otherProps.secureTextEntry &&
        (show ? (
          <EyeOpen size={20} onPress={() => setShow(!show)} />
        ) : (
          <EyeClose size={20} onPress={() => setShow(!show)} />
        ))}
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
    height: 40,
    paddingVertical: screen > 390 ? -10 : 0,
    paddingHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: Text_Size.Text_0,
    flex: 0,
    color: 'black',
  },
});
