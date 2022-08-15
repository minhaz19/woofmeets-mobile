import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import {addPetInputs} from '../../../../utils/config/Data/AddPetData';
import AddPetImage from './AddPetImage';
import useHandleCheck from '../../../../utils/helpers/usehandleActiveCheck';
import HeaderText from '../../../common/text/HeaderText';
import AppImagePicker from '../../../common/ImagePicker/AppImagePicker';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import AddPetCheck from './components/AddPetCheck';
import AddPetInfoInputs from './components/AddPetInfoInputs';
import AdditionalDetailsCheck from './components/AdditionalDetailsCheck';
import AdditionalCareInputs from './components/AdditionalCareInputs';
import AdditionalMedicationCheck from './components/AdditionalMedicationCheck';
import AdditionalButtonInputs from './components/AdditionalButtonInputs';

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
  const methods = useFormContext();
  console.log('active', active0);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputContainer}>
        <AddPetImage name="petImage" methods={methods} />
        <AddPetCheck
          methods={methods}
          active0={active0}
          handleActiveCheck={handleActiveCheck}
        />
        <AddPetInfoInputs methods={methods} />
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
              methods={methods}
              handleActiveCheck={handleActiveCheck}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={addPetInputs[3].placeholder}
              textContentType={'none'}
              name={addPetInputs[3].name!}
              label={addPetInputs[3].title!}
              multiline
              numberOfLines={addPetInputs[3].numberOfLines}
              methods={methods}
            />

            <AdditionalCareInputs
              methods={methods}
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
              placeholder={addPetInputs[5].placeholder}
              textContentType={'none'}
              name={addPetInputs[5].name!}
              label={addPetInputs[5].title!}
              multiline
              numberOfLines={addPetInputs[5].numberOfLines}
              methods={methods}
            />

            <AdditionalMedicationCheck
              methods={methods}
              active12={active12}
              handleActiveCheck={handleActiveCheck}
            />

            <AdditionalButtonInputs methods={methods} />
          </View>
        )}
        <AppImagePicker
          label="Photo Gallery"
          subTitle="Show off your pet through image gallery"
          name="photoGallery"
          methods={methods}
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
