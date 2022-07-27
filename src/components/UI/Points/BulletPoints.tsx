import {View, StyleSheet} from 'react-native';
import React from 'react';
import TitleText from '../../common/text/TitleText';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../../constants/Colors';

const BulletPoints = (props: {text: string}) => {
  return (
    <View style={styles.lineContainer}>
      <Entypo
        name="check"
        size={22}
        color={Colors.green}
        style={styles.iconStyle}
      />
      <TitleText text={props.text} textStyle={styles.textStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    paddingTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 10},
  textStyle: {
    fontWeight: '500',
  },
});

export default BulletPoints;
