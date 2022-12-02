import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import {petDescriptionInput} from '../../../../utils/config/Data/AddPetData';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import BottomSpacing from '../../../UI/BottomSpacing';
import AdditionalCareInfoChecks from '../components/AdditionalCareInfoChecks';
import AdditionalDetailsCheck from '../components/AdditionalDetailsCheck';
import ScrollViewRapper from '../../../common/ScrollViewRapper';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';

interface Props {
  handleSubmit: (value: any) => void;

  opk: string | null;
}

const AddPetCheckBody = ({handleSubmit, opk}: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.container}>
      <ScrollViewRapper>
        <View>
          <View style={styles.optionalText}>
            <TitleText
              textStyle={styles.text}
              text={
                'Below informations are optional your can share your pets information if you want to otherwise you can skip this section by hitting Next'
              }
            />
          </View>
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
        </View>

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

export default memo(AddPetCheckBody);

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
