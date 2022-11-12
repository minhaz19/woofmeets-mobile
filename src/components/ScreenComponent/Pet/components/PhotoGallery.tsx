/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../../constants/textScaling';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import {Delete} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import TitleText from '../../../common/text/TitleText';
import HeaderText from '../../../common/text/HeaderText';

interface Props {
  imageUri?: string;
  onChangeImage: any;
  handlePress?: () => void;
  marginTop?: boolean;
}
const PhotoGallery = ({
  imageUri,
  handlePress,
  onChangeImage,
  marginTop = true,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [petImage, setPetImage] = useState();
  const {isDarkMode} = useTheme();

  const handleDelete = () => {
    if (imageUri) {
      Alert.alert('Delete', 'Are you sure you want to delete this image', [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            onChangeImage(null);
          },
        },
      ]);
    }
  };

  const uploadImage = (e: any) => {
    // onChangeImage(e);
    onChangeImage(e._parts[0][1].uri);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.galleryContainer}>
        {imageUri ? (
          <View
            style={{
              ...styles.imageCon,
              marginTop: marginTop ? 20 : 0,
              borderColor: Colors.primary,
            }}>
            <Image source={{uri: imageUri}} style={styles.image} />
            <TouchableOpacity
              style={[
                styles.delete,
                {
                  backgroundColor: isDarkMode
                    ? Colors.dark.lightDark
                    : Colors.primaryLight,
                },
              ]}
              onPress={handleDelete}>
              <Delete width={18} height={18} fill={Colors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.imageContainer, {marginTop: marginTop ? 20 : 0}]}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <HeaderText textStyle={styles.innerText} text="Add Photo" />
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
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
  imageCon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    // marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {width: '100%', height: '100%'},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    // marginTop: 20,
    borderRadius: 10,
    borderColor: 'gray',
  },
  innerText: {
    fontSize: Text_Size.Text_9,
    color: 'gray',
  },
  delete: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 5,
  },
});
