import React from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import AppCheckboxField from '../../../common/Form/AppCheckboxField';
interface Props {
  errors: any;
  control: any;
}
const MessageCheck = ({errors, control}: Props) => {
  return (
    <>
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={'default'}
        placeholder={'Enter your message'}
        textContentType={'none'}
        name={'message'}
        label={'Message'}
        subTitle="Share a little info about your pet and why they would have a great time with fahmida"
        multiline
        numberOfLines={10}
        errors={errors}
        control={control}
      />
      <AppCheckboxField
        title={'I would like to receive photos of my pets during this stay'}
        square
        errors={errors}
        control={control}
        onPress={() => {
          //   setValue(item.name, type.value);
        }}
        name={'receivePhoto'}
      />
    </>
  );
};

export default MessageCheck;
