import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
          <MIcon
            name="eye-off"
            size={20}
            color={'gray'}
            onPress={() => setShow(!show)}
          />
        ) : (
          <MIcon
            name="eye"
            size={20}
            color={'gray'}
            onPress={() => setShow(!show)}
          />
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
    paddingVertical: screen > 390 ? -10 : 10,
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
