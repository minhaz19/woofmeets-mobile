import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Boarding from './Boarding/Boarding';
import DogWalking from './DogWalking/DogWalking';
import DoggyDayCare from './DoggyDayCare/DoggyDayCare';
import HouseSitting from './HouseSitting/HouseSitting';
import DropInVisits from './DropInVisits/DropInVisits';
import HeaderWithBack from '../../common/header/HeaderWithBack';
import {useNavigation} from '@react-navigation/native';

interface Props {
  route: {params: {itemId: number}};
}

const ServiceDetails: FC<Props> = props => {
  let navigation = useNavigation();
  const itemId = props.route.params.itemId;
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <HeaderWithBack
        navigation={navigation}
        title={
          itemId === 1
            ? 'Boarding'
            : itemId === 2
            ? 'Dog Walking'
            : itemId === 3
            ? 'Doggy Day Care'
            : itemId === 4
            ? 'Drop in Visits'
            : 'House Sitting'
        }
        icon
      />
      {itemId === 1 && <Boarding />}
      {itemId === 2 && <DogWalking />}
      {itemId === 3 && <DoggyDayCare />}
      {itemId === 4 && <DropInVisits />}
      {itemId === 5 && <HouseSitting />}
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {flex: 1},
});
