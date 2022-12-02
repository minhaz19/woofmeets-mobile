import {StyleSheet, View} from 'react-native';
import React from 'react';
import {VerifiedProviderSVG} from '../../../../../../assets/svgs/Services_SVG';
import TitleText from '../../../../../common/text/TitleText';
import ShortText from '../../../../../common/text/ShortText';
import Text_Size from '../../../../../../constants/textScaling';
import Colors from '../../../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../../../constants/WindowSize';

const VerifiedSitter = () => {
  return (
    <View style={styles.container}>
      <VerifiedProviderSVG
        width={'100%'}
        height={SCREEN_WIDTH > 800 ? 300 : 194}
      />

      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title} text="Verified" />
        <TitleText textStyle={styles.subTitle} text="Pet Sitter" />
        <ShortText
          textStyle={styles.shortText}
          text={'He is experienced and trusted'}
        />
      </View>
    </View>
  );
};

export default VerifiedSitter;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: SCREEN_WIDTH > 800 ? Text_Size.Text_2 : Text_Size.Text_1,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginVertical: 4,
    color: Colors.text,
  },
  shortText: {
    fontSize: Text_Size.Text_0,
    color: Colors.text,
    width: '70%',
  },
  textContainer: {
    position: 'absolute',
    top: SCREEN_WIDTH > 800 ? '39%' : '30%',
    left: SCREEN_WIDTH > 800 ? 70 : 30,
  },
});
