/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderText from '../../common/text/HeaderText';
import TitleText from '../../common/text/TitleText';
import DescriptionText from '../../common/text/DescriptionText';
import ShortText from '../../common/text/ShortText';
import Text_Size from '../../../constants/textScaling';

const SafetyQuizHeader = () => {
  return (
    <View>
      <HeaderText textStyle={styles.headerText} text={'Safety Quiz'} />
      <TitleText
        textStyle={styles.titleText}
        text={'Safe stays lead to 5 star reviews'}
      />
      <DescriptionText
        textStyle={styles.descriptionText}
        text={'Lorem ipsum description about the safety quick'}
      />
      <ShortText
        textStyle={styles.shortText}
        text={
          "Show pet parents you'll love their pets like they do by uploading welcoming and professional photos of yourself. The more photos the better! We recommend five to ten. Here's some guidelines for appropriate photos."
        }
      />
    </View>
  );
};

export default SafetyQuizHeader;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_2,
    marginTop: 10,
  },
  titleText: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  descriptionText: {},
  shortText: {
    marginTop: 10,
    marginBottom: 20,
  },
});
