/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, memo} from 'react';
// import {useFormContext} from 'react-hook-form';
import BigText from '../../../../common/text/BigText';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import HeaderText from '../../../../common/text/HeaderText';
import ServicePetQuantity from '../Common/ServicePetQuantity';
// import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import PetType from '../PetType/PetType';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  petPreferenceSchema,
} from '../../../../../screens/becomeSitter/ServiceSetUp/useServiceSetUpInitialState';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
// import DescriptionText from '../../../../common/text/DescriptionText';
// import ServiceCheckbox from '../Common/ServiceCheckbox';
// import {petType} from '../../../../../utils/config/Data/serviceSetUpData/petPreference';
// import useHandleMultipleActiveCheck from '../handleCheck/HandleCheck';

interface Props {
  handlePetPreference: (arg1: any) => void;
  putLoading: boolean;
  petPreference: any;
  petPerDay: string;
}
const SubPetPreference = ({
  handlePetPreference,
  putLoading,
  petPreference,
  petPerDay,
}: Props) => {
  // const {newData, handleMultipleCheck} = useHandleMultipleActiveCheck(
  //   petType.options,
  // );
  // const {
  //   control,
  //   setValue,
  //   formState: {errors},
  // } = useFormContext();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(petPreferenceSchema),
    defaultValues: {
      smallDog: false ,
      mediumDog: false,
      largeDog: false,
      giantDog: false,
      cat: false,
      petPerDay: petPerDay,
    },
    mode: 'onChange',
  });
  useEffect(() => {
    reset({
      smallDog: petPreference?.smallDog ,
      mediumDog: petPreference?.mediumDog,
      largeDog: petPreference?.largeDog,
      giantDog: petPreference?.giantDog,
      cat: petPreference?.cat,
    });
  }, [petPreference]);
  const data = getValues();
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
      <PetType control={control} errors={errors} setValue={setValue}  data={data}/>
      {/* <View>
        <HeaderText textStyle={styles.subtitle} text={petType.title!} />
        <DescriptionText text={petType.subtitle} textStyle={styles.subtitle} />
        {newData?.map((item: any, index: number) => {
          return (
            <ServiceCheckbox
              title={item.type}
              key={index}
              square
              typeKey={item.id}
              active={data[item.name]}
              onPress={() => {
                handleMultipleCheck(item.id);
                setValue(item.name, item.value, {
                  shouldValidate: true,
                });
              }}
              name={item.name}
              control={control}
            />
          );
        })}
        <ErrorMessage error={errors[petType.name]?.message} />
      </View> */}
      <View style={styles.submitContainer}>
        <ButtonCom
          title={'Save & Continue'}
          loading={putLoading}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={handleSubmit(handlePetPreference)}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default memo(SubPetPreference);

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
