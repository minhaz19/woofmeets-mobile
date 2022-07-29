import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MapMarker, RoundedCheckbox} from '../../../../assets/svgs/SVG_LOGOS';
import ShortIconTitle from '../../../common/ShortIconTitle';
import ShortText from '../../../common/text/ShortText';
import Colors from '../../../../constants/Colors';
import HeaderText from '../../../common/text/HeaderText';
import {Rating} from 'react-native-ratings';
interface Props {
  name: string;
  nature: string;
  rating: number;
  distance: string;
  availablity?: string;
  repeatClient?: string;
}
const ProviderInfo = ({
  name,
  nature,
  rating,
  distance,
  availablity,
  repeatClient,
}: Props) => {
  return (
    <View style={styles.container}>
      <HeaderText textStyle={styles.title} text={name} />
      <View style={styles.shortInfo}>
        <Rating
          type="star"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={rating}
          imageSize={10}
          style={styles.rating}
        />
        {/* <ShortIconTitle Icon={Star} text={rating} /> */}
        <ShortIconTitle Icon={MapMarker} text={distance} />
      </View>
      <ShortText text={nature} />
      {availablity && (
        <View style={styles.availableTime}>
          <ShortIconTitle
            Icon={RoundedCheckbox}
            text={availablity}
            color={Colors.green}
          />
        </View>
      )}
      {repeatClient && (
        <View style={styles.repeat}>
          <ShortText text={repeatClient} />
        </View>
      )}
    </View>
  );
};

export default ProviderInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontWeight: '600',
    width: '60%',
  },
  shortInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '60%',
  },
  availableTime: {
    marginVertical: 5,
  },
  rating: {marginRight: 5},
  repeat: {
    padding: 3,
    backgroundColor: Colors.shadow,
    width: '50%',
    justifyContent: 'center',
  },
});
