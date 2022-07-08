/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';

interface Props {
  label: string;
  subTitle: string;
}
const PhotoGallery = ({label, subTitle}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [petImage, setPetImage] = useState();
  const uploadImage = (e: any) => {
    console.log('upload', e);
  };
  return (
    <>
      <View style={styles.galleryContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setIsModalVisible(!isModalVisible)}>
          <Text style={styles.innerText}>Add Photo</Text>
        </TouchableOpacity>
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
  innerText: {
    fontSize: Text_Size.Text_0,
    color: 'gray',
  },
});
