/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../common/text/TitleText';
import Text_Size from '../../../../../../constants/textScaling';
import Colors from '../../../../../../constants/Colors';
import ShortText from '../../../../../common/text/ShortText';
import changeTextLetter from '../../../../../common/changeTextLetter';
import {useProposalPricing} from './utils/useProposalPricing';

const ProposalPricing = () => {
  const {pricingInfo, proposedServiceInfo} = useProposalPricing();
  return (
    <View>
      <TitleText text={'Pricing Summary'} textStyle={styles.titleText} />

      <View style={styles.priceContainer}>
        {pricingInfo?.map((item: any) => (
          <>
            {item.name === 'subTotal' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderTopWidth: 2,
                  borderTopColor: Colors.border,
                  paddingTop: 10,
                }}>
                <View>
                  <TitleText
                    text={'New Subtotal'}
                    textStyle={{fontWeight: 'bold'}}
                  />
                </View>
                <View>
                  <TitleText textStyle={{}} text={`$${item.subTotal}`} />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <View>
                  <TitleText
                    text={changeTextLetter(item?.name)}
                    textStyle={{fontWeight: 'bold'}}
                  />
                  <ShortText text={`( Applied ${item.rate.name} )`} />
                  <ShortText
                    text={`$${item?.rate?.amount} X ${item?.count} ${
                      proposedServiceInfo.serviceTypeId === 1 ||
                      proposedServiceInfo.serviceTypeId === 2
                        ? 'per night'
                        : proposedServiceInfo.serviceTypeId === 3
                        ? 'per walk'
                        : proposedServiceInfo.serviceTypeId === 4
                        ? 'per day'
                        : proposedServiceInfo.serviceTypeId === 5
                        ? 'per visit'
                        : ''
                    }`}
                  />
                </View>
                <View>
                  <TitleText
                    textStyle={{}}
                    text={`$${item?.rate?.amount * item?.count}`}
                  />
                </View>
              </View>
            )}
          </>
        ))}
      </View>
    </View>
  );
};

export default ProposalPricing;

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
  },
  priceContainer: {
    marginVertical: 20,
    backgroundColor: Colors.iosBG,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: Colors.border,
  },
});
