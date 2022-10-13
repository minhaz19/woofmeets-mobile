import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SubmitButton from '../../../common/Form/SubmitButton';
import AppImagePicker from '../../../common/ImagePicker/AppImagePicker';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AdditionalMedicationCheck from '../components/AdditionalMedicationCheck';
import AdditionalButtonInputs from '../components/AdditionalButtonInputs';

interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
  opk: string | null;
}

const AddPetSubmitBody = ({handleSubmit, loading, opk}: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
        {/* <AddPetHeader /> */}

        <View>
          <AdditionalMedicationCheck
            errors={errors}
            setValue={setValue}
            control={control}
            getValues={getValues}
          />

          <AdditionalButtonInputs errors={errors} control={control} />
          <AppImagePicker
            label="Photo Gallery"
            subTitle="Show off your pet through image gallery"
            name="gallery"
          />
          <SubmitButton
            title={
              opk === null || opk === 'Appointment' ? 'Add Pet' : 'Update Pet'
            }
            onPress={handleSubmit}
            loading={loading}
          />
        </View>

        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

export default memo(AddPetSubmitBody);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {flex: 1},
  spaceHeader: {
    paddingVertical: 10,
  },
});
