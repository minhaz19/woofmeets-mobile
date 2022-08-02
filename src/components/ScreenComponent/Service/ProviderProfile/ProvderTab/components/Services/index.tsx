import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Boarding,
  DayLight,
  Dog,
  DropIn,
} from '../../../../../../../assets/svgs/Services_SVG';
import TitleText from '../../../../../../common/text/TitleText';
import ShortText from '../../../../../../common/text/ShortText';
import Text_Size from '../../../../../../../constants/textScaling';
import Colors from '../../../../../../../constants/Colors';
import {useTheme} from '../../../../../../../constants/theme/hooks/useTheme';

const serivesData = [
  {
    petType: [
      {
        Icon: Dog,
        weight: '0-15',
        weightType: 'Pounds',
        id: 0,
      },
      {
        Icon: Dog,
        weight: '16-40',
        weightType: 'Pounds',
        id: 1,
      },
      {
        Icon: Dog,
        weight: '41-100',
        weightType: 'Pounds',
        id: 2,
      },
      {
        Icon: Dog,
        weight: '101+',
        weightType: 'Pounds',
        id: 3,
      },
    ],
    petPricing: [
      {
        Icon: Boarding,
        sittingType: 'Boarding',
        location: 'in the sitters home',
        price: '$31',
        perNight: 'Per night',
        pricingInfo: [
          {
            pricingInfoTitle: 'Holiday Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Dog Rate',
            price: '$57',
            perNight: 'Per night per additional dog',
          },
          {
            pricingInfoTitle: 'Puppy Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Cat Care',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Cat',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Extended Care',
            price: '$57',
            perNight: 'Per night',
          },
        ],
      },
      {
        Icon: DayLight,
        sittingType: 'Doggy Day Care',
        location: 'in the sitters home',
        price: '$31',
        perNight: 'Per night',
        pricingInfo: [
          {
            pricingInfoTitle: 'Holiday Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Dog Rate',
            price: '$57',
            perNight: 'Per night per additional dog',
          },
          {
            pricingInfoTitle: 'Puppy Rate',
            price: '$57',
            perNight: 'Per night',
          },
        ],
      },
    ],
  },
  {
    petType: [
      {
        Icon: Dog,
        weight: '0-15',
        weightType: 'Pounds',
        id: 4,
      },
      {
        Icon: Dog,
        weight: '16-40',
        weightType: 'Pounds',
        id: 5,
      },
      {
        Icon: Dog,
        weight: '41-100',
        weightType: 'Pounds',
        id: 6,
      },
      {
        Icon: Dog,
        weight: '101+',
        weightType: 'Pounds',
        id: 7,
      },
    ],
    petPricing: [
      {
        Icon: DropIn,
        sittingType: 'Boarding',
        location: 'in the sitters home',
        price: '$31',
        perNight: 'Per night',
        pricingInfo: [
          {
            pricingInfoTitle: '60 minite rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Holiday Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Puppy Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Cat Care',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Cat',
            price: '$57',
            perNight: 'Per night',
          },
        ],
      },
    ],
  },
];
const Services = () => {
  const [activeDog, setActiveDog] = useState(0);
  const {isDarkMode} = useTheme();
  return (
    <View style={styles.container}>
      {serivesData.map((d, index) => (
        <View key={index}>
          <View style={styles.petTypeContainer}>
            {d.petType.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.petTypeTextContainer}
                onPress={() => setActiveDog(item.id)}>
                <item.Icon
                  fill={
                    item.id === activeDog
                      ? Colors.primary
                      : isDarkMode
                      ? Colors.background
                      : Colors.black
                  }
                />
                <ShortText textStyle={styles.weight} text={item.weight} />
                <ShortText text={item.weightType} />
              </TouchableOpacity>
            ))}
          </View>

          <View>
            {d.petPricing.map((pricingD, inde) => (
              <View key={inde}>
                <View style={styles.titleContainer}>
                  <pricingD.Icon fill="black" style={styles.icon} />
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
                      text={pricingD.price}
                    />
                    <ShortText text={pricingD.perNight} />
                  </View>
                </View>
                <View>
                  {pricingD.pricingInfo.map((pInfo, indexx) => (
                    <View style={styles.pInfoContainer} key={indexx}>
                      <TitleText
                        textStyle={styles.pInfoTitle}
                        text={pInfo.pricingInfoTitle}
                      />
                      <View>
                        <TitleText
                          textStyle={styles.pInfoPrice}
                          text={pInfo.price}
                        />
                        <ShortText text={pInfo.perNight} />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {},
  weight: {
    fontSize: Text_Size.Text_0,
    fontWeight: '600',
    color: 'black',
  },
  petTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
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
  petTypeTextContainer: {marginVertical: 20, alignItems: 'center'},
  pInfoTitle: {
    flex: 1,
  },
  pInfoPrice: {
    textAlign: 'right',
  },
});
