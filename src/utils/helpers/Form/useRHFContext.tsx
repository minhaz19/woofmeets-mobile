import {useController} from 'react-hook-form';

export const useRHFContext = (name: string, control: any) => {
  const {
    field: {onBlur, onChange, value},
  } = useController({name, control});
  return {
    onBlur,
    onChange,
    value,
  };
};
