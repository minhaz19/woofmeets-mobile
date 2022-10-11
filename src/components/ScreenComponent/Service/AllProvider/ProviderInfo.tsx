import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MapMarker, RoundedCheckbox} from '../../../../assets/svgs/SVG_LOGOS';
import ShortIconTitle from '../../../common/ShortIconTitle';
import ShortText from '../../../common/text/ShortText';
import Colors from '../../../../constants/Colors';
import HeaderText from '../../../common/text/HeaderText';
import {AirbnbRating} from 'react-native-ratings';
interface Props {
  name: string;
  rating: number;
  distance: string;
  availablity?: string;
  repeatClient?: string;
}
const ProviderInfo = ({
  name,

  rating,
  distance,
  availablity,
  repeatClient,
}: Props) => {
  return (
    <View style={styles.container}>
      <HeaderText textStyle={styles.title} text={name} />
      <View style={styles.shortInfo}>
        <View>
          <AirbnbRating
            showRating={false}
            count={rating}
            defaultRating={4}
            size={10}
          />
        </View>
        {/* <ShortIconTitle Icon={Star} text={rating} /> */}
        <ShortIconTitle Icon={MapMarker} text={distance} />
      </View>
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
        <View style={styles.repeatContainer}>
          <View style={styles.repeat}>
            <ShortText text={repeatClient} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProviderInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: '100%',
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
    maxWidth: '75%',
  },
  rating: {marginRight: 5},
  repeat: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: Colors.shadow,
  },
  repeatContainer: {
    flexDirection: 'row',
  },
});
