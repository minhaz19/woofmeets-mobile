import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubmitButton from '../../../common/Form/SubmitButton';
import AppImagePicker from '../../../common/ImagePicker/AppImagePicker';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AdditionalMedicationCheck from '../components/AdditionalMedicationCheck';
import AdditionalButtonInputs from '../components/AdditionalButtonInputs';
import ScrollViewRapper from '../../../common/ScrollViewRapper';

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
      <ScrollViewRapper>
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
        </View>

        <BottomSpacing />
      </ScrollViewRapper>
      <View style={styles.btnAb}>
        <SubmitButton
          title={
            opk === null || opk === 'Appointment' ? 'Add Pet' : 'Update Pet'
          }
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default memo(AddPetSubmitBody);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spaceHeader: {
    paddingVertical: 10,
  },
  btnAb: {position: 'absolute', bottom: '0%', width: '100%'},
});
