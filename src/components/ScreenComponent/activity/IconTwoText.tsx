import {View, StyleSheet} from 'react-native';
import React from 'react';
import TitleText from '../../common/text/TitleText';
import ShortText from '../../common/text/ShortText';

const IconTwoText = (props: {
  icon:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  title: string;
  description: string | number;
}) => {
  return (
    <View style={styles.innerContainer}>
      {props.icon}
      <View style={styles.textContainer}>
        <TitleText text={props.title} />
        <View style={styles.middleSpacing} />
        <ShortText text={props.description} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  textContainer: {
    paddingLeft: '2%',
  },
  middleSpacing: {
    height: 5,
  },
});

export default IconTwoText;
