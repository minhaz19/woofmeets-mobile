import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import BigText from '../../../../common/text/BigText';
import HeaderText from '../../../../common/text/HeaderText';
import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import DescriptionText from '../../../../common/text/DescriptionText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {useFormContext} from 'react-hook-form';

interface props {
  handlePetPreference: (arg1: any) => void;
  putLoading?: boolean;
  policy: any;
}

const SubCancellationPolicy = ({
  handlePetPreference,
  putLoading,
  policy,
}: props) => {
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.headerContainer}>
      <BigText text={'Cancellation Policy'} textStyle={styles.headerText} />
      <View>
        <HeaderText
          textStyle={styles.subtitle}
          text={'What is your cancellation policy for Boarding Settings?'}
        />
        {policy.map((item: any, index: number) => {
          return (
            <ServiceCheckbox
              title={item.title}
              key={index}
              radio
              typeKey={item.id}
              onPress={() => {
                setValue(item.title, item.id, {
                  shouldValidate: true,
                });
              }}
              name={item.title}
              control={control}
            />
          );
        })}
        {/* <ErrorMessage error={errors[petType.name!]?.message} /> */}
      </View>
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

export default SubCancellationPolicy;

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
