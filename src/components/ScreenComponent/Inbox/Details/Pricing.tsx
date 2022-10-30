/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useAppSelector} from '../../../../store/store';
import changeTextLetter from '../../../common/changeTextLetter';

const Pricing = () => {
  const {colors} = useTheme();
  const {proposalPricing} = useAppSelector(state => state.proposalPricing);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  return (
    <View>
      <HeaderText text={'Charges & Services'} textStyle={styles._textHeader} />
      {proposalPricing?.petsRates?.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.mapContainer}>
            <View style={styles.flexContainer}>
              <HeaderText
                text={changeTextLetter(item.name)}
                textStyle={styles.priceTextHeader}
              />
              <HeaderText
                text={`$${item.count * item?.rate.amount}`}
                textStyle={styles.priceText}
              />
            </View>

            <HeaderText
              text={`Applied ${item?.rate.name}`}
              textStyle={{fontWeight: '500'}}
            />

            <DescriptionText
              text={`${item.count} ${
                proposedServiceInfo.serviceTypeId === 1 ||
                proposedServiceInfo.serviceTypeId === 2
                  ? ' night'
                  : proposedServiceInfo.serviceTypeId === 3
                  ? ' walk'
                  : proposedServiceInfo.serviceTypeId === 4
                  ? ' day'
                  : proposedServiceInfo.serviceTypeId === 5
                  ? ' visit'
                  : ''
              } @ $${item?.rate.amount} /${
                proposedServiceInfo.serviceTypeId === 1 ||
                proposedServiceInfo.serviceTypeId === 2
                  ? ' night'
                  : proposedServiceInfo.serviceTypeId === 3
                  ? ' walk'
                  : proposedServiceInfo.serviceTypeId === 4
                  ? ' day'
                  : proposedServiceInfo.serviceTypeId === 5
                  ? ' visit'
                  : ''
              }`}
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
          text={'Total Pricing: '}
          textStyle={{
            color: colors.descriptionText,
            fontWeight: '400',
            fontSize: Text_Size.Text_2,
          }}
        />
        <HeaderText
          text={proposalPricing?.subTotal}
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
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '1%' : '3%',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Pricing;
