/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text_Size from '../../constants/textScaling';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import TitleText from '../../components/common/text/TitleText';
import ButtonCom from '../../components/UI/ButtonCom';
import {btnStyles} from '../../constants/theme/common/buttonStyles';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import ScreenRapper from '../../components/common/ScreenRapper';
import ErrorMessage from '../../components/common/Form/ErrorMessage';
import ServiceCard from '../../components/ScreenComponent/search/ServiceCard';
import SearchSlider from '../../components/ScreenComponent/search/SearchSlider';
import SwitchView from '../../components/common/switch/SwitchView';
import PetCard from '../../components/ScreenComponent/search/PetCard';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import BottomSpacing from '../../components/UI/BottomSpacing';
import {useAppDispatch, useAppSelector} from '../../store/store';
import AppActivityIndicator from '../../components/common/Loaders/AppActivityIndicator';
import {getAllProvider} from '../../store/slices/Provider/allProvider/getAllProvider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ServiceTypesLoader from './ServiceTypesLoader';
import {getServiceTypes} from '../../store/slices/profile/services';
import {getAllPets} from '../../store/slices/pet/allPets/allPetsAction';

const petData = [
  {
    id: 1,
    sequence: 1,
    name: 'Dog',
    selected: false,
    icon: true,
    slug: 'dog',
  },
  {
    id: 2,
    sequence: 2,
    name: 'Cat',
    selected: false,
    icon: true,
    slug: 'cat',
  },
];
// const endPoint = '/provider';
const PetCareZipSearch = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {serviceTypes, loading: serviceTypesLoading} = useAppSelector(
    (state: any) => state?.services,
  );
  const {pets, loading: petsLoading} = useAppSelector(
    (state: any) => state?.allPets,
  );
  // const [postCode, setPostCode] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isMyPetEnabled, setIsMyPetEnabled] = useState(false);
  const [petType, setPetType] = useState(petData);
  const [myPet, setMyPet] = useState<any[]>([]);
  const [location, setLocation] = useState({
    lat: 40.702078,
    lng: -73.822156,
  });
  const [sequence, setSequence] = useState<number>(0);
  const [serviceData, setServiceData] = useState({
    service: '',
    serviceId: '',
  });

  const {colors, isDarkMode} = useTheme();
  const dispatch = useAppDispatch();

  // updating the state
  useEffect(() => {
    if (pets) {
      setMyPet(pets);
    }
  }, [pets]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getServiceTypes());
    dispatch(getAllPets());
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  // select service Data
  const onPressService = (data: any) => {
    setSequence(data?.id);
    setServiceData({
      service: data?.slug,
      serviceId: data?.id,
    });
    setErrorMessage(null);
  };

  // select pet
  const onPressPet = (id: number) => {
    if (isMyPetEnabled) {
      const myNewPet = myPet.map((item: any) => {
        if (item.id === id) {
          return {...item, selected: !item.selected};
        } else {
          return item;
        }
      });
      setMyPet(myNewPet);
    } else {
      const newPetType = petType.map((item: any) => {
        if (item.id === id) {
          return {...item, selected: !item.selected};
        } else {
          return item;
        }
      });
      setPetType(newPetType);
    }
  };

  // const handleZipCode = (code: number) => {
  //   let reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  //   setPostCode(code);
  //   if (reg.test(code) === false) {
  //     setErrorMessage('Zip code is not valid');
  //   } else {
  //     setErrorMessage(null);
  //   }
  // };

  // lat lng
  const onPressAddress = (data: any, details: any) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    setLocation({lat: lat, lng: lng});
  };

  // submitting the data and get request
  const handleSubmit = async () => {
    const selectedPetType = petType
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.slug);
    const selectedMyPet = myPet
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.id);
    let formattedData;
    if (isMyPetEnabled) {
      formattedData = {
        service: serviceData.service,
        serviceId: serviceData.serviceId,
        petsId: selectedMyPet.toString(),
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      formattedData = {
        service: serviceData.service,
        serviceId: serviceData.serviceId,
        pet_type: selectedPetType.toString(),
        lat: location.lat,
        lng: location.lng,
      };
    }
    if (formattedData.service) {
      dispatch(getAllProvider(formattedData));
      props.navigation.navigate('AllProvider');
    } else {
      setErrorMessage('Service must be selected');
    }
  };
  const RenderHeader = () => {
    return (
      <View>
        {/* <TitleText text="I want" textStyle={styles.textHeader} />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {serviceTypes &&
            serviceTypes.map((item: any) => (
              <ServiceCard
                key={item.id}
                data={item}
                noShadow
                onPressEvent={onPressService}
                sequence={sequence}
              />
            ))}
        </View> */}
        {serviceTypesLoading || !serviceTypes ? (
          <ServiceTypesLoader />
        ) : (
          <View>
            <TitleText text="I want" textStyle={styles.textHeader} />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {serviceTypes &&
                serviceTypes.map((item: any) => (
                  <ServiceCard
                    key={item.id}
                    data={item}
                    noShadow
                    onPressEvent={onPressService}
                    sequence={sequence}
                  />
                ))}
            </View>
          </View>
        )}
        <View style={styles.textHeader}>
          {errorMessage && <ErrorMessage error={errorMessage} />}
        </View>
        <View style={styles.headerContainer}>
          <TitleText
            text="Looking service for my"
            textStyle={styles.petTitleText}
          />
          {myPet && myPet.length > 0 && (
            <View style={styles.switchContainer}>
              <TitleText
                textStyle={{...styles.petTitleText, paddingRight: 6}}
                text={'My Pet'}
              />
              <SwitchView
                isActive={isMyPetEnabled}
                activeText=""
                inActiveText=""
                onSelect={is => {
                  setIsMyPetEnabled(is);
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          {isMyPetEnabled
            ? myPet.map((item: any) => (
                <PetCard
                  key={item.id}
                  data={item}
                  noShadow
                  onPressEvent={onPressPet}
                />
              ))
            : petType.map(item => (
                <PetCard
                  key={item.id}
                  data={item}
                  noShadow
                  onPressEvent={onPressPet}
                  divide={2}
                />
              ))}
        </View>
      </View>
    );
  };

  return (
    <>
      {/* {serviceTypesLoading && petsLoading && (
        <AppActivityIndicator visible={true} />
      )} */}
      <ScreenRapper rapperStyle={styles.rapperStyle}>
        <KeyboardAwareScrollView
          extraHeight={100}
          extraScrollHeight={200}
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          // keyboardVerticalOffset={20}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.rootContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.boxContainer}>
              <SearchSlider navigation={props.navigation} />
              <RenderHeader />
              <View style={styles.zipContainer}>
                <TitleText text="Near" textStyle={styles.zipText} />
                <GooglePlacesAutocomplete
                  placeholder="Type a place"
                  onPress={onPressAddress}
                  query={{key: 'AIzaSyCfhL0D8h89t_m4xilQ-Nb8rlVpzXqAjdo'}}
                  fetchDetails={true}
                  onFail={error => console.log(error)}
                  onNotFound={() => console.log('no results')}
                  keyboardShouldPersistTaps={'always'}
                  keepResultsAfterBlur={true}
                  styles={{
                    container: {
                      flex: 0,
                    },
                    description: {
                      color: colors.headerText,
                      fontSize: Text_Size.Text_11,
                    },
                    textInput: {
                      backgroundColor: isDarkMode
                        ? Colors.dark.background
                        : Colors.light.background,
                      height: 40,
                      borderRadius: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      fontSize: Text_Size.Text_0,
                      borderColor: colors.borderColor,
                      borderWidth: 1,
                      flex: 1,
                      color: colors.headerText,
                    },
                    predefinedPlacesDescription: {
                      color: colors.headerText,
                    },
                    poweredContainer: {
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderColor: '#c8c7cc',
                      borderTopWidth: 0.5,
                      backgroundColor: isDarkMode
                        ? Colors.dark.background
                        : Colors.light.background,
                    },
                    row: {
                      backgroundColor: isDarkMode
                        ? Colors.dark.background
                        : Colors.light.background,
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                    },
                  }}
                />
                <View style={styles.footerContainer}>
                  <ButtonCom
                    title="Search"
                    // loading={getLoading}
                    textAlignment={btnStyles.textAlignment}
                    containerStyle={btnStyles.containerStyleFullWidth}
                    titleStyle={btnStyles.titleStyle}
                    onSelect={handleSubmit}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <BottomSpacing />
        </KeyboardAwareScrollView>
      </ScreenRapper>
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // paddingBottom: 80,
  },
  rapperStyle: {
    paddingTop: 20,
  },
  scrollContainer: {
    // paddingHorizontal: '5%',
  },
  boxContainer: {
    // paddingHorizontal: '10%'
  },
  textHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: '500',
    paddingLeft: '4%',
    paddingBottom: 8,
  },
  footerContainer: {
    paddingHorizontal: '10%',
    paddingTop: 20,
    paddingBottom: 40,
  },
  flatList: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 40 : 50,
    fontSize: Text_Size.Text_11,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
  zipText: {
    fontSize: Text_Size.Text_0,
    fontWeight: '500',
    paddingBottom: 10,
  },
  zipContainer: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
    paddingLeft: '3%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  petTitleText: {
    fontSize: Text_Size.Text_1,
    fontWeight: '500',
    paddingBottom: 8,
  },
});

export default PetCareZipSearch;
