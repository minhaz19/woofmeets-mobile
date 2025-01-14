/* eslint-disable react-hooks/exhaustive-deps */
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {AnyObjectSchema} from 'yup';
import Lazy from 'yup/lib/Lazy';
interface Props {
  children: React.ReactNode;
  initialValues: {};
  validationSchema: AnyObjectSchema | Lazy<any, unknown>;
  enableReset?: boolean;
}
const AppForm = ({
  children,
  initialValues,
  enableReset,
  validationSchema,
}: Props) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {
    reset,
    formState: {isDirty},
  } = methods;
  useEffect(() => {
    enableReset &&
      isDirty === false &&
      reset(initialValues, {
        keepIsSubmitted: true,
      });
  }, [enableReset, initialValues, isDirty]);
  return (
    <FormProvider {...methods}>
      <>{children}</>
    </FormProvider>
  );
};

export default AppForm;
