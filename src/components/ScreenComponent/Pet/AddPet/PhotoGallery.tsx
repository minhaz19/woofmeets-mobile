/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import {FormikValues, useFormikContext} from 'formik';

interface Props {
  label: string;
  subTitle: string;
  imageUrl?: [];
}
const PhotoGallery = ({label, subTitle, imageUrl}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [petImage, setPetImage] = useState();
  const {setFieldValue, values} = useFormikContext<FormikValues>();
  function uploadImage(e: any) {}
  useEffect(() => {
    setFieldValue('photoGallery', petImage);
  }, [petImage, setFieldValue]);
  return (
    <>
      <View style={styles.galleryContainer}>
        {imageUrl ? (
          <>
            <Image source={{uri: petImage}} style={styles.image} />
          </>
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={styles.innerText}>Add Photo</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
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
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.dark.lightDark,
    marginTop: 20,
    borderRadius: 10,
  },
  image: {width: 100, height: 100},
  innerText: {
    fontSize: Text_Size.Text_0,
    color: 'gray',
  },
});
