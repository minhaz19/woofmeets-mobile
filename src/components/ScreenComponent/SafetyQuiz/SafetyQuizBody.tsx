/* eslint-disable @typescript-eslint/no-unused-vars */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import SafetyQuizHeader from './SafetyQuizHeader';
import BottomSpacing from '../../UI/BottomSpacing';
import SubmitButton from '../../common/Form/SubmitButton';
import SafetyQuizCheckbox from './SafetyQuizCheckbox';
interface Props {}
const SafetyQuizBody = ({}: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafetyQuizHeader />

        <SafetyQuizCheckbox
          control={control}
          setValue={setValue}
          errors={errors}
        />

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
