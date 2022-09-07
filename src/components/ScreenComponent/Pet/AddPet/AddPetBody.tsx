import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import {petDescriptionInput} from '../../../../utils/config/Data/AddPetData';
import AddPetImage from './AddPetImage';
import AppImagePicker from '../../../common/ImagePicker/AppImagePicker';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AddPetCheck from './components/AddPetCheck';
import AddPetInfoInputs from './components/AddPetInfoInputs';
import AdditionalDetailsCheck from './components/AdditionalDetailsCheck';
import AdditionalMedicationCheck from './components/AdditionalMedicationCheck';
import AdditionalButtonInputs from './components/AdditionalButtonInputs';
import AdditionalCareInfoChecks from './components/AdditionalCareInfoChecks';
import AddPetHeader from './components/AddPetHeader';
import AddPetBreeds from './components/AddPetBreeds';

interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
  opk: string | null;
}

const AddPetBody = ({handleSubmit, loading, opk}: Props) => {
  const [havePets, setHavePet] = useState(0);
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
        <AddPetHeader havePet={havePets} setHavePet={setHavePet} />

        {havePets === 0 && (
          <View>
            <AddPetImage name="profile_image" />
            <AddPetCheck
              errors={errors}
              setValue={setValue}
              control={control}
            />
            <AddPetInfoInputs errors={errors} control={control} />

            <AddPetBreeds
              setValue={setValue}
              control={control}
              name="breeds"
              getValues={getValues}
            />
            <AdditionalDetailsCheck
              errors={errors}
              setValue={setValue}
              control={control}
              getValues={getValues}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={petDescriptionInput.placeholder}
              textContentType={'none'}
              name={petDescriptionInput.name!}
              label={petDescriptionInput.title!}
              multiline
              numberOfLines={petDescriptionInput.numberOfLines}
              errors={errors}
              control={control}
            />

            <AdditionalCareInfoChecks
              errors={errors}
              setValue={setValue}
              control={control}
              getValues={getValues}
            />

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
              title={opk === null ? 'Add Pet' : 'Update Pet'}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        )}
        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

export default memo(AddPetBody);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {paddingHorizontal: 20, flex: 1},
  spaceHeader: {
    paddingVertical: 10,
  },
});
