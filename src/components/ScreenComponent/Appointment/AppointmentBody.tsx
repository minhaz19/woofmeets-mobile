import {StyleSheet, View} from 'react-native';
import React from 'react';
import SubmitButton from '../../common/Form/SubmitButton';
import ServicePicker from './components/ServicePicker';
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
  const {
    control,

    watch,
    setValue,
    formState: {errors},
  } = useFormContext();
  const {serviceTypeId} = watch();
  return (
    <View style={styles.container}>
      <ServicePicker
        name="providerServiceId"
        setValue={setValue}
      />
      {(serviceTypeId === 1 || serviceTypeId === 2) && (
        <BoardingSitting watch={watch} setValue={setValue} />
      )}
      {(serviceTypeId === 3 || serviceTypeId === 5) && (
        <DropInVisitWalking
          appointmentType="create"
          watch={watch}
          setValue={setValue}
        />
      )}
      {serviceTypeId === 4 && (
        <DoggyDayCare
          appointmentType="create"
          watch={watch}
          setValue={setValue}
        />
      )}

      <View style={styles.zIndex}>
        <MyPets
          appointmentType={appointmentType}
          watch={watch}
          setValue={setValue}
        />
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
