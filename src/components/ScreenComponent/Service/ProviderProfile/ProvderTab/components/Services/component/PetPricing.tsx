import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import {SvgProps} from 'react-native-svg';
import Colors from '../../../../../../../../constants/Colors';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';

interface Props {
  onPress: () => void;
  showRate: boolean;
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

const PetPricing = ({pricingD, showRate, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <View>
      <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
        <pricingD.Icon width={25} height={25} style={styles.icon} />
        <View style={styles.sittingType}>
          <TitleText
            textStyle={styles.sittingTypeTitle}
            text={pricingD.sittingType}
          />
          <ShortText
            text={pricingD.sittingType}
            textStyle={{color: Colors.text}}
          />
        </View>
        <View>
          <TitleText
            textStyle={styles.pricingDPrice}
            text={`$${pricingD.price}`}
          />
          <ShortText
            text={pricingD.perNight}
            textStyle={{color: Colors.text}}
          />
        </View>
      </TouchableOpacity>
      {showRate ? (
        <View
          style={[
            styles.priceContainer,
            {backgroundColor: colors.lightBackgroundColor},
          ]}>
          {pricingD?.pricingInfo ? (
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
            )
          ) : (
            <TitleText
              textStyle={styles.pInfoTitle}
              text={'No pricing info found'}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export default PetPricing;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  priceContainer: {
    paddingHorizontal: 10,
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
    alignSelf: 'center',
    paddingVertical: 10,
  },
  pInfoPrice: {
    textAlign: 'right',
  },
});
