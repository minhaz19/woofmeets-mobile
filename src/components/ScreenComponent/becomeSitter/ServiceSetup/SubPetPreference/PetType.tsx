import {StyleSheet, View} from 'react-native';
import React from 'react';
import {petType} from '../../../../../utils/config/Data/serviceSetUpData/petPreference';
import HeaderText from '../../../../common/text/HeaderText';
import DescriptionText from '../../../../common/text/DescriptionText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {usePetPreferenceHandleCheck} from '../handleCheck/usePetPreferenceHandleCheck';
import { SCREEN_WIDTH } from '../../../../../constants/WindowSize';

interface Props {
  errors: any;
  control: any;
  setValue: any;
  data?: any;
}

const PetType = ({control, errors, setValue, data}: Props) => {
  const {newData, handleMultipleCheck} = usePetPreferenceHandleCheck(
    petType.options,
    data,
  );
  return (
    <View style={styles.container}>
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
      <ErrorMessage error={errors['petSize']?.message} />
    </View>
  );
};

export default PetType;

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
