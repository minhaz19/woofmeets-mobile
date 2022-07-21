import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import ShortText from '../../../common/text/ShortText';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
interface Props {
  pricing: string;
}
const ProviderPricing = ({pricing}: Props) => {
  return (
    <View style={styles.container}>
      <TitleText textStyle={styles.title} text={pricing} />
      <ShortText textStyle={styles.subTitle} text="per night" />
    </View>
  );
};

export default ProviderPricing;

const styles = StyleSheet.create({
  container: {},
  title: {fontSize: Text_Size.Text_2, fontWeight: '700'},
  subTitle: {color: Colors.gray},
});
