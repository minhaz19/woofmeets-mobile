import React from 'react';
import {Controller} from 'react-hook-form';
interface Props {
  name: string;
  methods: any;
  render: any;
}
const AppInputController = ({name, methods, render}: Props) => {
  const {control} = methods;
  return <Controller control={control} render={render} name={name} />;
};

export default AppInputController;
