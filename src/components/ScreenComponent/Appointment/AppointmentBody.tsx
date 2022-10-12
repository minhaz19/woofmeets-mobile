import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import SubmitButton from '../../common/Form/SubmitButton';
import ServicePicker from './components/ServicePicker';
import DateDropPick from './components/DateDropPick';
import DayTimeSlot from './components/DayTimeSlot';
import VisitScheduleTab from './components/VisitScheduleTab';
import {useFormContext} from 'react-hook-form';
import BottomSpacing from '../../UI/BottomSpacing';
import BottomSheetCalendar from '../../common/BottomSheetCalendar';
import MyPets from './components/MyPets';
import MessageCheck from './components/MessageCheck';
interface Props {
  handleSubmit: (arg: any) => void;
}
const AppointmentBody = ({handleSubmit}: Props) => {
  const [serviceId, setServiceId] = useState(1);
  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext();
  const {schedule} = watch();
  return (
    <FlatList
      data={[]}
      renderItem={null}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <>
          <ServicePicker
            name="serviceId"
            setValue={setValue}
            setServiceId={setServiceId}
          />
          {(serviceId === 1 || serviceId === 2) && (
            <>
              <DateDropPick serviceId={serviceId} />
            </>
          )}
          {(serviceId === 3 || serviceId === 4 || serviceId === 5) && (
            <>
              <VisitScheduleTab serviceId={serviceId} />
              <BottomSheetCalendar
                title={schedule === 0 ? 'Dates' : 'Start Date'}
              />
            </>
          )}
          <View style={styles.zIndex}>
            {serviceId === 4 && <DateDropPick serviceId={serviceId} />}
            {(serviceId === 3 || serviceId === 5) && <DayTimeSlot />}
            <MyPets />
            <MessageCheck errors={errors} control={control} />
            <SubmitButton title="Send Proposal" onPress={handleSubmit} />
            <BottomSpacing />
            <BottomSpacing />
          </View>
        </>
      }
    />
  );
};

export default AppointmentBody;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  zIndex: {zIndex: -1},
});
