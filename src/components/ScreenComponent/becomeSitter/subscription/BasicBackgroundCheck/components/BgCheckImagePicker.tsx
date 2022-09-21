import React from 'react';
import ErrorMessage from '../../../../../common/Form/ErrorMessage';
import PhotoGalleryList from '../../../../../common/ImagePicker/PhotoGalleryList';
import {useRHFContext} from '../../../../../../utils/helpers/Form/useRHFContext';
interface Props {
  name: string;
  label: string;
  subTitle: string;
}
const BgCheckImagePicker = ({name, label, subTitle}: Props) => {
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
  const handlePress = () => {};
  return (
    <>
      <PhotoGalleryList
        label={label}
        subTitle={subTitle}
        imageUris={value}
        onRemoveImage={handleRemove}
        onAddImage={handleAdd}
        handlePress={handlePress}
      />
      <ErrorMessage error={errors[name]?.message} />
    </>
  );
};

export default BgCheckImagePicker;
