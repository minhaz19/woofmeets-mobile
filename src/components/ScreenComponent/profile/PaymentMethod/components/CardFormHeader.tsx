import {StyleSheet, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import HeaderText from '../../../../common/text/HeaderText';
import Text_Size from '../../../../../constants/textScaling';

const CardFormHeader = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        autoPlay
        loop
        source={require('../../../../../assets/cards.json')}
        style={styles.loaderStyle}
      />
      <HeaderText textStyle={styles.text} text={'Add New Card'} />
    </View>
  );
};

export default CardFormHeader;

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  loaderStyle: {width: '50%'},
  text: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
    color: 'black',
  },
});
