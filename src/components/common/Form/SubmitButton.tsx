import React from 'react';
import AppButton from '../AppButton';
import {useFormikContext} from 'formik';
interface Props {
  title: string;
}
const SubmitButton = ({title}: Props) => {
  const {handleSubmit} = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} />;
};

export default SubmitButton;
