import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import SubmitButton from '../../common/Form/SubmitButton';
import ServicePicker from './common/ServicePicker';
import DateDropPick from './common/DateDropPick';
import DayTimeSlot from './common/DayTimeSlot';
import VisitScheduleTab from './common/VisitScheduleTab';
import AppFormField from '../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
import BottomSpacing from '../../UI/BottomSpacing';
import BottomSheetCalendar from '../../common/BottomSheetCalendar';

const AppointmentBody = () => {
  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext();
  const {serviceId, schedule} = watch();
  console.log('service', serviceId);
  return (
    <FlatList
      data={[]}
      renderItem={null}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <>
          <ServicePicker name="serviceId" setValue={setValue} />
          {(serviceId === 1 || serviceId === 2) && <DateDropPick />}
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
            {serviceId === 3 && <DayTimeSlot />}
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={'Enter your message'}
              textContentType={'none'}
              name={'message'}
              label={'Message'}
              subTitle="Share a little info about your pet and why they would have a great time with fahmida"
              multiline
              numberOfLines={10}
              errors={errors}
              control={control}
            />
            <AppCheckboxField
              title={
                'I would like to receive photos of my pets during this stay'
              }
              square
              errors={errors}
              control={control}
              onPress={() => {
                //   setValue(item.name, type.value);
              }}
              name={'receivePhoto'}
            />

            <SubmitButton title="Send Proposal" />
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
