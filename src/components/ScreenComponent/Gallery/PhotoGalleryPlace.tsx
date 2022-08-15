import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';

interface Props {
  imageUri?: string;
  onChangeImage?: any;
}

const PhotoGalleryPlace: FC<Props> = ({imageUri, onChangeImage}) => {
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
  return (
    <View style={styles.galleryContainer}>
      {imageUri ? (
        <TouchableOpacity onPress={handlePress}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableOpacity>
      ) : (
        // <View style={styles.flexContainer}>
        //   <View style={[styles.imageContainer, {marginRight: 20}]}></View>
          <View style={styles.imageContainer}></View>
        // </View>
      )}
    </View>
  );
};

export default PhotoGalleryPlace;

const styles = StyleSheet.create({
  galleryContainer: {
    marginVertical: 20,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 130,
    marginTop: 20,
    borderRadius: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 130,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'gray',
  },
});
