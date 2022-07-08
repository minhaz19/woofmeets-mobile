/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import Colors from '../../../../constants/Colors';
import {UploadIcon} from '../../../../assets/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from '../../../common/Form/ErrorMessage';

interface Props {
  name: string;
}
const AddPetImage = ({name}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {isDarkMode} = useTheme();
  const [petImage, setPetImage] = useState();
  const {setFieldValue, touched, setFieldTouched, values, errors} =
    useFormikContext<FormikValues>();
  function uploadImage(e: any) {}
  useEffect(() => {
    setFieldValue(name, petImage);
  }, [petImage, name, setFieldValue]);

  return (
    <View>
      {!petImage && (
        <TouchableOpacity
          onPress={() => setIsModalVisible(!isModalVisible)}
          onBlur={() => setFieldTouched(name)}>
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
      )}
      {petImage && (
        <View style={styles.container}>
          <Image
            source={{uri: petImage}}
            style={styles.image}
            // resizeMode="cover"
          />
        </View>
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
        setPetImage={setPetImage}
        onBlur={() => setFieldTouched(name)}
      />
    </View>
  );
};

export default AddPetImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {width: '100%', height: '100%'},
  uploadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Text_Size.Text_0,
    marginLeft: 10,
  },
});
