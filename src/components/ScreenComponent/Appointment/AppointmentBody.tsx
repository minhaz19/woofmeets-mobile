import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import SubmitButton from '../../common/Form/SubmitButton';
import ServicePicker from './components/ServicePicker';
// import DateDropPick from './components/DateDropPick';
// import DayTimeSlot from './components/DayTimeSlot';
// import VisitScheduleTab from './components/VisitScheduleTab';
// import BottomSheetCalendar from '../../common/BottomSheetCalendar';
import {useFormContext} from 'react-hook-form';
import BottomSpacing from '../../UI/BottomSpacing';
import MyPets from './components/MyPets';
import MessageCheck from './components/MessageCheck';
import BoardingSitting from '../Inbox/ModifyAppointment/Components/BoardingSitting';
import DropInVisitWalking from '../Inbox/ModifyAppointment/Components/DropInVisitsDwalking';
import DoggyDayCare from '../Inbox/ModifyAppointment/Components/DoggyDayCare';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
  appointmentType: string;
}
const AppointmentBody = ({handleSubmit, loading, appointmentType}: Props) => {
  const [serviceId, setServiceId] = useState(1);
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  // const {isRecurring, recurringStartDate} = watch();

  return (
    <View style={styles.container}>
      <ServicePicker
        name="providerServiceId"
        setValue={setValue}
        setServiceId={setServiceId}
      />
      {(serviceId === 1 || serviceId === 2) && <BoardingSitting />}
      {(serviceId === 3 || serviceId === 5) && (
        <DropInVisitWalking appointmentType="create" />
      )}
      {serviceId === 4 && <DoggyDayCare appointmentType="create" />}

      <View style={styles.zIndex}>
        <MyPets appointmentType={appointmentType} />
        <MessageCheck errors={errors} control={control} setValue={setValue} />
        <SubmitButton
          title="Send Proposal"
          onPress={handleSubmit}
          loading={loading}
        />
        <BottomSpacing />
        <BottomSpacing />
      </View>
    </View>
  );
};

export default AppointmentBody;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  zIndex: {zIndex: -1},
});
