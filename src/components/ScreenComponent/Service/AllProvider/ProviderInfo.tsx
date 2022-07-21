import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import {MapMarker, RoundedCheckbox, Star} from '../../../../assets/SVG_LOGOS';
import ShortIconTitle from '../../../common/ShortIconTitle';
import ShortText from '../../../common/text/ShortText';
import Colors from '../../../../constants/Colors';
interface Props {
  name: string;
  nature: string;
  rating: number;
  distance: string;
  availablity: string;
  repeatClient: string;
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
      <TitleText textStyle={styles.title} text={name} />
      <View style={styles.shortInfo}>
        <ShortIconTitle Icon={Star} text={rating} />
        <ShortIconTitle Icon={MapMarker} text={distance} />
      </View>
      <ShortText text={nature} />
      <View style={styles.availableTime}>
        <ShortIconTitle
          Icon={RoundedCheckbox}
          text={availablity}
          color={Colors.green}
        />
      </View>
      <View style={styles.repeat}>
        <ShortText text={repeatClient} />
      </View>
    </View>
  );
};

export default ProviderInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: '600',
  },
  shortInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  availableTime: {
    marginVertical: 5,
  },
  repeat: {
    padding: 3,
    backgroundColor: Colors.shadow,
    width: '50%',
    justifyContent: 'center',
  },
});
