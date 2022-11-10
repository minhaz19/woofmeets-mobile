import {ScrollView, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import SubmitButton from '../../../common/Form/SubmitButton';
import MyPets from '../../Appointment/components/MyPets';
import {useAppSelector} from '../../../../store/store';
import BoardingSitting from './Components/BoardingSitting';
import DropInVisitWalking from './Components/DropInVisitsDwalking';
import DoggyDayCare from './Components/DoggyDayCare';
import {useFormContext} from 'react-hook-form';
import ProposalPricing from './Components/ProposalPricing/ProposalPricing';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
}
const ModifyRequestBody = ({handleSubmit, loading}: Props) => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {serviceTypeId: serviceId} = proposedServiceInfo;
  const {watch, setValue} = useFormContext();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {(serviceId === 1 || serviceId === 2) && (
        <BoardingSitting setValue={setValue} watch={watch} />
      )}
      {(serviceId === 3 || serviceId === 5) && (
        <DropInVisitWalking
          appointmentType={'modify'}
          setValue={setValue}
          watch={watch}
        />
      )}
      {serviceId === 4 && (
        <DoggyDayCare
          appointmentType={'modify'}
          setValue={setValue}
          watch={watch}
        />
      )}

      <MyPets appointmentType={''} setValue={setValue} watch={watch} />
      <ProposalPricing />
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
