/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../../constants/textScaling';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';

interface Props {
  imageUri?: string;
  onChangeImage: any;
}
const PhotoGallery = ({imageUri, onChangeImage}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [petImage, setPetImage] = useState();

  const handlePress = () => {
    if (imageUri) {
      Alert.alert('Delete', 'Are you sure you want to delete this image', [
        {
          text: 'Yes',
          onPress: () => {
            onChangeImage(null);
          },
        },
        {
          text: 'No',
        },
      ]);
    }
  };
  const uploadImage = (e: any) => {};
  const uploadImageUri = (uri: string) => {
    onChangeImage(uri);
  };
  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.galleryContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={styles.innerText}>Add Photo</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
        uploadImageUri={uploadImageUri}
        setPetImage={setPetImage}
      />
    </>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  galleryContainer: {
    marginVertical: 20,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'gray',
  },
  innerText: {
    fontSize: Text_Size.Text_0,
    color: 'gray',
  },
});
