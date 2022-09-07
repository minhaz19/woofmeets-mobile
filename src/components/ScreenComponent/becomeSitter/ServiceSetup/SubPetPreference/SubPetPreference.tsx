import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import BigText from '../../../../common/text/BigText';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import HeaderText from '../../../../common/text/HeaderText';
import ServicePetQuantity from '../Common/ServicePetQuantity';
import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import PetType from '../PetType/PetType';

interface Props {
  handlePetPreference: (arg1: any) => void;
  putLoading: boolean;
}
const SubPetPreference = ({handlePetPreference, putLoading}: Props) => {
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();

  return (
    <View style={styles.headerContainer}>
      <BigText text={'Pet Preference'} textStyle={styles.headerText} />
      <View style={styles.headerContainer}>
        <HeaderText
          textStyle={styles.headerText}
          text={'How many pets per day can host in your home?'}
        />
        <ServicePetQuantity
          name={'petPerDay'}
          control={control}
          errors={errors}
          setValue={setValue}
        />
      </View>
      <PetType control={control} errors={errors} setValue={setValue} />
      <View style={styles.submitContainer}>
        <SubmitButton
          title="Save & continue"
          onPress={handlePetPreference}
          loading={putLoading}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default SubPetPreference;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
    lineHeight: 20,
  },
  submitContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '6%' : '3%',
  },
  subtitle: {
    paddingBottom: '1%',
    lineHeight: 20,
  },
});
