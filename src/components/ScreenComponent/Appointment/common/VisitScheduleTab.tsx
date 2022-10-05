import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppHalfTabs from '../../../common/AppHalfTabs';
import BottomSheetCalendar from '../../../common/BottomSheetCalendar';
import {Calendar, ClockSvg, Repeat} from '../../../../assets/svgs/SVG_LOGOS';
import AppDayPicker from '../../../common/AppDayPicker';
const data = [
  {
    id: 1,
    title: '30 Minites',
    Icon: <ClockSvg width={20} height={20} fill={'black'} />,
  },
  {
    id: 2,
    title: '60 Minites',
    Icon: <ClockSvg width={20} height={20} fill={'black'} />,
  },
];
const schedule = [
  {
    id: 1,
    title: 'Specific Dates',
    Icon: <Calendar width={20} height={20} fill={'black'} />,
  },
  {
    id: 2,
    title: 'Repeat weekly',
    Icon: <Repeat width={30} height={30} fill={'black'} />,
  },
];
const VisitScheduleTab = () => {
  return (
    <View style={styles.container}>
      <AppHalfTabs title="Visit Length" data={data} />
      <AppHalfTabs title="Schedule" data={schedule} />
      <AppDayPicker />
      <BottomSheetCalendar />
    </View>
  );
};

export default VisitScheduleTab;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
