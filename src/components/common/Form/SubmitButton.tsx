import React from 'react';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useFormContext} from 'react-hook-form';
interface Props {
  title: string;
  onPress?: any;
  loading?: boolean;
}
const SubmitButton = ({title, onPress, loading}: Props) => {
  const {handleSubmit} = useFormContext();
  return (
    <ButtonCom
      title={title}
      loading={loading}
      textAlignment={btnStyles.textAlignment}
      containerStyle={btnStyles.containerStyleFullWidth}
      titleStyle={btnStyles.titleStyle}
      onSelect={handleSubmit(onPress)}
    />
  );
};

export default SubmitButton;
