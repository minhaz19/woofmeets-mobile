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
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';

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
          <View style={styles.optionalText}>
            <TitleText
              textStyle={styles.text}
              text={
                'Below informations are optional your can share your pets information if you want to otherwise you can skip this section by hitting Next'
              }
            />
          </View>
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
  optionalText: {
    padding: 10,
    backgroundColor: Colors.iosBG,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 20,
  },
  text: {
    fontWeight: '600',
    textAlign: 'justify',
  },
  btnAb: {position: 'absolute', bottom: '0%', width: '100%'},
});
