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
  const formattedDistance =
    user?.basicInfo?.country?.name === 'USA'
      ? distance?.distance
      : distance?.distance * 1.60934;
  const text = `${user.firstName} ${user.lastName}`;
  return (
    <View style={styles.container}>
      <HeaderText
        textStyle={styles.title}
        text={text.length > 20 ? text.slice(0, 20) + '...' : text}
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
          text={`${formattedDistance.toFixed(2)} ${
            user?.basicInfo?.country?.name === 'USA' ? 'mi' : 'km'
          }`}
        />
      </View>
      {availability?.dates?.length > 0 && (
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
      ) : (
        <ShortText
          text={
            expYears === null || expYears === undefined
              ? 0 + ' years of experience'
              : expYears + ' years of experience'
          }
          textStyle={styles.shortText}
        />
      )}
    </View>
  );
};

export default ProviderInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
  },
  title: {
    fontWeight: '600',
    // width: '60%',
  },
  shortInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    width: '60%',
  },
  availableTime: {
    paddingTop: 4,
    // maxWidth: '75%',
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
    maxWidth: '65%',
    paddingTop: 4,
  },
});
