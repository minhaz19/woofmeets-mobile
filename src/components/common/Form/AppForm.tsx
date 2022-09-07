import {yupResolver} from '@hookform/resolvers/yup';
import React, {memo, useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {AnyObjectSchema} from 'yup';
import Lazy from 'yup/lib/Lazy';
interface Props {
  children: React.ReactNode;
  initialValues: {};
  validationSchema: AnyObjectSchema | Lazy<any, unknown>;
}
const AppForm = ({children, initialValues, validationSchema}: Props) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: useMemo(() => initialValues, [initialValues]),
  });
  return (
    <FormProvider {...methods}>
      <>{children}</>
    </FormProvider>
  );
};

export default AppForm;
