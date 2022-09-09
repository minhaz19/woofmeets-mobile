import React from 'react';
import ErrorMessage from '../Form/ErrorMessage';
import PhotoGalleryList from './PhotoGalleryList';
import GalleryImageCaptionModal from '../../ScreenComponent/Pet/AddPet/components/GalleryImageCaption';
import {useImagePicker} from './utils/useImagePicker';

interface Props {
  label: string;
  subTitle: string;
  name: string;
  methods?: any;
}
const AppImagePicker = ({label, name, subTitle}: Props) => {
  const {
    handleAdd,
    handleRemove,
    handlePress,
    handleSubmit,
    value,
    errors,
    isVisible,
    setIsVisible,
    selectedImgInfo,
  } = useImagePicker(name);

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
      {isVisible && (
        <GalleryImageCaptionModal
          isVisible={true}
          selectedImgInfo={selectedImgInfo}
          setIsVisible={setIsVisible}
          onPress={handleSubmit}
        />
      )}
    </>
  );
};

export default AppImagePicker;
