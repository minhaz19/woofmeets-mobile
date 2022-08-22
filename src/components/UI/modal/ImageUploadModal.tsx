/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import mime from 'mime';
import Text_Size from '../../../constants/textScaling';
interface OptionType {
  maxWidth: number;
  maxHeight: number;
  title: string;
  storageOptions: {
    skipBackup: boolean;
    path: string;
  };
  quality: number;
}
const ImageUploadModal = (props: {
  setIsImageLoading: (arg0: boolean) => void;
  setIsModalVisible: (arg0: boolean) => void;
  setPetImage: (arg0: any) => void;
  uploadImage: (arg0: FormData) => void;
  uploadImageUri?: (arg0: string) => void;
  isModalVisible: boolean | undefined;
  onBlur?: () => void;
}) => {
  //Camera Options
  const openImagePickerAsync = async () => {
    await ImagePickerAsync();
  };

  let ImagePickerAsync = async () => {
    props.setIsImageLoading(true);
    // setImageError(null);
    props.setIsModalVisible(false);
    let options: OptionType = {
      maxWidth: 1080,
      maxHeight: 720,
      quality: 0.4,
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    //@ts-ignore
    await ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        props.setIsImageLoading(false);
        // @ts-ignore
      } else if (response?.error) {
        // setImageError(response.error);
      } else {
        // @ts-ignore
        const response1 = response?.assets[0];
        let formData = new FormData();
        props?.setPetImage(response1.uri);
        formData.append('file', {
          uri: response1.uri,
          // @ts-ignore
          type: mime.getType(response1.uri),
          name: response1.fileName,
        });
        props?.uploadImage(formData);
      }
    });
  };

  const handleCaptureImage = async () => {
    props.setIsImageLoading(true);
    props.setIsModalVisible(false);
    let options: OptionType = {
      maxWidth: 1080,
      maxHeight: 720,
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.4,
    };
    ImagePicker.launchCamera(
      // @ts-ignore
      options,
      (response: {
        didCancel: any;
        error: any;
        errorCode: string;
        assets: any[];
      }) => {
        if (response.didCancel) {
          props.setIsImageLoading(false);
        } else if (response.error) {
          props.setIsImageLoading(false);
        } else if (response.errorCode === 'camera_unavailable') {
          props.setIsImageLoading(false);
          let alrt = 'Camera not available on device';
          return;
        } else {
          const response1 = response.assets[0];
          let formData = new FormData();
          props?.setPetImage(response1.uri);
          props.setIsImageLoading(false);
          // @ts-ignore
          // props?.uploadImageUri(response1.uri);
          formData.append('file', {
            uri: response1.uri,
            type: mime.getType(response1.uri),
            name: response1.fileName,
          });
          props?.uploadImage(formData);
        }
      },
    );
  };

  return (
    <TouchableWithoutFeedback
      onBlur={props.onBlur}
      onPress={() => props.setIsModalVisible(false)}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}>
        <TouchableWithoutFeedback
          onPress={() => props.setIsModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleCaptureImage}>
                <Image
                  source={require('../../../assets/camera.png')}
                  style={styles.iconView}
                />
                <Text style={styles.modalText}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={openImagePickerAsync}>
                <Image
                  source={require('../../../assets/image-gallery.png')}
                  style={styles.iconView}
                />
                <Text style={styles.modalText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  //Modal
  centeredView: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: Text_Size.Text_1,
  },
  iconContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
  iconView: {height: 80, width: 80, marginBottom: 10},
  modalView: {
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
});

export default ImageUploadModal;
