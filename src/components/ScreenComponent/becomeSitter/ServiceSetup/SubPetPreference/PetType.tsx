import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  petType,
} from '../../../../../utils/config/Data/serviceSetUpData/petPreference';
import HeaderText from '../../../../common/text/HeaderText';
import DescriptionText from '../../../../common/text/DescriptionText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import useHandleMultipleActiveCheck from '../handleCheck/HandleCheck';
import ErrorMessage from '../../../../common/Form/ErrorMessage';

interface Props {
  errors: any;
  control: any;
  setValue: any;
  data?: any;
}

const PetType = ({control, errors, setValue, data}: Props) => {
  const {newData, handleMultipleCheck} = useHandleMultipleActiveCheck(
    petType.options,
  );
  return (
    <View>
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
              // setValue('petSize', data[item.name] === true ? true : false, {
              //   shouldValidate: data[item.name] === true ? true : false,
              // });
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
    paddingBottom: '1%',
    lineHeight: 20,
  },
});
