import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppHalfTabs from '../../../common/AppHalfTabs';
import {Calendar, ClockSvg, Repeat} from '../../../../assets/svgs/SVG_LOGOS';
import AppDayPicker from '../../../common/AppDayPicker';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
// import BottomSheetCalendar from '../../../common/BottomSheetCalendar';
interface Props {
  serviceId: number;
}
const VisitScheduleTab = ({serviceId}: Props) => {
  const [, setVisitId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const {colors} = useTheme();
  const data = [
    {
      id: 1,
      title: '30 Minites',
      Icon: <ClockSvg width={20} height={20} fill={colors.headerText} />,
      value: 30,
    },
    {
      id: 2,
      title: '60 Minites',
      Icon: <ClockSvg width={20} height={20} fill={colors.headerText} />,
      value: 60,
    },
  ];
  const schedule = [
    {
      id: 1,
      title: 'Specific Dates',
      Icon: <Calendar width={20} height={20} fill={colors.headerText} />,
      value: false,
    },
    {
      id: 2,
      title: 'Repeat weekly',
      Icon: <Repeat width={30} height={30} fill={colors.headerText} />,
      value: true,
    },
  ];
  return (
    <View style={styles.container}>
      {serviceId === 4 ? null : (
        <AppHalfTabs
          title="Visit Length"
          data={data}
          //@ts-ignore
          setVisitId={setVisitId}
          name="visitLength"
        />
      )}
      <AppHalfTabs
        title="Schedule"
        data={schedule}
        //@ts-ignore
        setScheduleId={setScheduleId}
        name="isRecurring"
      />
      {scheduleId === 1 && <AppDayPicker />}
      {/* <BottomSheetCalendar title={scheduleId === 0 ? 'Dates' : 'Start Date'} /> */}
    </View>
  );
};

export default VisitScheduleTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
});
