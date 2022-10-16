import {Button, ScrollView, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import SubmitButton from '../../../common/Form/SubmitButton';
import MyPets from '../../Appointment/components/MyPets';
import {useAppSelector} from '../../../../store/store';
import BoardingSitting from './Components/BoardingSitting';
import DropInVisitWalking from './Components/DropInVisitsDwalking';
import DoggyDayCare from './Components/DoggyDayCare';
import {useFormContext} from 'react-hook-form';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
}
const ModifyRequestBody = ({handleSubmit, loading}: Props) => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {serviceTypeId: serviceId} = proposedServiceInfo;
  const {
    getValues,
    formState: {errors},
  } = useFormContext();
  //   const {
  //     proposalStartDate,
  //     proposalEndDate,
  //     dropOffStartTime,
  //     dropOffEndTime,
  //     pickUpStartTime,
  //     pickUpEndTime,
  //     markedStyle,
  //   } = getValues();
  console.log(errors);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
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
            />
          )}
        </>
      )}
      <View style={{}}>
        {serviceId === 4 && (
          <DateDropPick serviceId={serviceId} setValue={setValue} />
        )}
        {(serviceId === 3 || serviceId === 5) && <DayTimeSlot />}
        <MyPets /> */}

      {/* </View> */}
      <MyPets />

      <SubmitButton
        title="Submit Proposal"
        onPress={handleSubmit}
        loading={loading}
      />
    </ScrollView>
  );
};

export default memo(ModifyRequestBody);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
