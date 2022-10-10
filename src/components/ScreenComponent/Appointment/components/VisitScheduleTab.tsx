import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppHalfTabs from '../../../common/AppHalfTabs';
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
interface Props {
  serviceId: number;
}
const VisitScheduleTab = ({serviceId}: Props) => {
  const [, setVisitId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  return (
    <View style={styles.container}>
      {serviceId === 4 ? null : (
        <AppHalfTabs
          title="Visit Length"
          data={data}
          //@ts-ignore
          setVisitId={setVisitId}
          name="visit"
        />
      )}
      <AppHalfTabs
        title="Schedule"
        data={schedule}
        //@ts-ignore
        setScheduleId={setScheduleId}
        name="schedule"
      />
      {scheduleId === 1 && <AppDayPicker />}
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
