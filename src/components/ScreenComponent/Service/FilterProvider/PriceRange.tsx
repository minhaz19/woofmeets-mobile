import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppInputRange from '../../../common/Form/AppInputRange';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
const PriceRange = () => {
  return (
    <View>
      <TitleText textStyle={styles.title} text="Rate Per Night" />
      <AppInputRange
        minValue={0}
        maxValue={10000}
        onChangeMin={e => console.log('change min', e)}
        onChangeMax={e => console.log('change max', e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_0,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
export default memo(PriceRange);
