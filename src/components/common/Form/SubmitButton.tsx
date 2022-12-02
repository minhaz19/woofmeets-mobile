import React from 'react';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useFormContext} from 'react-hook-form';
interface Props {
  title: string;
  onPress?: any;
  loading?: boolean;
  color?: string;
}
const SubmitButton = ({title, onPress, color, loading}: Props) => {
  const {handleSubmit} = useFormContext();
  return (
    <ButtonCom
      title={title}
      loading={loading}
      textAlignment={btnStyles.textAlignment}
      containerStyle={btnStyles.containerStyleFullWidth}
      titleStyle={btnStyles.titleStyle}
      onSelect={handleSubmit(onPress)}
      color={color}
    />
  );
};

export default SubmitButton;
