import {ScrollView, StyleSheet, View} from 'react-native';
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
}
const AppointmentBody = ({handleSubmit, loading}: Props) => {
  const [serviceId, setServiceId] = useState(1);
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  // const {isRecurring, recurringStartDate} = watch();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <ServicePicker
        name="providerServiceId"
        setValue={setValue}
        setServiceId={setServiceId}
      />
      {(serviceId === 1 || serviceId === 2) && <BoardingSitting />}
      {(serviceId === 3 || serviceId === 5) && <DropInVisitWalking />}
      {serviceId === 4 && <DoggyDayCare />}
      {/* {(serviceId === 1 || serviceId === 2) && (
        <>
          <DateDropPick serviceId={serviceId} setValue={setValue} />
        </>
      )}
      {(serviceId === 3 || serviceId === 4 || serviceId === 5) && (
        <>
          <VisitScheduleTab serviceId={serviceId} />
          {serviceId !== 4 && (
            <BottomSheetCalendar
              title={isRecurring ? 'Start Date' : 'Dates'}
              setValue={setValue}
              isRecurring={isRecurring}
              initalData={recurringStartDate}
            />
          )}
        </>
      )}
      {serviceId === 4 && (
        <DateDropPick serviceId={serviceId} setValue={setValue} />
      )}
      {(serviceId === 3 || serviceId === 5) && <DayTimeSlot />} */}
      <View style={styles.zIndex}>
        <MyPets />
        <MessageCheck errors={errors} control={control} setValue={setValue} />
        <SubmitButton
          title="Send Proposal"
          onPress={handleSubmit}
          loading={loading}
        />
        <BottomSpacing />
        <BottomSpacing />
      </View>
    </ScrollView>
  );
};

export default AppointmentBody;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  zIndex: {zIndex: -1},
});
// <FlatList
//   data={[]}
//   renderItem={null}
//   contentContainerStyle={styles.container}
//   showsVerticalScrollIndicator={false}
//   ListEmptyComponent={  //   }
// />
