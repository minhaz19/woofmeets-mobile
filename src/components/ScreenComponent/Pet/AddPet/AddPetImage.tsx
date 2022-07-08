/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import Colors from '../../../../constants/Colors';
import {UploadIcon} from '../../../../assets/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

const AddPetImage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {isDarkMode} = useTheme();
  const [petImage, setPetImage] = useState();
  const uploadImage = (e: any) => {
    console.log('upload', e);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode
                ? Colors.dark.lightDark
                : Colors.primaryLight,
            },
          ]}>
          <View style={styles.uploadInfo}>
            <UploadIcon />
            <Text style={styles.title}>Upload Pet Photo</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
        setPetImage={setPetImage}
      />
    </View>
  );
};

export default AddPetImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Text_Size.Text_0,
    marginLeft: 10,
  },
});
