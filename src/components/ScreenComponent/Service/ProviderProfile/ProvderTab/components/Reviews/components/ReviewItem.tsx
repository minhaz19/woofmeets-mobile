/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import Colors from '../../../../../../../../constants/Colors';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';
import {colors} from '../../../../../../../../constants/theme/textTheme';
import changeTextLetter from '../../../../../../../common/changeTextLetter';
import {format} from 'date-fns';

interface Props {
  item: any;
}
const ReviewItem = ({item}: Props) => {
  const {isDarkMode} = useTheme();
  return (
    <View
      style={[
        styles.container,
        styles.shadow,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.lightDark
            : Colors.background,
        },
      ]}>
      <Image
        style={[
          styles.image,
          {borderWidth: 1, borderColor: colors.borderColor},
        ]}
        source={{
          uri: item.image
            ? item?.image?.avatar.url
            : 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
        }}
      />
      <View style={styles.textContainer}>
        <TitleText
          textStyle={styles.title}
          text={
            changeTextLetter(item?.reviewedByIdUser?.firstName) +
            ' ' +
            changeTextLetter(item?.reviewedByIdUser?.lastName)
          }
        />
        <ShortText
          textStyle={styles.shortTitle}
          text={format(new Date(item?.createdAt), 'MM-dd-yyy')}
        />
        <ShortText textStyle={styles.description} text={item?.comment} />
      </View>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,

    borderRadius: 5,
    marginVertical: 10,
  },
  shadow: {
    shadowColor: Colors.darkShadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
    elevation: 0.7,
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  shortTitle: {
    marginTop: 2,
    marginBottom: 6,
    fontWeight: '300',
  },
  description: {
    fontWeight: '400',
  },
});
