import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BottomSheetCalendar from '../../../../../common/BottomSheetCalendar';
import {useFormContext} from 'react-hook-form';
import {useTheme} from '../../../../../../constants/theme/hooks/useTheme';
import {
  Calendar,
  ClockSvg,
  Repeat,
} from '../../../../../../assets/svgs/SVG_LOGOS';
import AppHalfTabs from '../../../../../common/AppHalfTabs';
import AppDayPicker from '../../../../../common/AppDayPicker';
import TitleText from '../../../../../common/text/TitleText';
import Text_Size from '../../../../../../constants/textScaling';
import DayTimeSlot from '../../../../Appointment/components/DayTimeSlot';

const DropInVisitWalking = () => {
  const [, setVisitId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const {colors} = useTheme();
  const {setValue, watch} = useFormContext();
  const {isRecurring, visitLength, recurringStartDate} = watch();
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
      <AppHalfTabs
        title="Visit Length"
        data={data}
        //@ts-ignore
        setVisitId={setVisitId}
        name="visitLength"
        defaultValue={visitLength === 30 ? 0 : 1}
      />

      <AppHalfTabs
        title="Schedule"
        data={schedule}
        //@ts-ignore
        setScheduleId={setScheduleId}
        name="isRecurring"
        defaultValue={isRecurring ? 1 : 0}
      />
      {isRecurring && recurringStartDate !== '' && <AppDayPicker />}
      <View>
        <TitleText
          text={!scheduleId ? 'Select Dates' : 'Select starting date'}
          textStyle={styles.title}
        />
      </View>
      <BottomSheetCalendar
        title={!isRecurring ? 'Dates' : 'Start Date'}
        setValue={setValue}
        isRecurring={isRecurring}
        initalData={recurringStartDate}
      />
      <DayTimeSlot />
    </View>
  );
};

export default DropInVisitWalking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginBottom: 20,
    marginTop: 10,
  },
});
