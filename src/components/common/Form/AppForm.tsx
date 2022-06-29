import {Formik} from 'formik';
import React from 'react';
interface Props {
  children: React.ReactNode;
  initialValues: {};
  onSubmit: (v: {}) => void;
  validationSchema: {};
}
const AppForm = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
