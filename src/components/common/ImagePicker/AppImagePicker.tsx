/* eslint-disable @typescript-eslint/no-unused-vars */
import {} from 'react-native';
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
const AppImagePicker = ({label, name, subTitle, methods}: Props) => {
  const {setValue, errors, value} = useRHFContext(name);

  const imageUris = value;
  const handleAdd = (uri: string) => {
    setValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri: string) => {
    setValue(
      name,
      imageUris.filter((imageUri: string) => imageUri !== uri),
    );
  };

  return (
    <>
      <PhotoGalleryList
        label={label}
        subTitle={subTitle}
        imageUris={imageUris}
        onRemoveImage={handleRemove}
        onAddImage={handleAdd}
      />
      <ErrorMessage error={errors[name]} />
    </>
  );
};

export default AppImagePicker;

// const styles = StyleSheet.create({});
