/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import { setProfileData } from '../../../store/slices/onBoarding/initial';
import { useAppDispatch } from '../../../store/store';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [captionImage, setCaptionImage] = useState({
    id: '',
    caption: '',
    uri: '',
  });
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(true);
  const {colors, isDarkMode} = useTheme();

  const onHandleGallery = () => {
    dispatch(setProfileData({pass: 3}))
  }

  // Get all image
  const endPoint = '/gallery/photo/get-all';
  const {request: getRequest, loading: getLoading} = useApi(methods._get);
  useEffect(() => {
    getImage();
  }, []);
  const getImage = async () => {
    const result = await getRequest(endPoint);
    const imageData = [];
    for (let i = 0; i < result.data.data?.length; i++) {
      imageData.push({
        key: result.data.data[i]?.id,
        name: result.data.data[i]?.imageSrc.url,
        caption: result.data.data[i]?.caption,
      });
    }
    setPhoto(imageData);
  };
  // const uid = () =>
  //   String(Date.now().toString(32) + Math.random().toString(16)).replace(
  //     /\./g,
  //     '',
  //   );

  //Remove photo
  const {request: deleteRequest, loading: deleteLoading} = useApi(
    methods._delete,
  );
  const handleRemove = async (id: string) => {
    const removeEndPoint = `/gallery/photo/delete/${id}`;
    const result = await deleteRequest(removeEndPoint);
    setPhoto(photo?.filter((image: any) => image.key !== result.data.data?.id));
  };

  //Upload photo
  const {request: uploadRequest, loading: uploadLoading} = useApi(
    methods._post,
  );
  const uploadImage = async (_e: any) => {
    const uploadEndPoint = '/gallery/photo/upload';
    const result = await uploadRequest(uploadEndPoint, _e);
    try {
      let imageData = {
        name: result.data.data?.imageSrc?.url,
        key: result.data.data?.id,
        caption: result.data.data?.caption,
      };
      setPhoto([...photo, imageData]);
    } catch (err) {
      console.log(err);
    }
  };

  // drag and drop
  const dragEndpoint = '/gallery/photo/drag-drops';
  const {request: dragRequest} = useApi(methods._put);
  const dragHandler = async (photos: any) => {
    const formattedPhotos = [];
    for (let i = 0; i < photos.length; i++) {
      formattedPhotos.push({id: photos[i].key});
    }
    const data = {
      photos: formattedPhotos,
    };
    const result = await dragRequest(dragEndpoint, data);
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
    setCaptionImage({
      uri: photo.find((p: any) => p.key === id).name,
      id: id,
      caption: photo.find((p: any) => p.key === id).caption,
    });
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
  const captionValue = {caption: captionImage.caption};
  const captionSchema = Yup.object().shape({
    caption: Yup.string().required('Please write a caption').nullable(),
  });
  return (
    <>
      {getLoading && <AppActivityIndicator visible={true} />}
      {deleteLoading && <AppActivityIndicator visible={true} />}
      {uploadLoading && <AppActivityIndicator visible={true} />}
      <ScrollView
        scrollEnabled={scrolling}
        showsVerticalScrollIndicator={false}>
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
            // setPetImage={handleAdd}
          />
          <MiddleModal
            isModalVisible={isEditModalVisible}
            setIsModalVisible={setIsEditModalVisible}
            onBlur={undefined}>
            <AppForm
              initialValues={captionValue}
              validationSchema={captionSchema}>
              <EditCaption
                captionImage={captionImage}
                setIsModalVisible={setIsEditModalVisible}
              />
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
                  dragHandler(uri);
                  setScrolling(true);
                }}
                onDragStart={() => {
                  setScrolling(false);
                }}
              />
            </View>
          ) : (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              onSelect={onHandleGallery}
            />
          </View>
          <BottomSpacing />
        </View>
      </ScrollView>
    </>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    padding: 10,
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
    width: 140,
    height: 140,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },
});
