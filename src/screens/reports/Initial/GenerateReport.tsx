/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import PhotoGalleryList from '../../../components/common/ImagePicker/PhotoGalleryList';
import HeaderText from '../../../components/common/text/HeaderText';
import ReportPet from './ReportPet';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {setPhoto} from '../../../store/slices/reportCard/reportCardSlice';
import Colors from '../../../constants/Colors';

const GenerateReport = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
}) => {
  const {colors, isDarkMode} = useTheme();
  const dispatch = useAppDispatch();
  const {isPeeSelected, isPooSelected, isWaterSelected, isFoodSelected, photo} =
    useAppSelector((state: any) => state?.reportCard);
  const {pets} = useAppSelector((state: any) => state?.allPets);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
 
  //Remove photo
  // const {request: deleteRequest, loading: deleteLoading} = useApi(
  //   methods._delete,
  // );
  const handleRemove = async (uri: string) => {
    // const removeEndPoint = `/gallery/photo/delete/${uri}`;
    // const result = await deleteRequest(removeEndPoint);
    dispatch(setPhoto(photo?.filter((image: any) => image !== uri)));
  };

  //Upload photo
  // const {request: uploadRequest, loading: uploadLoading} = useApi(
  //   methods._post,
  // );
  const handleAdd = async (_e: any) => {
    // const uploadEndPoint = '/gallery/photo/upload';
    // const result = await uploadRequest(uploadEndPoint, _e);
    // try {
    //   let imageData = {
    //     name: result.data.data?.imageSrc?.url,
    //     key: result.data.data?.id,
    //     caption: result.data.data?.caption,
    //   };
    //   setPhoto([...photo, imageData]);
    // } catch (err) {}
    dispatch(setPhoto([...photo, _e]));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {backgroundColor: Colors.iosBG},
      ]}>
      <View
        style={{
          backgroundColor: colors.backgroundColor,
          paddingHorizontal: 15,
          marginVertical: 10,
        }}>
        <PhotoGalleryList
          label={'Photos'}
          imageUris={photo}
          onRemoveImage={handleRemove}
          onAddImage={handleAdd}
          handlePress={() => {}}
          marginTop={false}
        />
      </View>
      <View>
        <HeaderText
          text="Activities"
          textStyle={{paddingVertical: 10, marginHorizontal: 15}}
        />
        {proposedServiceInfo?.petsInfo?.map(
          (item: {id: number; pet: any; profile_image: {url: any}}) => (
            <ReportPet
              key={item?.id}
              id={item?.id}
              title={item?.pet?.name}
              rowImage
              image={item?.pet?.profile_image.url}
              isPeeSelected={isPeeSelected}
              isPooSelected={isPooSelected}
              isFoodSelected={isFoodSelected}
              isWaterSelected={isWaterSelected}
            />
          ),
        )}
      </View>
      <View style={{marginHorizontal: '5%'}}>
        <ButtonCom
          title={'Send Report Card'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={{
            ...btnStyles.containerStyleFullWidth,
            borderRadius: 8,
          }}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => props.navigation.navigate('ReportCard')}
        />
        <BottomSpacing />
      </View>
    </ScrollView>
  );
};

export default GenerateReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
