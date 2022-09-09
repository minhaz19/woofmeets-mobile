import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
interface Props {
  Icon?: any;
  title: string;
  subTitle?: string;
  image?: any;
}
const ImageAndTitle = ({title, Icon, subTitle}: Props) => {
  return (
    <View>
      <View style={styles.iconContainer}>
        {Icon && (
          <Icon
            width={SCREEN_WIDTH > 800 ? 200 : 180}
            height={SCREEN_WIDTH > 800 ? 200 : 180}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title} text={title} />
        {subTitle && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}
      </View>
    </View>
  );
};

export default ImageAndTitle;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
  },
  iconContainer: {width: '100%', alignItems: 'center'},
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    textAlign: 'center',
    marginTop: '5%',
  },
});
