/* eslint-disable @typescript-eslint/no-unused-vars */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import SafetyQuizHeader from './SafetyQuizHeader';
import BottomSpacing from '../../UI/BottomSpacing';
import SubmitButton from '../../common/Form/SubmitButton';
import SafetyQuizCheckbox from './SafetyQuizCheckbox';
interface Props {
  handleSubmit: () => void;
  loading: boolean;
}
const SafetyQuizBody = ({handleSubmit, loading}: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  console.log('safety quiz', errors);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafetyQuizHeader />

        <View>
          <SafetyQuizCheckbox
            control={control}
            setValue={setValue}
            errors={errors}
          />
          <SubmitButton
            title={'Save & Continue'}
            onPress={handleSubmit}
            loading={loading}
          />
        </View>

        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

export default SafetyQuizBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // marginHorizontal: 20,
    alignItems: 'center',
  },
});
