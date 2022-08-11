import React from 'react';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useFormContext} from 'react-hook-form';
interface Props {
  title: string;
  onPress?: any;
}
const SubmitButton = ({title, onPress}: Props) => {
  const {handleSubmit} = useFormContext();
  return (
    <ButtonCom
      title={title}
      textAlignment={btnStyles.textAlignment}
      containerStyle={btnStyles.containerStyleFullWidth}
      titleStyle={btnStyles.titleStyle}
      onSelect={handleSubmit(onPress)}
    />
  );
};

export default SubmitButton;
