/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import HeaderText from '../../../../common/text/HeaderText';
import {usePetPreferenceHandle} from '../handleCheck/usePetPreferenceHandleCheck';
import DescriptionText from '../../../../common/text/DescriptionText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import {petType} from '../../../../../utils/config/Data/serviceSetUpData/petPreference';
import AppFormField from '../../../../common/Form/AppFormField';
import BigText from '../../../../common/text/BigText';

const NewSubPerPreference = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const {
    preferences: {preferenceOptions, preference, onSetPreference},
  } = usePetPreferenceHandle();
  return (
    <View>
      <BigText
        text={'Your Preferences (Optional)'}
        textStyle={{
          lineHeight: 20,
          fontWeight: 'bold',
          paddingBottom: 15,
        }}
      />
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={'numeric'}
        placeholder={''}
        textContentType={'none'}
        name={'petPerDay'}
        label={'How many pets per day can host in your home? (optional)'}
        errors={errors}
        control={control}
      />
      <HeaderText
        textStyle={{...styles.subtitle, paddingTop: 10}}
        text={petType.title!}
      />
      <DescriptionText text={petType.subtitle} textStyle={styles.subtitle} />
      {preferenceOptions?.map((item: any, index: number) => {
        return (
          <ServiceCheckbox
            title={item.type}
            key={index}
            square
            typeKey={item.id}
            active={preference[item.name]}
            onPress={() => {
              onSetPreference(item.name);
            }}
            name={item.name}
            control={control}
          />
        );
      })}
      <ErrorMessage error={errors['preference']?.message} />
    </View>
  );
};

export default NewSubPerPreference;

const styles = StyleSheet.create({
  subtitle: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
    lineHeight: 20,
  },
  container: {
    paddingTop: 6,
  },
});
