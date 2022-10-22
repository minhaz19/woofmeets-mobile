import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Minus, Plus} from '../../assets/svgs/SVG_LOGOS';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import TitleText from './text/TitleText';

const IncreDecreButton = () => {
  const [count, setCount] = useState(0);
  const handleCount = (method: string) => {
    if (method === 'plus') {
      if (count === 30) {
        return;
      }
      setCount(count + 1);
    } else if (method === 'minus') {
      if (count === 0) {
        return;
      }
      setCount(count - 1);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleCount('minus')}
        style={styles.minus}>
        <Minus fill={'white'} width={25} height={25} />
      </TouchableOpacity>
      <View style={styles.value}>
        <TitleText textStyle={styles.text} text={count} />
      </View>
      <TouchableOpacity onPress={() => handleCount('plus')} style={styles.plus}>
        <Plus fill={'white'} width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

export default IncreDecreButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    width: 100,
    // flex: 1,

    justifyContent: 'space-between',
    borderRadius: 50,
    overflow: 'hidden',
  },
  plus: {
    backgroundColor: Colors.primary,
    width: '32.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    backgroundColor: 'white',
    flex: 0,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    // paddingHorizontal: 10,
  },
  text: {fontSize: Text_Size.Text_0},
  minus: {
    backgroundColor: Colors.primary,
    flex: 1,
    width: '32.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
