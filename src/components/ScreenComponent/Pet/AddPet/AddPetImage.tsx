/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import Colors from '../../../../constants/Colors';
import {UploadIcon} from '../../../../assets/svgs/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';
interface Props {
  name: string;
}
const AddPetImage = ({name}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {isDarkMode} = useTheme();
  const [petImage, setPetImage] = useState();
  const {setValue, errors, onBlur, value} = useRHFContext(name);

  function uploadImage(e: any) {
    setValue(name, e._parts[0][1].uri, {
      shouldValidate: errors.name ? true : false,
    });
  }
  const uploadImageUri = () => {} 
  return (
    <View>
      {!petImage && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsModalVisible(!isModalVisible);
          }}
          onBlur={onBlur}>
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
        </TouchableWithoutFeedback>
      )}
      {petImage && (
        <View style={styles.container}>
          <Image source={{uri: petImage}} style={styles.image} />
        </View>
      )}
      <View style={styles.errorContainer}>
        <ErrorMessage error={errors[name]?.message} />
      </View>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
        uploadImageUri={uploadImageUri}
        setPetImage={setPetImage}
      />
    </View>
  );
};

export default memo(AddPetImage);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {width: '100%', height: '100%'},
  uploadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderColor: 'gray',
  },
  title: {
    fontSize: Text_Size.Text_0,
    marginLeft: 10,
  },
  errorContainer: {},
});
