import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import Colors from '../../../../../../../../constants/Colors';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';
import {colors} from '../../../../../../../../constants/theme/textTheme';

const ReviewItem = () => {
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
          uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3280&q=80',
        }}
      />
      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title} text="Hero Alom" />
        <ShortText textStyle={styles.shortTitle} text={'03.09.2022'} />
        <ShortText
          textStyle={styles.description}
          text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,"
        />
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
