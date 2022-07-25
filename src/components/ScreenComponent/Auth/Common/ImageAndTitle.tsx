import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../../constants/textScaling';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
interface Props {
  Icon: any;
  title: string;
  subTitle?: string;
  image?: any;
}
const ImageAndTitle = ({title, Icon, subTitle}: Props) => {
  return (
    <View>
      <View style={styles.iconContainer}>
        {/* <AuthPassword width={150} height={150} /> */}
        {Icon && <Icon />}
        {/* {Icon && ( */}
        {/* <View style={{width: 80, height: 80}}>
          <Svg width="80" height="80">
            <Image
              href={require('../../../../assets/image/forgotPassword/password.svg')}
            />
          </Svg>
          <SvgUri width="200" height="200" svgXmlData={im} />
        </View> */}
        {/* )} */}
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
