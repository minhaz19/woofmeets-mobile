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

          <SubmitButton
            title={
              opk === null || opk === 'Appointment'
                ? 'Next'
                : 'Update & Go next'
            }
            onPress={handleSubmit}
          />
        </View>

        <BottomSpacing />
      </ScrollViewRapper>
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
});
