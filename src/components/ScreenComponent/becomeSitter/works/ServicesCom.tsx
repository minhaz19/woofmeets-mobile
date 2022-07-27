import {StyleSheet, View, SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import Screen from '../../../common/Screen';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ReusableSelectService from '../../Service/ReusableSelectService';
import {
  BriefCaseSvg,
  LocationSvg,
  HomeSvgICon,
  WeatherSvg,
  PetFootSvg,
} from '../../../../assets/SVG_LOGOS';

const selectData = [
  {
    id: 1,
    name: 'Boarding',
    image: <BriefCaseSvg />,
    description:
      "Care for a dog or cat overnight in your home. Sitters who offer boarding can make up to 2x more than sitters who don't.",
  },
  {
    id: 2,
    name: 'Dog Waking',
    image: <PetFootSvg fill={'#FFA557'} />,
    description: 'Pick up dog walks that fit your schedule.',
  },
  {
    id: 3,
    name: 'Doggy Day Care',
    image: <WeatherSvg />,
    description: 'Ideal for work-from-home dog lovers.',
  },
  {
    id: 4,
    name: 'Drop-in Visits',
    image: <LocationSvg />,
    description: 'visits in your home',
  },
  {
    id: 5,
    name: 'House Sitting',
    image: <HomeSvgICon />,
    description: 'Stay with or check up on pets in their own homes.',
  },
];

interface Props {
  item: any;
}

const ServicesCom = () => {
  const {colors} = useTheme();
  const RenderItem: FC<Props> = ({item}) => (
    <ReusableSelectService data={item} noShadow />
  );
  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <SafeAreaView>
        <View style={styles.header}>
          {selectData.map(item => {
            return <RenderItem key={item.id} item={item} />;
          })}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default ServicesCom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
  },
});
