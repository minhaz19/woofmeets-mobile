import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MapMarker, RoundedCheckbox} from '../../../../assets/svgs/SVG_LOGOS';
import ShortIconTitle from '../../../common/ShortIconTitle';
import Colors from '../../../../constants/Colors';
import HeaderText from '../../../common/text/HeaderText';
import {AirbnbRating} from 'react-native-ratings';
import ShortText from '../../../common/text/ShortText';
interface Props {
  user: any;
  rating: number | null;
  distance: any;
  availability?: any;
  nature: string;
  headline?: any;
  expYears?: any;
  repeatClient?: any;
}
const ProviderInfo = ({
  user,
  rating,
  distance,
  availability,
  headline,
  expYears,
  repeatClient,
}: Props) => {
  function getMonthAndDat(date: string | number | Date) {
    const dateStr = new Date(date).toDateString();
    if (dateStr) {
      const dateStrArr = dateStr?.split(' ');
      return dateStrArr;
    }
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
      {headline ? (
        <ShortText
          text={headline}
          ellipsizeMode="tail"
          numberOfLines={1}
          textStyle={styles.shortText}
        />
      ) : null}
      <View style={styles.shortInfo}>
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
      {repeatClient ? (
        <View style={styles.repeatContainer}>
          <View style={styles.repeat}>
            <ShortText text={repeatClient} />
          </View>
          {rating ? (
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={rating}
              size={10}
              isDisabled
            />
          ) : null}
        </View>
      ) : expYears ? (
        <ShortText
          text={expYears + ' years of experience'}
          textStyle={styles.shortText}
        />
      ) : null}
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
    paddingTop: 4,
    width: '60%',
  },
  availableTime: {
    paddingTop: 4,
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
    paddingTop: 4,
  },
  shortText: {
    maxWidth: '70%',
    paddingTop: 4,
  },
});
