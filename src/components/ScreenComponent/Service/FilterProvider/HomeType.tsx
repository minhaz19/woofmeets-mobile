import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
interface Props {
  Icon: any;
}
const HomeType = ({Icon}: Props) => {
  return (
    <View style={styles.container}>
      <Icon />
    </View>
  );
};

export default HomeType;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3 - 28,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.border,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
