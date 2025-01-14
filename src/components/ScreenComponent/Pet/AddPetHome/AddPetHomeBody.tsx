import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubmitButton from '../../../common/Form/SubmitButton';
import AddPetImage from '../components/AddPetImage';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AddPetCheck from '../components/AddPetCheck';
import AddPetInfoInputs from '../components/AddPetInfoInputs';
import AddPetHeader from '../components/AddPetHeader';
import AddPetBreeds from '../components/AddPetBreeds';
import ScrollViewRapper from '../../../common/ScrollViewRapper';

interface Props {
  handleSubmit: (value: any) => void;
  opk: string | null;
}

const AddPetHomeBody = ({handleSubmit, opk}: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.container}>
      <ScrollViewRapper>
        <AddPetHeader />
        <View>
          <AddPetImage name="profile_image" />
          <AddPetCheck errors={errors} setValue={setValue} control={control} />
          <AddPetInfoInputs errors={errors} control={control} />

          <AddPetBreeds
            setValue={setValue}
            control={control}
            name="breeds"
            getValues={getValues}
          />
        </View>

        <BottomSpacing />
        <BottomSpacing />
      </ScrollViewRapper>
      <View style={styles.btnAb}>
        <SubmitButton
          title={
            opk === null || opk === 'Appointment' ? 'Next' : 'Update & Go next'
          }
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default memo(AddPetHomeBody);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spaceHeader: {
    paddingVertical: 10,
  },
  btnAb: {position: 'absolute', bottom: '0%', width: '100%'},
});
