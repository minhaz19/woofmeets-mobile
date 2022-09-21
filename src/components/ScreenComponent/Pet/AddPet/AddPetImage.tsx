/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import TitleText from '../../../common/text/TitleText';
import ShortText from '../../../common/text/ShortText';
interface Props {
  name: string;
}
const AddPetImage = ({name}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {isDarkMode, colors} = useTheme();
  const [petImage, setPetImage] = useState();
  const {setValue, errors, onBlur, value} = useRHFContext(name);

  function uploadImage(e: any) {
    setValue(name, e._parts[0][1].uri, {
      shouldValidate: errors[name] ? true : false,
    });
  }
  return (
    <View>
      {value === '' && (
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
              <TitleText textStyle={styles.title} text={'Upload Pet Photo'} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      {value !== '' && (
        <View style={styles.container}>
          <Image source={{uri: value}} style={styles.image} />
          <TouchableOpacity
            style={[
              styles.editCon,
              {
                backgroundColor: isDarkMode
                  ? colors.lightBackgroundColor
                  : colors.backgroundColor,
              },
            ]}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}>
            <ShortText textStyle={styles.textStyle} text={'Edit Image'} />
          </TouchableOpacity>
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
  editCon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 4,
  },
  textStyle: {fontWeight: 'bold', color: Colors.primary},
  errorContainer: {},
});
