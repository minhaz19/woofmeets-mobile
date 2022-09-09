import {StyleSheet, View} from 'react-native';
import React  from 'react';
import {petType} from '../../../../../utils/config/Data/serviceSetUpData/petPreference';
import HeaderText from '../../../../common/text/HeaderText';
import DescriptionText from '../../../../common/text/DescriptionText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import useHandleMultipleActiveCheck from '../handleCheck/HandleCheck';

interface Props {
  errors: any;
  control: any;
  setValue: (arg1: string, arg2: any, arg3: any) => void;
}

const PetType = ({control, errors, setValue}: Props) => {
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
            // active={item.value}
            onPress={() => {
              handleMultipleCheck(item.id);
              setValue(item.name, item.value, {
                shouldValidate: true,
              });
            }}
            name={item.name}
            control={control}
            setValue={setValue}
          />
        );
      })}
      <ErrorMessage error={errors[petType.name]?.message} />
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