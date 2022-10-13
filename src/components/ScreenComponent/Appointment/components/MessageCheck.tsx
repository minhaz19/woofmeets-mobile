import React, {useState} from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import AppCheckboxField from '../../../common/Form/AppCheckboxField';
interface Props {
  errors: any;
  control: any;
  setValue: (arg: string, arg1: boolean) => void;
}
const MessageCheck = ({errors, control, setValue}: Props) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <AppFormField
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={'default'}
        placeholder={'Enter your message'}
        textContentType={'none'}
        name={'firstMessage'}
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
        active={active}
        errors={errors}
        control={control}
        onPress={() => {
          setActive(!active);
          setValue('isRecivedPhotos', !active);
        }}
        name={'isRecivedPhotos'}
      />
    </>
  );
};

export default MessageCheck;