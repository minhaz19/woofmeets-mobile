import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import Colors from '../../../../../../../../constants/Colors';
import {ArrowRight} from '../../../../../../../../assets/svgs/Services_SVG';
import Text_Size from '../../../../../../../../constants/textScaling';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';

const SitterPets = () => {
  const {isDarkMode} = useTheme();
  return (
    <View
      style={[
        styles.card,
        styles.shadowProp,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.lightDark
            : Colors.background,
        },
      ]}>
      <View style={styles.contentWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1530041539828-114de669390e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
          }}
        />
        <View style={styles.textContainer}>
          <TitleText textStyle={styles.titleText} text="Bob Marvy" />
          <ShortText textStyle={styles.subText} text="Doberman short-hair" />
          <ShortText
            textStyle={styles.short}
            text={'85 pound, 10 Years, 8 months old, '}
          />
        </View>
        <View style={styles.icon}>
          <ArrowRight />
        </View>
      </View>
    </View>
  );
};

export default SitterPets;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    borderColor: Colors.shadow,
    borderWidth: 0.2,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: Colors.darkShadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
    elevation: 0.7,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_0,
  },
  subText: {
    marginVertical: 2,
  },
  short: {
    color: Colors.subText,
  },
  icon: {
    marginRight: 10,
  },
});
