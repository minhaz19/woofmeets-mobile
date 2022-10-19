import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import DescriptionText from '../../common/text/DescriptionText';
import BigText from '../../common/text/BigText';
import {
  CustomerServiceSvg,
  GirlWithCatsSvg,
  TwentyFourBySevenSvg,
} from './utils/SearchBoxCardSvg';
import SliderScreenParent from './SliderScreenParent';
import Text_Size from '../../../constants/textScaling';

const DuringService = () => {
  const data = [
    {
      id: 1,
      description:
        'Get updates in the Woofmeets application through live GPS tracking, map pins and chat with your pet anytime.',
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
        'Once your pet is home safely, you will receive a report card from your pet-sitter with a nice picture to let you know how the service went!',
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
      <BigText text={'During your service'} textStyle={styles.bigTextStyle} />
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
    </SliderScreenParent>
  );
};

export default DuringService;

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    width: '45%',
    height: '45%',
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
});
