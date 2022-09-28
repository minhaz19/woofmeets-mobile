import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SubmitButton from '../../../common/Form/SubmitButton';
import AddPetImage from '../components/AddPetImage';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AddPetCheck from '../components/AddPetCheck';
import AddPetInfoInputs from '../components/AddPetInfoInputs';
import AddPetHeader from '../components/AddPetHeader';
import AddPetBreeds from '../components/AddPetBreeds';

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
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

          <SubmitButton
            title={opk === null ? 'Next' : 'Update & Go next'}
            onPress={handleSubmit}
          />
        </View>

        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

export default memo(AddPetHomeBody);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {flex: 1},
  spaceHeader: {
    paddingVertical: 10,
  },
});
