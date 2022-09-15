import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import {SvgProps} from 'react-native-svg';

interface Props {
  pricingD: {
    Icon: (props: SvgProps) => JSX.Element;
    sittingType: string;
    perNight: string;
    price: string;
    location?: string;
    pricingInfo: [
      {
        perNight: string;
        price: string;
        pricingInfoTitle: string;
      },
    ];
  };
}

const PetPricing = ({pricingD}: Props) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <pricingD.Icon width={25} height={25} style={styles.icon} />
        <View style={styles.sittingType}>
          <TitleText
            textStyle={styles.sittingTypeTitle}
            text={pricingD.sittingType}
          />
          <ShortText text={pricingD.sittingType} />
        </View>
        <View>
          <TitleText
            textStyle={styles.pricingDPrice}
            text={`$${pricingD.price}`}
          />
          <ShortText text={pricingD.perNight} />
        </View>
      </View>
      <View>
        {pricingD?.pricingInfo &&
          pricingD?.pricingInfo.map(
            (pInfo, indexx) =>
              //@ts-ignore
              pInfo !== '' && (
                <View style={styles.pInfoContainer} key={indexx}>
                  <TitleText
                    textStyle={styles.pInfoTitle}
                    text={pInfo.pricingInfoTitle}
                  />
                  <View>
                    <TitleText
                      textStyle={styles.pInfoPrice}
                      text={`$${pInfo.price}`}
                    />
                    <ShortText text={pInfo.perNight} />
                  </View>
                </View>
              ),
          )}
      </View>
    </View>
  );
};

export default PetPricing;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  sittingType: {
    flex: 1,
  },
  pricingDPrice: {
    textAlign: 'right',
  },
  sittingTypeTitle: {
    fontWeight: 'bold',
  },
  pInfoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  pInfoTitle: {
    flex: 1,
  },
  pInfoPrice: {
    textAlign: 'right',
  },
});
