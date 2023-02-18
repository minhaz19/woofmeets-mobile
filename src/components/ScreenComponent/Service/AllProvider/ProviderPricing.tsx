import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import ShortText from '../../../common/text/ShortText';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
interface Props {
  pricing: any;
  provider: any;
}
const ProviderPricing = ({pricing, provider}: Props) => {
  const price = pricing?.length > 0 ? pricing[0]?.amount : 0;
  const currencyCode = provider?.user?.basicInfo?.country?.currencyCode;
  return (
    <View style={styles.container}>
      <TitleText
        textStyle={styles.title}
        text={`${
          currencyCode === null ||
          currencyCode === undefined ||
          currencyCode === 'usd'
            ? '$'
            : 'C$'
        }${price}`}
      />
      <ShortText textStyle={styles.subTitle} text="per night" />
    </View>
  );
};

export default ProviderPricing;

const styles = StyleSheet.create({
  container: {},
  title: {fontSize: Text_Size.Text_1, textAlign: 'right', fontWeight: '700'},
  subTitle: {color: Colors.gray},
});
