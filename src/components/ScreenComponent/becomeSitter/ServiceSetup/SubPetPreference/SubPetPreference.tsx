/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, memo, useState} from 'react';
import BigText from '../../../../common/text/BigText';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import HeaderText from '../../../../common/text/HeaderText';
import ServicePetQuantity from '../Common/ServicePetQuantity';
import BottomSpacing from '../../../../UI/BottomSpacing';
import PetType from './PetType';
import {useForm} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
// import {petPreferenceSchema} from '../../../../../screens/becomeSitter/ServiceSetUp/PetPreference/utils/useServiceSetUpInitialState';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
import ServiceReusableModal from '../Common/ServiceReusableModal';
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm({
    // resolver: yupResolver(petPreferenceSchema),
    mode: 'onChange',
    defaultValues: {
      smallDog: false,
      mediumDog: false,
      largeDog: false,
      giantDog: false,
      cat: false,
      petPerDay: petPerDay,
    },
  });
  useEffect(() => {
    reset({
      smallDog: petPreference?.smallDog ? petPreference?.smallDog : false,
      mediumDog: petPreference?.mediumDog ? petPreference?.mediumDog : false,
      largeDog: petPreference?.largeDog ? petPreference?.largeDog : false,
      giantDog: petPreference?.giantDog ? petPreference?.giantDog : false,
      cat: petPreference?.cat ? petPreference?.cat : false,
      petPerDay: petPerDay,
    });
  }, [petPreference]);

  const data = getValues();

  return (
    <>
      <ServiceReusableModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.headerContainer}>
        <View style={styles.flexContainer}>
          <BigText text={'Pet Preference'} textStyle={styles.headerText} />
          <View style={styles.textContainer}>
            <View style={styles.iconContainer}>
              <QuestionIcon fill={Colors.primary} />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <DescriptionText
                text="Why Pet Preference is important?"
                textStyle={{color: Colors.primary}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
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
        <PetType
          control={control}
          errors={errors}
          setValue={setValue}
          data={data}
        />
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
    </>
  );
};

export default memo(SubPetPreference);

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
    lineHeight: 20,
  },
  submitContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '6%' : '3%',
  },
  subtitle: {
    paddingBottom: '1%',
    lineHeight: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  iconContainer: {
    paddingRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
