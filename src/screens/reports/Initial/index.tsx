/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
// import InputItem from '../../../components/ScreenComponent/reports/Cards/InputItem';
import StaticMap from '../map/NavigateMap';
// import {useAppDispatch, useAppSelector} from '../../../store/store';
import getLiveLocation from '../map/helperFunction/useGetLiveLocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {ScrollView} from 'react-native-gesture-handler';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
// import ReportModal from './ReportModal';
// import {
//   setIsFoodSelected,
//   setIsPeeSelected,
//   setIsPooSelected,
//   setIsWaterSelected,
//   // setPhoto,
// } from '../../../store/slices/reportCard/reportCardSlice';
// import PhotoGalleryList from '../../../components/common/ImagePicker/PhotoGalleryList';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const ReportCardInitial = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
}) => {
  // const [items] = useState([
  //   {
  //     id: 1,
  //     sequence: 1,
  //     name: 'Pee',
  //     title: 'Who Peed',
  //     icon: (
  //       <MaterialIcons
  //         name="waterfall-chart"
  //         size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
  //         color={Colors.primary}
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     sequence: 2,
  //     name: 'Poo',
  //     title: 'Who Poop',
  //     icon: (
  //       <MaterialCommunityIcons
  //         name="emoticon-poop"
  //         size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
  //         color={Colors.primary}
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     sequence: 3,
  //     name: 'Food',
  //     title: 'Who Eats Food',
  //     icon: (
  //       <MaterialCommunityIcons
  //         name="pot-mix-outline"
  //         size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
  //         color={Colors.primary}
  //       />
  //     ),
  //   },
  //   {
  //     id: 4,
  //     sequence: 4,
  //     name: 'Water',
  //     title: 'Who Drink Water',
  //     icon: (
  //       <Entypo
  //         name="water"
  //         size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
  //         color={Colors.primary}
  //       />
  //     ),
  //   },
  // ]);
  // const {pets} = useAppSelector((state: any) => state?.allPets);
  // const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  // const [sequence, setSequence] = useState<number>(0);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const {colors} = useTheme();
  // const dispatch = useAppDispatch();
  // const currentUserLocation = useAppSelector(
  //   (state: any) => state.address.currentUserLocation,
  // );
  // console.log(proposedServiceInfo?.petsInfo);
  // useEffect(() => {
  //   dispatch(setIsPeeSelected(proposedServiceInfo?.petsInfo));
  //   dispatch(setIsPooSelected(proposedServiceInfo?.petsInfo));
  //   dispatch(setIsFoodSelected(proposedServiceInfo?.petsInfo));
  //   dispatch(setIsWaterSelected(proposedServiceInfo?.petsInfo));
  // }, [currentUserLocation, dispatch, proposedServiceInfo?.petsInfo]);

  // const {isPeeSelected, isPooSelected, isWaterSelected, isFoodSelected, photo} =
  //   useAppSelector((state: any) => state?.reportCard);

  //modal visible
  // const onPressService = (data: any) => {
  //   setSequence(data?.id);
  //   setIsModalVisible(true);
  // };
  getLiveLocation();

  //handle Switch
  // const handleSwitch = (id: number) => {
  //   if (sequence === 1) {
  //     const myNewPet = isPeeSelected?.map((item: any) => {
  //       if (item.id === id) {
  //         return {...item, selected: !item.selected};
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsPeeSelected(myNewPet));
  //   } else if (sequence === 2) {
  //     const myNewPet = isPooSelected?.map((item: any) => {
  //       if (item.id === id) {
  //         return {...item, selected: !item.selected};
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsPooSelected(myNewPet));
  //   } else if (sequence === 3) {
  //     const myNewPet = isFoodSelected?.map((item: any) => {
  //       if (item.id === id) {
  //         return {...item, selected: !item.selected};
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsFoodSelected(myNewPet));
  //   } else {
  //     const myNewPet = isWaterSelected?.map((item: any) => {
  //       if (item.id === id) {
  //         return {...item, selected: !item.selected};
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsWaterSelected(myNewPet));
  //   }
  // };

  // handle pet Report
  // const handlePress = () => {
  //   if (sequence === 1) {
  //     const myNewPet = isPeeSelected?.map((item: any) => {
  //       if (item.selected) {
  //         return {...item, pee: item.pee ? item.pee + 1 : 1, selected: false};
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsPeeSelected(myNewPet));
  //   } else if (sequence === 2) {
  //     const myNewPet = isPooSelected?.map((item: any) => {
  //       if (item.selected) {
  //         return {...item, poo: item.poo ? item.poo + 1 : 1, selected: false};
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsPooSelected(myNewPet));
  //   } else if (sequence === 3) {
  //     const myNewPet = isFoodSelected?.map((item: any) => {
  //       if (item.selected) {
  //         return {
  //           ...item,
  //           food: item.food ? item.food + 1 : 1,
  //           selected: false,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsFoodSelected(myNewPet));
  //   } else {
  //     const myNewPet = isWaterSelected?.map((item: any) => {
  //       if (item.selected) {
  //         // setIsWater(isWater + 1);
  //         return {
  //           ...item,
  //           water: item.water ? item.water + 1 : 1,
  //           selected: false,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //     dispatch(setIsWaterSelected(myNewPet));
  //   }
  // };

  //Remove photo
  // const {request: deleteRequest, loading: deleteLoading} = useApi(
  //   methods._delete,
  // );
  // const handleRemove = async (uri: string) => {
  //   // const removeEndPoint = `/gallery/photo/delete/${uri}`;
  //   // const result = await deleteRequest(removeEndPoint);
  //   dispatch(setPhoto(photo?.filter((image: any) => image !== uri)));
  // };

  //Upload photo
  // const {request: uploadRequest, loading: uploadLoading} = useApi(
  //   methods._post,
  // );
  // const handleAdd = async (_e: any) => {
  //   // const uploadEndPoint = '/gallery/photo/upload';
  //   // const result = await uploadRequest(uploadEndPoint, _e);
  //   // try {
  //   //   let imageData = {
  //   //     name: result.data.data?.imageSrc?.url,
  //   //     key: result.data.data?.id,
  //   //     caption: result.data.data?.caption,
  //   //   };
  //   //   setPhoto([...photo, imageData]);
  //   // } catch (err) {}
  //   dispatch(setPhoto([...photo, _e]));
  // };
  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {sequence === 1 ? (
          <ReportModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            sequence={sequence}
            isSelectedPet={isPeeSelected}
            onPress={handleSwitch}
            handlePress={handlePress}
            items={items}
            pets={proposedServiceInfo?.petsInfo}
          />
        ) : sequence === 2 ? (
          <ReportModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            sequence={sequence}
            isSelectedPet={isPooSelected}
            onPress={handleSwitch}
            handlePress={handlePress}
            items={items}
            pets={proposedServiceInfo?.petsInfo}
          />
        ) : sequence === 3 ? (
          <ReportModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            sequence={sequence}
            isSelectedPet={isFoodSelected}
            onPress={handleSwitch}
            handlePress={handlePress}
            items={items}
            pets={proposedServiceInfo?.petsInfo}
          />
        ) : (
          <ReportModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            sequence={sequence}
            isSelectedPet={isWaterSelected}
            onPress={handleSwitch}
            handlePress={handlePress}
            items={items}
            pets={proposedServiceInfo?.petsInfo}
          />
        )} */}
        {/* <View style={styles.tabContainer}>
          {items.map(item => (
            <InputItem
              key={item.id}
              data={item}
              noShadow
              onPressEvent={onPressService}
              sequence={sequence}
            />
          ))}
        </View> */}
        <View style={{height: 200}}>
          <StaticMap />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 15,
            backgroundColor: colors.backgroundColor,
          }}>
          <View
            style={{
              paddingTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <TitleText text="Dog Walk Time" />
              <BigText
                text="00:00:40"
                textStyle={{fontSize: Text_Size.Text_1}}
              />
            </View>
            <View>
              <TitleText text="Distance" />
              <BigText
                text="00:00:40"
                textStyle={{fontSize: Text_Size.Text_1}}
              />
            </View>
            <View style={{maxWidth: 240}}>
              <ButtonCom
                title={'Stop'}
                textAlignment={btnStyles.textAlignment}
                containerStyle={{
                  ...btnStyles.containerStyleFullWidth,
                  borderRadius: 8,
                }}
                titleStyle={btnStyles.titleStyle}
                onSelect={() => {}}
              />
            </View>
          </View>
        </View>
        {/* <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
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
        </View> */}
        {
          <View style={styles.buttonContainer}>
            <ButtonCom
              title={'Generate Report'}
              textAlignment={btnStyles.textAlignment}
              containerStyle={{
                ...btnStyles.containerStyleFullWidth,
                borderRadius: 8,
              }}
              titleStyle={btnStyles.titleStyle}
              onSelect={() => props.navigation.navigate('GenerateReport')}
            />
          </View>
        }
        <BottomSpacing />
      </ScrollView>
    </ScreenRapperGrey>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  containerStyle: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 50,
    width: '40%',
    marginTop: '1%',
    borderRadius: 4,
  },
  textAlignment: {
    color: Colors.light.background,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_8,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Text_Size.Text_8,
  },
  buttonContainer: {paddingHorizontal: 15, paddingTop: 15},
});
export default ReportCardInitial;
