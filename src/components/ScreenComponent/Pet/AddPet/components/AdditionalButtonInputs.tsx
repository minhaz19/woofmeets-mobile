import {View} from 'react-native';
import React, {memo} from 'react';
import AppFormField from '../../../../common/Form/AppFormField';
import {addPetInputs} from '../../../../../utils/config/Data/AddPetData';

interface Props {
  methods: any;
}
const AdditionalButtonInputs = ({methods}: Props) => {
  console.log('from buttom');
  return (
    <View>
      {addPetInputs[7].inputs!.map((item, index) => (
        <AppFormField
          key={index}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'default'}
          placeholder={item.placeholder}
          textContentType={'none'}
          name={item.name}
          label={item.title}
          subTitle={item.subTitle}
          multiline={item.numberOfLines ? true : false}
          numberOfLines={item.numberOfLines! && item.numberOfLines!}
          methods={methods}
        />
      ))}
    </View>
  );
};
const areEqual = (prevProps: any, nextProps: any) => {
  return (
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty
  );
};

export default memo(AdditionalButtonInputs, areEqual);
