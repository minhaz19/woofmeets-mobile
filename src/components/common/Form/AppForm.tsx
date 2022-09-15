import {yupResolver} from '@hookform/resolvers/yup';
import React, { useEffect, useMemo} from 'react';
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
  validationSchema,
  enableReset = false,
}: Props) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: useMemo(() => initialValues, [initialValues]),
  });
  const {reset} = methods;
  useEffect(() => {
    enableReset && reset(initialValues);
  }, [enableReset, initialValues, reset]);

  return (
    <FormProvider {...methods}>
      <>{children}</>
    </FormProvider>
  );
};

export default AppForm;
