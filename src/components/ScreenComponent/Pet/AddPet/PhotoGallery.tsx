/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import {FormikValues, useFormikContext} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  label: string;
  subTitle: string;
  imageUri?: string;
  onChangeImage: any;
}
const PhotoGallery = ({label, subTitle, imageUri, onChangeImage}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [petImage, setPetImage] = useState();
  const {setFieldValue, values} = useFormikContext<FormikValues>();

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
  function uploadImage(e: any) {}
  const uploadImageUri = (uri: string) => {
    onChangeImage(uri);
  };
  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.galleryContainer}>
        {imageUri ? (
          // <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.imageContainer} />
        ) : (
          // </View>
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
  image: {width: 100, height: 100},
  innerText: {
    fontSize: Text_Size.Text_0,
    color: 'gray',
  },
});
