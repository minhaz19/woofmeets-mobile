import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import {
  LeftArrow,
  RightArrow,
} from '../../../components/ScreenComponent/Inbox/utils/SvgComponent/SvgComponent';
import ShortText from '../../../components/common/text/ShortText';
import IconTwoText from '../../../components/ScreenComponent/activity/IconTwoText';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import ModifyCalendar from '../../../components/ScreenComponent/activity/ModifyCalendar';
import TimeRange from '../../../components/ScreenComponent/activity/TimeRange';

const EditDetails = () => {
  const {colors} = useTheme();
  const [fromTime, setFromTime] = useState({
    startTime: '',
    endTime: '',
  });
  const [toTime, setToTime] = useState({
    startTime: '',
    endTime: '',
  });
  // const [from, setFrom] = useState(null);
  // const [to, setTo] = useState(null);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <BigText text="Edit Schedule" />
      <ModifyCalendar icon={<RightArrow />} title="Drop-off Dates" />
      <TimeRange
        icon={<RightArrow />}
        title="Drop-off range"
        time={fromTime}
        setTime={setFromTime}
      />
      <ModifyCalendar icon={<LeftArrow />} title="Pick-up Dates" />
      <TimeRange
        icon={<LeftArrow />}
        title="Drop-off range"
        time={toTime}
        setTime={setToTime}
      />
      <View style={styles.boxContainer}>
        <View style={styles.boxTextContainer}>
          <ShortText textStyle={{color: Colors.alter}} text={'Get $20'} />
          <ShortText text={' when friends join Woofmeets'} />
        </View>
        <ShortText text={'Share Now'} />
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <BigText text="Contact" />
      <IconTwoText
        icon={<RightArrow />}
        title="Phone Number"
        description="2:00 PM - 3:00 PM"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 20,
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginTop: SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '2%',
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  textContainer: {
    paddingLeft: '2%',
  },
  boxContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '3%' : '0%',
    borderWidth: 1,
    borderColor: Colors.subText,
    padding: '2%',
  },
  boxTextContainer: {
    flexDirection: 'row',
    paddingBottom: '0.8%',
  },
});

export default EditDetails;
