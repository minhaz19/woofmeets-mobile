import {} from 'react-native';
import React from 'react';
import ErrorMessage from '../Form/ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import PhotoGalleryList from './PhotoGalleryList';

interface Props {
  label: string;
  subTitle: string;
  name: string;
}
const AppImagePicker = ({label, name, subTitle}: Props) => {
  const {errors, touched, values, setFieldValue} =
    useFormikContext<FormikValues>();

  const imageUris = values[name];
  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri: string) => {
    setFieldValue(
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
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppImagePicker;

// const styles = StyleSheet.create({});
