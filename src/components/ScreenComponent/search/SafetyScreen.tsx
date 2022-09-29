import {StyleSheet, View} from 'react-native';
import React from 'react';
import SliderScreenParent from './SliderScreenParent';
import BigText from '../../common/text/BigText';
import Text_Size from '../../../constants/textScaling';
import {
  BenefitSvg,
  CustomerServiceSvg,
  FlatSvg,
  TwentyFourBySevenSvg,
} from './utils/SearchBoxCardSvg';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import ShortText from '../../common/text/ShortText';
import Colors from '../../../constants/Colors';
import HeaderText from '../../common/text/HeaderText';

const SafetyScreen = () => {
  const safetyData = [
    {
      id: 1,
      header: 'Here when you need us',
      description:
        'The WoofMeets Guarantee is provided in support of each service you provide on the site.',
      icon: (
        <CustomerServiceSvg
          width={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
          height={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
        />
      ),
    },
    {
      id: 2,
      header: 'Safety is serious business',
      description:
        'Our support team is available 24 hours a day, 7 days a week',
      icon: (
        <TwentyFourBySevenSvg
          width={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
          height={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
        />
      ),
    },
    {
      id: 3,
      header: 'All about convenience',
      description:
        'The benefits of online payments are security, and convenience',
      icon: (
        <BenefitSvg
          width={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
          height={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
        />
      ),
    },
    {
      id: 4,
      header: "We've been around the block",
      description:
        'Pet sitters should receive ongoing education about pet care',
      icon: (
        <FlatSvg
          width={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
          height={SCREEN_WIDTH <= 380 ? 25 : SCREEN_WIDTH <= 600 ? 35 : 50}
        />
      ),
    },
  ];
  return (
    <>
      <SliderScreenParent>
        <BigText
          text={'Safety First. Always.'}
          textStyle={styles.bigTextStyle}
        />
        {safetyData.map((item: any) => {
          return (
            <View style={styles.flexContainer} key={item.id}>
              <View style={styles.iconContainer}>
                <View style={styles.icon}>{item.icon}</View>
              </View>
              <View style={styles.textContainer}>
                <HeaderText text={item.header} textStyle={styles.headerText} />
                <ShortText
                  text={item.description}
                  textStyle={styles.shortTextStyle}
                />
              </View>
            </View>
          );
        })}
      </SliderScreenParent>
    </>
  );
};

export default SafetyScreen;

const styles = StyleSheet.create({
  bigTextStyle: {
    marginTop: '15%',
    fontSize: Text_Size.Text_7,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: '5%',
    color: Colors.light.text,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  headerText: {
    paddingVertical: 4,
    color: Colors.light.text,
  },
});
