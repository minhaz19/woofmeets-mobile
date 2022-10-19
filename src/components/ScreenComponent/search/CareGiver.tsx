import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  CustomerServiceSvg,
  GirlWithCatsSvg,
  TwentyFourBySevenSvg,
} from './utils/SearchBoxCardSvg';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import SliderScreenParent from './SliderScreenParent';
import BigText from '../../common/text/BigText';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import DescriptionText from '../../common/text/DescriptionText';

const CareGiver = () => {
  const data = [
    {
      id: 1,
      description:
        "Following submission of your request, you will be matched with an amazing Pet Sitter based on your dog's breed(s) and specific comments.",
      icon: (
        <CustomerServiceSvg
          width={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
          height={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
        />
      ),
    },
    {
      id: 2,
      description:
        'If you want to choose your own pet-sitter, choose Pet parent match in pet-sitter preference during booking. Alternatively, from the home screen, use Browse & Book to find and communicate with nearby pet-sitters.',
      icon: (
        <TwentyFourBySevenSvg
          width={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
          height={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
        />
      ),
    },
  ];
  return (
    <SliderScreenParent>
      <View style={styles.imageContainer}>
        <GirlWithCatsSvg style={styles.image} />
      </View>
      <BigText text={'Finding a Pet Sitter.'} textStyle={styles.bigTextStyle} />
      {data.map((item: any) => {
        return (
          <View style={styles.flexContainer} key={item.id}>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>{item.icon}</View>
            </View>
            <View style={styles.textContainer}>
              <DescriptionText
                text={item.description}
                textStyle={styles.shortTextStyle}
              />
            </View>
          </View>
        );
      })}
      <DescriptionText
        text={
          'All Woofmeets Pet-Sitters have been properly screened and background checked.'
        }
        textStyle={styles.footerTextStyle}
      />
    </SliderScreenParent>
  );
};

export default CareGiver;

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    width: '40%',
    height: '40%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bigTextStyle: {
    fontSize: Text_Size.Text_7,
    textAlign: 'center',
    marginVertical: '5%',
    fontWeight: '700',
    color: Colors.light.text,
  },
  iconContainer: {
    width: '25%',
  },
  icon: {
    borderRadius: 200,
    width: SCREEN_WIDTH <= 380 ? 60 : SCREEN_WIDTH <= 600 ? 70 : 90,
    height: SCREEN_WIDTH <= 380 ? 60 : SCREEN_WIDTH <= 600 ? 70 : 90,
    backgroundColor: '#FFE7D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '75%',
  },
  shortTextStyle: {
    color: Colors.light.text,
  },
  footerTextStyle: {
    color: Colors.primaryLight,
    textAlign: 'center',
  },
});
