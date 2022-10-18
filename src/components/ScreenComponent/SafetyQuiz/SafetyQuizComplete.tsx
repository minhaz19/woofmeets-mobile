import {StyleSheet, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import HeaderText from '../../common/text/HeaderText';
import ShortText from '../../common/text/ShortText';
import Text_Size from '../../../constants/textScaling';

const SafetyQuizComplete = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        autoPlay
        loop
        source={require('../../../assets/quiz.json')}
        style={styles.loaderStyle}
      />
      <HeaderText textStyle={styles.headerText} text={'Quiz Completed'} />
      <ShortText
        textStyle={styles.shortText}
        text={
          'You hove passed our pets safety quiz test, Lets discover and complete the on boarding process'
        }
      />
    </View>
  );
};

export default SafetyQuizComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_5,
  },
  shortText: {
    paddingHorizontal: '15%',
    textAlign: 'center',
    marginVertical: 20,
  },
  loaderStyle: {width: '100%', marginTop: -20},
});
