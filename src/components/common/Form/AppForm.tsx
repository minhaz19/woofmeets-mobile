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
  validationSchema,
  enableReset,
}: Props) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {reset} = methods;
  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted) {
        reset(initialValues);
      }
    }, 3000);
    return () => {
      unmounted === true;
    };
  }, []);
  // useEffect(() => {
  //   enableReset && reset(initialValues);
  // }, [initialValues, enableReset, reset]);
  return (
    <FormProvider {...methods}>
      <>{children}</>
    </FormProvider>
  );
};

export default AppForm;
