import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MapMarker, RoundedCheckbox} from '../../../../assets/svgs/SVG_LOGOS';
import ShortIconTitle from '../../../common/ShortIconTitle';
import ShortText from '../../../common/text/ShortText';
import Colors from '../../../../constants/Colors';
import HeaderText from '../../../common/text/HeaderText';
import {AirbnbRating} from 'react-native-ratings';
interface Props {
  user: any;
  rating: number;
  distance: any;
  availability?: any;
  repeatClient?: string;
  nature: string;
}
const ProviderInfo = ({
  user,
  rating,
  distance,
  availability,
}: // repeatClient,
Props) => {
  function getMonthAndDat(date: string | number | Date) {
    const dateStr = new Date(date).toDateString();
    const dateStrArr = dateStr.split(' ');
    return dateStrArr;
  }
  const startDate = getMonthAndDat(
    new Date(availability && availability.dates[0]),
  );
  const endDate = getMonthAndDat(
    new Date(availability && availability.dates.slice(-1)),
  );

  return (
    <View style={styles.container}>
      <HeaderText
        textStyle={styles.title}
        text={`${user.firstName} ${user.lastName}`}
      />
      <View style={styles.shortInfo}>
        <View>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={rating}
            size={10}
            isDisabled
          />
        </View>
        <ShortIconTitle
          Icon={MapMarker}
          text={`${distance?.distance.toFixed(2)} ${distance?.unit}`}
        />
      </View>
      {availability && (
        <View style={styles.availableTime}>
          <ShortIconTitle
            Icon={RoundedCheckbox}
            text={`Availability: ${startDate[1]} ${startDate[2]} - ${endDate[1]} ${endDate[2]} `}
            color={Colors.green}
          />
        </View>
      )}
      {/* {repeatClient && (
        <View style={styles.repeatContainer}>
          <View style={styles.repeat}>
            <ShortText text={repeatClient} />
          </View>
        </View>
      )} */}
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
