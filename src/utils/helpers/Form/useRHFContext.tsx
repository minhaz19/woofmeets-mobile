import {useController, useFormContext} from 'react-hook-form';

export const useRHFContext = (name: string) => {
  const {
    control,
    setValue,
    resetField,
    clearErrors,
    reset,
    watch,
    getValues,
    setFocus,
    handleSubmit,
    formState: {errors},
  } = useFormContext();

  const {
    field: {onBlur, onChange, value},
  } = useController({name, control});
  return {
    onBlur,
    onChange,
    value,
    control,
    errors,
    setValue,
    reset,
    resetField,
    clearErrors,
    watch,
    getValues,
    setFocus,
    handleSubmit,
  };
};
