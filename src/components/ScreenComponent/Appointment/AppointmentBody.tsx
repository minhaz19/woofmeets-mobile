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
// import {useAppSelector} from '../../../store/store';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
}
const AppointmentBody = ({handleSubmit, loading}: Props) => {
  const [serviceId, setServiceId] = useState(1);
  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext();
  const {isRecurring} = watch();
  // const {serviceType} = useAppSelector(state => state.services);
  // const {serviceTypes} = useAppSelector(state => state.services);
  // const serviceIDs = serviceTypes?.map((item: {id: number}) => item.id);
  return (
    <FlatList
      data={[]}
      renderItem={null}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <>
          <ServicePicker
            name="providerServiceId"
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
                title={isRecurring ? 'Start Date' : 'Dates'}
              />
            </>
          )}
          <View style={styles.zIndex}>
            {serviceId === 4 && <DateDropPick serviceId={serviceId} />}
            {(serviceId === 3 || serviceId === 5) && <DayTimeSlot />}
            <MyPets />
            <MessageCheck
              errors={errors}
              control={control}
              setValue={setValue}
            />
            <SubmitButton
              title="Send Proposal"
              onPress={handleSubmit}
              loading={loading}
            />
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
