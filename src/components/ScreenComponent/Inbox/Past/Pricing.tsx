import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

const Pricing = () => {
  const {colors} = useTheme();
  const tempData = [
    {
      id: 1,
      title: 'Charges & Services',
      priceFor: 'John Askelad',
      subTitle: 'Standard Rate',
      price: '$31.00',
      description: '1 night @ $32.00 / night',
    },
    {
      id: 2,
      title: 'Add - ons & Adjustments',
      priceFor: 'Pet Services fee',
      price: '$3.00',
      description: '1 night @ $32.00 / night',
    },
  ];
  return (
    <View>
      {tempData.map((item, index) => {
        return (
          <View key={index} style={styles.mapContainer}>
            <HeaderText text={item.title} textStyle={styles._textHeader} />
            <View style={styles.flexContainer}>
              <HeaderText
                text={item.priceFor}
                textStyle={styles.priceTextHeader}
              />
              <HeaderText text={item.price} textStyle={styles.priceText} />
            </View>
            {item.subTitle && (
              <HeaderText
                text={item.subTitle}
                textStyle={{fontWeight: '500'}}
              />
            )}

            <DescriptionText
              text={item.description}
              textStyle={{color: colors.descriptionText, lineHeight: 20}}
            />
          </View>
        );
      })}
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <View style={styles.totalContainer}>
        <HeaderText
          text={'Total:'}
          textStyle={{
            color: colors.descriptionText,
            fontWeight: '400',
            fontSize: Text_Size.Text_2,
          }}
        />
        <HeaderText
          text={' $34.00'}
          textStyle={{
            fontSize: Text_Size.Text_2,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 20},
  textHeader: {
    fontSize: Text_Size.Text_2,
  },
  priceTextHeader: {
    fontSize: Text_Size.Text_2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  _textHeader: {
    fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 20 : 22,
    lineHeight: 20,
    marginBottom: 6,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '1%' : SCREEN_WIDTH <= 600 ? '2%' : '3%',
  },
  priceText: {
    fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 20 : 22,
    color: Colors.primary,
  },
  descriptionText: {},
  mapContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '4%' : '5%',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Pricing;
