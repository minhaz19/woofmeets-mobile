import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
interface Props {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}
const ProviderStoryInput = ({navigation}: Props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="send message"
        placeholderTextColor="white"
        style={styles.input}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="navigation" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ProviderStoryInput;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
  input: {
    borderColor: 'white',
    borderRadius: 25,
    width: '85%',
    height: 50,
    paddingLeft: 20,
    borderWidth: 1,
    fontSize: 20,
    color: 'white',
  },
  icon: {fontSize: 30, color: 'white'},
});
