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
import ShortText from '../../../common/text/ShortText';
import TitleText from '../../../common/text/TitleText';
import changeTextLetter from '../../../common/changeTextLetter';
import {useNavigation} from '@react-navigation/native';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
interface Props {
  screen: string;
  setIsDetailsModal?: (arg: any) => void;
}
const Pricing = ({setIsDetailsModal}: Props) => {
  const {colors} = useTheme();
  const {user} = useAppSelector(state => state.whoAmI);
  const navigation = useNavigation<any>();
  // const {loading} = useAppSelector(
  //   state => state.proposalPricing,
  // );
  const {
    proposedServiceInfo,
    stableProposalPrcing,
    loading: sLoading,
  } = useAppSelector(state => state.proposal);

  const getCurrency = () => {
    return proposedServiceInfo?.currency === null ||
      proposedServiceInfo?.currency === 'usd'
      ? '$'
      : 'C$';
  };
  return (
    <>
      {sLoading ? (
        <View style={{marginVertical: '50%'}}>
          <TitleText
            text="Loading..."
            textStyle={{
              fontSize: Text_Size.Text_1,
              fontWeight: 'bold',
              color: Colors.primary,
              textAlign: 'center',
            }}
          />
        </View>
      ) : typeof stableProposalPrcing === 'string' &&
        stableProposalPrcing?.includes('Invalid Request!') ? (
        <TitleText
          text={`${stableProposalPrcing}. Please modify appointment request`}
          textStyle={styles._textHeader}
        />
      ) : (
        <View>
          <HeaderText
            text={'Charges & Services'}
            textStyle={styles._textHeader}
          />

          {stableProposalPrcing === null ||
          stableProposalPrcing === undefined ? (
            <>
              <View>
                <TitleText
                  textStyle={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: '25%',
                    color: Colors.alert,
                    // justifyContent: 'space-between',
                  }}
                  text={
                    'There is no valid charges and service fee details found for this particular appoinment'
                  }
                />
              </View>
            </>
          ) : (
            <>
              {stableProposalPrcing?.petsRates?.map(
                (item: any, index: number) => {
                  return (
                    <View key={index} style={[styles.mapContainer]}>
                      <View style={styles.flexContainer}>
                        <AppTouchableOpacity
                          onPress={() => {
                            setIsDetailsModal && setIsDetailsModal(false);
                            navigation.navigate('SeePetReview', {
                              petId: item?.id,
                              petInfo: proposedServiceInfo.petsInfo,
                            });
                          }}
                          style={{width: '70%'}}>
                          <HeaderText
                            text={changeTextLetter(item.name)}
                            textStyle={{
                              ...styles.priceTextHeader,
                              textDecorationLine: 'underline',
                              color: Colors.primaryDif,
                            }}
                          />
                        </AppTouchableOpacity>
                        <HeaderText
                          text={`${getCurrency()}${Number(
                            item?.count * item?.rate?.amount,
                          )?.toFixed(2)}`}
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
                            ? ' visit'
                            : proposedServiceInfo.serviceTypeId === 4
                            ? ' day'
                            : proposedServiceInfo.serviceTypeId === 5
                            ? ' walk'
                            : ''
                        } @ ${getCurrency()}${Number(
                          item?.rate?.amount,
                        )?.toFixed(2)} /${
                          proposedServiceInfo.serviceTypeId === 1 ||
                          proposedServiceInfo.serviceTypeId === 2
                            ? ' night'
                            : proposedServiceInfo.serviceTypeId === 3
                            ? ' visit'
                            : proposedServiceInfo.serviceTypeId === 4
                            ? ' day'
                            : proposedServiceInfo.serviceTypeId === 5
                            ? ' walk'
                            : ''
                        }`}
                        textStyle={{
                          color: colors.descriptionText,
                          lineHeight: 20,
                        }}
                      />
                    </View>
                  );
                },
              )}

              {stableProposalPrcing?.sixtyMinutesRate?.rate?.name !==
                undefined &&
                stableProposalPrcing?.sixtyMinutesRate?.rate?.name !== '' && (
                  <View style={[styles.mapContainer]}>
                    <View style={styles.flexContainer}>
                      <HeaderText
                        text={changeTextLetter(
                          stableProposalPrcing?.sixtyMinutesRate?.rate.name,
                        )}
                        textStyle={styles.priceTextHeader}
                      />
                      <HeaderText
                        text={`${getCurrency()}${Number(
                          stableProposalPrcing?.sixtyMinutesRate?.count *
                            stableProposalPrcing?.sixtyMinutesRate?.rate
                              ?.amount,
                        )?.toFixed(2)}`}
                        textStyle={styles.priceText}
                      />
                    </View>

                    <ShortText
                      text={`Applied ${stableProposalPrcing?.sixtyMinutesRate.rate.name}`}
                      textStyle={{fontWeight: 'bold'}}
                    />

                    <DescriptionText
                      text={`${
                        stableProposalPrcing?.sixtyMinutesRate.count
                      } visit @ ${getCurrency()}${Number(
                        stableProposalPrcing?.sixtyMinutesRate?.rate?.amount,
                      )?.toFixed(2)} / visit`}
                      textStyle={{
                        color: colors.descriptionText,
                        lineHeight: 20,
                      }}
                    />
                  </View>
                )}
              <View
                style={[
                  styles.divider,
                  {backgroundColor: colors.descriptionText},
                ]}
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
                    text={`${getCurrency()}${stableProposalPrcing?.subTotal}`}
                    textStyle={{
                      fontSize: Text_Size.Text_2,
                    }}
                  />
                ) : (
                  <HeaderText
                    text={`${getCurrency()}${
                      stableProposalPrcing?.providerFee?.providerTotal
                    }`}
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
                        text={` ( + ) ${
                          stableProposalPrcing?.serviceChargeInParcentage
                        }% of ${getCurrency()}${
                          stableProposalPrcing?.subTotal
                        }`}
                      />
                    </>
                  ) : (
                    <ShortText
                      text={` ( - ) ${
                        stableProposalPrcing?.providerFee
                          ?.subscriptionFeeInParcentage
                      }% of ${getCurrency()}${
                        stableProposalPrcing?.providerFee?.providerTotal
                      }`}
                    />
                  )}
                </View>
                {user?.id === proposedServiceInfo?.userId ? (
                  <HeaderText
                    text={`${getCurrency()}${(
                      stableProposalPrcing?.total -
                      stableProposalPrcing?.subTotal
                    )?.toFixed(2)}`}
                    textStyle={{
                      fontSize: Text_Size.Text_2,
                    }}
                  />
                ) : (
                  <HeaderText
                    text={`${getCurrency()}${stableProposalPrcing?.providerFee?.subscriptionFee?.toFixed(
                      2,
                    )}`}
                    textStyle={{
                      fontSize: Text_Size.Text_2,
                    }}
                  />
                )}
              </View>
              <View
                style={[
                  styles.divider,
                  {backgroundColor: colors.descriptionText},
                ]}
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
                    text={`${getCurrency()}${stableProposalPrcing?.total}`}
                    textStyle={{
                      fontSize: Text_Size.Text_2,
                    }}
                  />
                ) : (
                  <HeaderText
                    text={`${getCurrency()}${
                      stableProposalPrcing?.providerFee?.providerTotal
                    }`}
                    textStyle={{
                      fontSize: Text_Size.Text_2,
                    }}
                  />
                )}
              </View>
            </>
          )}
        </View>
      )}
    </>
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
    // width: '100%',
    flex: 0,
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
    // width: '100%',
    // flex: 0,
    // backgroundColor: 'red',
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
