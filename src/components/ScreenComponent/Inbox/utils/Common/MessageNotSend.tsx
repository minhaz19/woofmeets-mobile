import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import DescriptionText from '../../../../common/text/DescriptionText';
import HeaderText from '../../../../common/text/HeaderText';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';

interface Props {
  svg: any;
  title: string;
  description: string;
}

const MessageNotSend: FC<Props> = ({svg, title, description}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.SvgContainer}>
      {svg}
      <View style={styles.textContainer}>
        <HeaderText text={title} textStyle={styles.headerText} />
        <DescriptionText
          text={description}
          textStyle={{
            lineHeight: 20,
            marginTop:
              SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
            textAlign: 'center',
            color: colors.descriptionText,
          }}
        />
      </View>
    </View>
  );
};

export default MessageNotSend;

const styles = StyleSheet.create({
  SvgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
    alignItems: 'center',
    width: '70%',
  },
  headerText: {
    lineHeight: 20,
    textAlign: 'center',
  },
});
