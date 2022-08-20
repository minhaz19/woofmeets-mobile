import React from 'react';
import ErrorMessage from '../Form/ErrorMessage';
import PhotoGalleryList from './PhotoGalleryList';
import {useRHFContext} from '../../../utils/helpers/Form/useRHFContext';

interface Props {
  label: string;
  subTitle: string;
  name: string;
  methods: any;
}
const AppImagePicker = ({label, name, subTitle}: Props) => {
  const {setValue, errors, value} = useRHFContext(name);
  // const {
  //   setValue,
  //   formState: {errors, value},
  // } = methods;
  console.log('values', value);
  const imageUris = value;
  function handleAdd(uri: string) {
    setValue(name, [...imageUris, uri], {shouldValidate: true});
  }
  const handleRemove = (uri: string) => {
    setValue(
      name,
      imageUris?.filter((imageUri: string) => imageUri !== uri),
    );
  };

  return (
    <>
      <PhotoGalleryList
        label={label}
        subTitle={subTitle}
        imageUris={value}
        onRemoveImage={handleRemove}
        onAddImage={handleAdd}
      />
      <ErrorMessage error={errors[name]?.message} />
    </>
  );
};

export default AppImagePicker;
