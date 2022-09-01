/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import {UploadIcon} from '../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../components/common/text/DescriptionText';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ButtonCom from '../../../components/UI/ButtonCom';
import ImageUploadModal from '../../../components/UI/modal/ImageUploadModal';
import Colors from '../../../constants/Colors';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Header from '../../../components/ScreenComponent/becomeSitter/Gallery/Header';
import ImageView from '../../../components/ScreenComponent/becomeSitter/Gallery/ImageView';
import MiddleModal from '../../../components/UI/modal/MiddleModal';
import EditCaption from '../../../components/ScreenComponent/becomeSitter/Gallery/EditCaption';
import AppForm from '../../../components/common/Form/AppForm';
import * as Yup from 'yup';

const Gallery = () => {
  const [photo, setPhoto] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [captionImage, setCaptionImage] = useState('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(true);
  const {colors, isDarkMode} = useTheme();

  const uid = () =>
    String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      '',
    );

  const handleAdd = async (uri: string) => {
    try {
      let imageData = {
        name: uri,
        key: uid(),
      };
      setPhoto([...photo, imageData]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = (id: string) => {
    setPhoto(photo?.filter((image: any) => image.key !== id));
  };
  const uploadImage = (_e: any) => {
    // handleRemove(_e._parts[0][1].uri);
  };
  const handlePress = (id: string) => {
    if (id) {
      Alert.alert('Delete', 'Are you sure you want to delete this image', [
        {
          text: 'Yes',
          onPress: () => {
            handleRemove(id);
          },
        },
        {
          text: 'No',
        },
      ]);
    }
  };
  const handleEdit = (id: string) => {
    setIsEditModalVisible(true);
    setCaptionImage(photo.find((p: any) => p.key === id).name);
  };
  const renderGalleryPlace = (item: any) => {
    return (
      <View key={item.key}>
        <ImageView
          id={item.key}
          handlePress={handlePress}
          name={item.name}
          handleEdit={handleEdit}
        />
      </View>
    );
  };

  return (
    <ScrollView scrollEnabled={scrolling} showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <Header />
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
              <DescriptionText
                text="Upload Pet Photos"
                textStyle={styles.text}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <ImageUploadModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setIsImageLoading={setIsImageLoading}
          uploadImage={uploadImage}
          setPetImage={handleAdd}
        />
        <MiddleModal
          isModalVisible={isEditModalVisible}
          setIsModalVisible={setIsEditModalVisible}
          onBlur={undefined}>
          <AppForm
            initialValues={captionValue}
            validationSchema={captionSchema}>
            <EditCaption captionImage={captionImage} />
          </AppForm>
        </MiddleModal>

        {photo.length > 0 ? (
          <View style={styles.photoContainer}>
            <DraggableGrid
              numColumns={2}
              renderItem={renderGalleryPlace}
              data={photo}
              onDragRelease={(uri: any) => {
                setPhoto(uri);
                setScrolling(true);
              }}
              onDragStart={() => {
                setScrolling(false);
              }}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.imageContainer} />
            <View style={styles.imageContainer} />
          </View>
        )}
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
    </ScrollView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoContainer: {
    flexDirection: 'row',
  },
  uploadContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
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
    paddingTop: SCREEN_WIDTH <= 380 ? '10%' : SCREEN_WIDTH <= 600 ? '6%' : '4%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },
});

const captionValue = {caption: ''};
const captionSchema = Yup.object().shape({
  caption: Yup.string().required('Please write a caption'),
});
