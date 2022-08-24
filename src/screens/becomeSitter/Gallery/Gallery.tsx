import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {UploadIcon} from '../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../components/common/text/DescriptionText';
import TitleText from '../../../components/common/text/TitleText';
import PhotoGalleryPlace from '../../../components/ScreenComponent/becomeSitter/Gallery/PhotoGalleryPlace';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ButtonCom from '../../../components/UI/ButtonCom';
import ImageUploadModal from '../../../components/UI/modal/ImageUploadModal';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

const Gallery = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [photo, setPhoto] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {colors, isDarkMode} = useTheme();

  const handleAdd = (uri: string) => {
    setPhoto([...photo, uri]);
  };
  const handleRemove = (uri: string) => {
    setPhoto(photo.filter((imageUri: string) => imageUri !== uri));
  };
  const uploadImage = (_e: any) => {};
  const uploadImageUri = (uri: string) => {
    handleRemove(uri);
  };
  return (
    <View
      style={[styles.rootContainer, {backgroundColor: colors.backgroundColor}]}>
      <View>
        <TitleText textStyle={styles.label} text={'Gallery Photos'} />
        <DescriptionText
          textStyle={styles.subTitle}
          text={
            'Add Photos of yourself with pets (including your own ) to show the care and attention you give to them . If possible, try to include photos of yourself walking or playing with pets. We suggest 5 - 10 of your best photos .'
          }
        />

        <ScrollView
          horizontal
          ref={scrollRef}
          onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.photoContainer}>
            {photo?.map(uri => (
              <View key={uri} style={styles.image}>
                <PhotoGalleryPlace
                  imageUri={uri}
                  onChangeImage={() => handleRemove(uri)}
                />
              </View>
            ))}
            <PhotoGalleryPlace />
          </View>
        </ScrollView>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={[
            styles.uploadContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.dark.lightDark
                : Colors.primaryLight,
            },
          ]}>
          <View style={styles.uploadInfo}>
            <UploadIcon />
            <DescriptionText text="Upload Pet Photos" textStyle={styles.text} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
        setPetImage={handleAdd}
        uploadImageUri={uploadImageUri}
      />
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Save & Continue'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  photoContainer: {
    flexDirection: 'row',
  },
  uploadContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    marginRight: 10,
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    lineHeight: Text_Size.Text_0 * 1.5,
    color: Colors.subText,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginLeft: 10,
  },
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
  footerContainer: {
    paddingTop:
      SCREEN_WIDTH <= 380 ? '10%' : SCREEN_WIDTH <= 600 ? '10%' : '4%',
  },
});
