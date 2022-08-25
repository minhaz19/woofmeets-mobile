import {View} from 'react-native';
import React, {memo, useCallback} from 'react';
import AppFormField from '../../../../common/Form/AppFormField';
import {additionalDetailsBottomInputs} from '../../../../../utils/config/Data/AddPetData';

interface Props {
  errors: any;
  control: any;
}
const AdditionalButtonInputs = ({errors, control}: Props) => {
  return (
    <View>
      {additionalDetailsBottomInputs.map(
        useCallback(
          (item, index) => (
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
              errors={errors}
              control={control}
            />
          ),
          [errors, control],
        ),
      )}
    </View>
  );
};
export default memo(AdditionalButtonInputs);
