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
import ShortText from '../../../common/text/ShortText';
interface Props {
  screen: string;
}
const Pricing = ({screen}: Props) => {
  const {colors} = useTheme();
  const {user} = useAppSelector(state => state.whoAmI);
  const {proposalPricing} = useAppSelector(state => state.proposalPricing);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  console.log('proposalPricing', proposalPricing, proposedServiceInfo);
  return (
    <View>
      <HeaderText text={'Charges & Services'} textStyle={styles._textHeader} />
      {proposalPricing?.petsRates?.map((item: any, index: number) => {
        return (
          <View key={index} style={[styles.mapContainer]}>
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

            <ShortText
              text={`Applied ${item?.rate.name}`}
              textStyle={{fontWeight: 'bold'}}
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
      {proposalPricing?.sixtyMinutesRate?.count && (
        <View style={[styles.mapContainer]}>
          <View style={styles.flexContainer}>
            <HeaderText
              text={changeTextLetter(
                proposalPricing?.sixtyMinutesRate?.rate.name,
              )}
              textStyle={styles.priceTextHeader}
            />
            <HeaderText
              text={`$${
                proposalPricing?.sixtyMinutesRate?.count *
                proposalPricing?.sixtyMinutesRate?.rate.amount
              }`}
              textStyle={styles.priceText}
            />
          </View>

          <ShortText
            text={`Applied ${proposalPricing?.sixtyMinutesRate.rate.name}`}
            textStyle={{fontWeight: 'bold'}}
          />

          <DescriptionText
            text={`${proposalPricing?.sixtyMinutesRate.count} visit @ $${proposalPricing?.sixtyMinutesRate.rate.amount} / visit`}
            textStyle={{color: colors.descriptionText, lineHeight: 20}}
          />
        </View>
      )}
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <View style={styles.totalContainer}>
        <HeaderText
          text={'Subtotal: '}
          textStyle={{
            color: colors.headerText,
            fontWeight: 'bold',
            fontSize: Text_Size.Text_2,
            marginBottom: 10,
            marginLeft: 0,
          }}
        />
        {user?.id === proposedServiceInfo?.userId ? (
          <HeaderText
            text={`$${proposalPricing?.subTotal}`}
            textStyle={{
              fontSize: Text_Size.Text_2,
            }}
          />
        ) : (
          <HeaderText
            text={`$${proposalPricing?.providerFee?.providerTotal}`}
            textStyle={{
              fontSize: Text_Size.Text_2,
            }}
          />
        )}
      </View>
      <View style={[styles.totalContainer]}>
        <View>
          <HeaderText
            text={'Platform charge: '}
            textStyle={{
              color: colors.headerText,
              fontWeight: 'bold',
              fontSize: Text_Size.Text_2,
              marginLeft: 0,
            }}
          />
          {user?.id === proposedServiceInfo?.userId ? (
            <>
              <ShortText
                text={` ( + ) ${proposalPricing?.serviceChargeInParcentage}% of $${proposalPricing?.subTotal}`}
              />
            </>
          ) : (
            <ShortText
              text={` ( - ) ${proposalPricing?.providerFee?.subscriptionFeeInParcentage}% of $${proposalPricing?.providerFee?.providerTotal}`}
            />
          )}
        </View>
        {user?.id === proposedServiceInfo?.userId ? (
          <HeaderText
            text={`$${(
              proposalPricing?.total - proposalPricing?.subTotal
            ).toFixed(2)}`}
            textStyle={{
              fontSize: Text_Size.Text_2,
            }}
          />
        ) : (
          <HeaderText
            text={`$${proposalPricing?.providerFee?.subscriptionFee?.toFixed(
              2,
            )}`}
            textStyle={{
              fontSize: Text_Size.Text_2,
            }}
          />
        )}
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <View style={styles.totalContainer}>
        <HeaderText
          text={'Total Amount: '}
          textStyle={{
            color: colors.headerText,
            fontWeight: 'bold',
            fontSize: Text_Size.Text_2,
            marginLeft: 0,
          }}
        />
        {user?.id === proposedServiceInfo?.userId ? (
          <HeaderText
            text={`$${proposalPricing?.total}`}
            textStyle={{
              fontSize: Text_Size.Text_2,
            }}
          />
        ) : (
          <HeaderText
            text={`$${proposalPricing?.providerFee?.providerTotal}`}
            textStyle={{
              fontSize: Text_Size.Text_2,
            }}
          />
        )}
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
    justifyContent: 'space-between',
  },
});

export default Pricing;
