import React from 'react';
import AppForm from './AppForm';
import Lazy from 'yup/lib/Lazy';
import {AnyObjectSchema} from 'yup';
interface Props {
  children: React.ReactNode;
  initialValues: {};
  validationSchema: AnyObjectSchema | Lazy<any, unknown>;
}
const NestedInputContainer = ({
  children,
  initialValues,
  validationSchema,
}: Props) => {
  return (
    <AppForm initialValues={initialValues} validationSchema={validationSchema}>
      {children}
    </AppForm>
  );
};

export default NestedInputContainer;
