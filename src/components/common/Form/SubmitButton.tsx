import React from 'react';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useFormContext} from 'react-hook-form';
interface Props {
  title: string;
  onPress?: any;
  loading?: boolean;
  color?: string;
  onError?: any,
}
const SubmitButton = ({title, onPress, color, loading, onError}: Props) => {
  const {handleSubmit} = useFormContext();
  return (
    <ButtonCom
      title={title}
      loading={loading}
      textAlignment={btnStyles.textAlignment}
      containerStyle={btnStyles.containerStyleFullWidth}
      titleStyle={btnStyles.titleStyle}
      onSelect={handleSubmit(onPress, onError)}
      color={color}
    />
  );
};

export default SubmitButton;
