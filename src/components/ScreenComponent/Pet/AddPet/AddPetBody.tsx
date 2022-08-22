import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import {
  additionalDescriptionInput,
  petDescriptionInput,
} from '../../../../utils/config/Data/AddPetData';
import AddPetImage from './AddPetImage';
import HeaderText from '../../../common/text/HeaderText';
import AppImagePicker from '../../../common/ImagePicker/AppImagePicker';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AddPetCheck from './components/AddPetCheck';
import AddPetInfoInputs from './components/AddPetInfoInputs';
import AdditionalDetailsCheck from './components/AdditionalDetailsCheck';
import AdditionalMedicationCheck from './components/AdditionalMedicationCheck';
import AdditionalButtonInputs from './components/AdditionalButtonInputs';
import {useHandleCheck} from '../../../../utils/helpers/usehandleActiveCheck';
import AdditionalCareInfoChecks from './components/AdditionalCareInfoChecks';

interface Props {
  handleSubmit: (value: any) => void;
}

const AddPetBody = ({handleSubmit}: Props) => {
  const [isAdditionalDetails, setIsAdditionalDetails] = useState<boolean>(true);
  const {
    handleActiveCheck,
    active0,
    active1,
    active2,
    active3,
    active4,
    active5,
    active6,
    active7,
    active8,
    active9,
    active10,
    active11,
    active12,
  } = useHandleCheck();
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  console.log('active', active0);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
        <AddPetImage name="petImage" />
        <AddPetCheck
          errors={errors}
          setValue={setValue}
          control={control}
          active0={active0}
          handleActiveCheck={handleActiveCheck}
        />
        <AddPetInfoInputs errors={errors} control={control} />

        <TouchableOpacity
          style={styles.spaceHeader}
          onPress={() => setIsAdditionalDetails(!isAdditionalDetails)}>
          <HeaderText text="Additional Details" />
        </TouchableOpacity>
        {isAdditionalDetails && (
          <View>
            <AdditionalDetailsCheck
              active1={active1}
              active2={active2}
              active3={active3}
              active4={active4}
              active5={active5}
              active6={active6}
              active7={active7}
              errors={errors}
              setValue={setValue}
              control={control}
              handleActiveCheck={handleActiveCheck}
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
              handleActiveCheck={handleActiveCheck}
              active8={active8}
              active9={active9}
              active10={active10}
              active11={active11}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={additionalDescriptionInput.placeholder}
              textContentType={'none'}
              name={additionalDescriptionInput.name!}
              label={additionalDescriptionInput.title!}
              multiline
              numberOfLines={additionalDescriptionInput.numberOfLines}
              errors={errors}
              control={control}
            />

            <AdditionalMedicationCheck
              errors={errors}
              setValue={setValue}
              control={control}
              active12={active12}
              handleActiveCheck={handleActiveCheck}
            />

            <AdditionalButtonInputs errors={errors} control={control} />
          </View>
        )}
        <AppImagePicker
          label="Photo Gallery"
          subTitle="Show off your pet through image gallery"
          name="photoGallery"
        />
        <SubmitButton title="Add Pet" onPress={handleSubmit} />
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
