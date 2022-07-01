import React from 'react';
import {useFormikContext} from 'formik';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
interface Props {
  title: string;
}
const SubmitButton = ({title}: Props) => {
  const {handleSubmit} = useFormikContext();
  return (
    <ButtonCom
      title={title}
      textAlignment={btnStyles.textAlignment}
      containerStyle={btnStyles.containerStyleFullWidth}
      titleStyle={btnStyles.titleStyle}
      onSelect={handleSubmit}
    />
  );
};

export default SubmitButton;
