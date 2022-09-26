import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import {SvgProps} from 'react-native-svg';
import Colors from '../../../../../../../../constants/Colors';

interface Props {
  index: number;
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
interface useActiveIndex {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
}
const PetPricing = ({pricingD, index}: Props) => {
  const [activeIndex, setActiveIndex] = useState<useActiveIndex | any>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [activeIndexTemp, setActiveIndexTemp] = useState(0);
  return (
    <View>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => {
          const c = Object.keys(activeIndex).map(
            item => item === index.toString(),
          );
          const b = c.map(item => ({i: item}));
          var object = b.reduce(
            (obj, item, i) => Object.assign(obj, {[i]: item.i}),
            {},
          );
          setActiveIndex(object);
          setActiveIndexTemp(index);
        }}>
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
      </TouchableOpacity>
      {activeIndexTemp === index && (
        <View style={styles.priceContainer}>
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
      )}
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
    backgroundColor: Colors.secondary,
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
