/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Pressable,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text_Size from '../../constants/textScaling';
import TitleText from '../../components/common/text/TitleText';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import ServiceCard from '../../components/ScreenComponent/search/ServiceCard';
import SwitchView from '../../components/common/switch/SwitchView';
import PetCard from '../../components/ScreenComponent/search/PetCard';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getAllProviderOneTime} from '../../store/slices/Provider/allProvider/getAllProvider';
import ServiceTypesLoader from './ServiceTypesLoader';
import {getServiceTypes} from '../../store/slices/profile/services';
import {getAllPets} from '../../store/slices/pet/allPets/allPetsAction';
import {
  setIsService,
  setSelectedPet,
  setPetType,
  setLocation,
  setSelectedHome,
  setMultiSliderValue,
  setDropIn,
  setDropOut,
  setIsYardEnabled,
  setServiceFrequency,
  setScheduleId,
  setFormattedData,
  setFormattedAddress,
} from '../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {days} from '../../utils/config/Data/filterProviderDatas';
import methods from '../../api/methods';
import {useApi} from '../../utils/helpers/api/useApi';
import {baseUrlV} from '../../utils/helpers/httpRequest';
import ShortText from '../../components/common/text/ShortText';
import {getWhoAmI} from '../../store/slices/common/whoAmI/whoAmIAction';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {getUserOnboardStatus} from '../../store/slices/connect/stripe';
import ScreenRapper from '../../components/common/ScreenRapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchSlider from '../../components/ScreenComponent/search/SearchSlider';
import GooglePredictLocation from '../../components/common/GooglePredictLocations';
import ErrorMessage from '../../components/common/Form/ErrorMessage';
import ButtonCom from '../../components/UI/ButtonCom';
import {btnStyles} from '../../constants/theme/common/buttonStyles';
import BottomSpacing from '../../components/UI/BottomSpacing';

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
const PetCareZipSearch = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {serviceTypes, loading: serviceTypesLoading} = useAppSelector(
    (state: any) => state?.services,
  );
  const {pets} = useAppSelector((state: any) => state?.allPets);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isMyPetEnabled, setIsMyPetEnabled] = useState(false);
  const [selectPetType, setSelectPetType] = useState(petData);
  const [myPet, setMyPet] = useState<any[]>([]);
  const [careLocation, setCareLocation] = useState({
    lat: null,
    lng: null,
  });
  const [addressLine, setAddressLine] = useState(null);
  const [sequence, setSequence] = useState<number>(1);
  const [serviceData, setServiceData] = useState({
    service: 'boarding',
    serviceId: 1,
  });
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const {user} = useAppSelector((state: any) => state.whoAmI);
  const {userOnboardStatus} = useAppSelector(state => state.stripe);


  
  // updating the state
  useEffect(() => {
    if (pets) {
      setMyPet(pets);
    } else {
      setPetType([]);
    }
  }, [pets]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getWhoAmI());
    dispatch(getServiceTypes());
    dispatch(getAllPets());
    dispatch(getUserOnboardStatus());
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  // select service Data
  const onPressService = (data: any) => {
    setSequence(data?.sequence);
    setServiceData({
      service: data?.slug,
      serviceId: data?.id,
    });
  };

  // select pet
  const onPressPet = (id: number) => {
    if (isMyPetEnabled) {
      const myNewPet = myPet?.map((item: any) => {
        if (item.id === id) {
          return {...item, selected: !item.selected};
        } else {
          return item;
        }
      });
      setMyPet(myNewPet);
    } else {
      const newPetType = selectPetType.map((item: any) => {
        if (item.id === id) {
          return {...item, selected: !item.selected};
        } else {
          return item;
        }
      });
      setSelectPetType(newPetType);
    }
  };
  // lat lng
  const onPressAddress = (details: any) => {
    const lat = details?.geometry?.location.lat;
    const lng = details?.geometry?.location.lng;
    setCareLocation({lat: lat, lng: lng});
    setAddressLine(details?.formatted_address);
    setErrorMessage(null);
  };
  // submitting the data and get request
  const {request, loading} = useApi(methods._get);
  const handleSubmit = async () => {
    const selectedPetType = selectPetType
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.slug);
    const selectedMyPet = myPet
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.id);

    if (careLocation?.lat && careLocation?.lng) {
      let formattedData;
      if (isMyPetEnabled) {
        formattedData = {
          service: serviceData.service,
          serviceId: serviceData.serviceId,
          petsId: selectedMyPet.toString(),
          lat: careLocation.lat,
          lng: careLocation.lng,
          page: 1,
          limit: 20,
        };
      } else {
        formattedData = {
          service: serviceData.service,
          serviceId: serviceData.serviceId,
          pet_type: selectedPetType.toString(),
          lat: careLocation.lat,
          lng: careLocation.lng,
          page: 1,
          limit: 20,
        };
      }
      dispatch(
        setIsService({
          service: serviceData.service,
          serviceId: serviceData.serviceId,
        }),
      );
      if (isMyPetEnabled) {
        dispatch(setSelectedPet(myPet));
      } else {
        dispatch(setPetType(selectPetType));
      }
      dispatch(setFormattedData(formattedData));
      dispatch(getAllProviderOneTime(formattedData));
      dispatch(setLocation({lat: careLocation.lat, lng: careLocation.lng}));
      dispatch(setFormattedAddress(addressLine));
      dispatch(setSelectedHome(''));
      dispatch(setMultiSliderValue([0, 200]));
      dispatch(setDropIn(null));
      dispatch(setDropOut(null));
      dispatch(setIsYardEnabled(''));
      dispatch(setServiceFrequency(days));
      dispatch(setScheduleId(null));
      props.navigation.navigate('AllProvider');
    } else if (addressLine) {
      const locationAddressEndPoint = `${baseUrlV}/v2/location?address=${addressLine}`;
      const result = await request(locationAddressEndPoint);
      if (result.ok) {
        let formattedData;
        if (isMyPetEnabled) {
          formattedData = {
            service: serviceData.service,
            serviceId: serviceData.serviceId,
            petsId: selectedMyPet.toString(),
            lat: result?.data?.results[0]?.geometry?.location.lat,
            lng: result?.data?.results[0]?.geometry?.location.lng,
            page: 1,
            limit: 10,
          };
        } else {
          formattedData = {
            service: serviceData.service,
            serviceId: serviceData.serviceId,
            pet_type: selectedPetType.toString(),
            lat: result?.data?.results[0]?.geometry?.location.lat,
            lng: result?.data?.results[0]?.geometry?.location.lng,
            page: 1,
            limit: 10,
          };
        }
        dispatch(
          setIsService({
            service: serviceData.service,
            serviceId: serviceData.serviceId,
          }),
        );
        if (isMyPetEnabled) {
          dispatch(setSelectedPet(myPet));
        } else {
          dispatch(setPetType(selectPetType));
        }
        dispatch(setFormattedData(formattedData));
        dispatch(getAllProviderOneTime(formattedData));
        dispatch(
          setLocation({
            lat: result?.data?.results[0]?.geometry?.location.lat,
            lng: result?.data?.results[0]?.geometry?.location.lng,
          }),
        );
        dispatch(setFormattedAddress(addressLine));
        dispatch(setSelectedHome(''));
        dispatch(setMultiSliderValue([0, 200]));
        dispatch(setDropIn(null));
        dispatch(setDropOut(null));
        dispatch(setIsYardEnabled(''));
        dispatch(setServiceFrequency(days));
        dispatch(setScheduleId(null));
        setErrorMessage(null);
        props.navigation.navigate('AllProvider');
      }
    } else {
      setErrorMessage('Please enter your zip code or address');
    }
  };
  const {colors} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.backgroundColor,
    marginBottom: 20,
  };
  const RenderHeader = () => {
    return (
      <View>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          {isLoggedIn && !user?.timezone ? (
            <View style={[styles.boxContainerIn, backgroundStyle]}>
              <ShortText
                text={
                  'Action Required! Please set your preferred time zone to continue.'
                }
                textStyle={{color: Colors.red}}
              />
              <Pressable
                onPress={() => {
                  props.navigation.navigate('AccountSetting');
                  dispatch(getWhoAmI());
                }}>
                <ShortText
                  text={'Set Time Zone'}
                  textStyle={{color: Colors.primaryDif, fontWeight: 'bold'}}
                />
              </Pressable>
            </View>
          ) : null}
          {isLoggedIn &&
            user?.provider?.isApproved &&
            userOnboardStatus?.userStripeConnectAccount?.requirements?.errors
              ?.length !== 0 && (
              <View style={[styles.boxContainerIn, backgroundStyle]}>
                <ShortText
                  text={'Action Required! Please set your payments and payout'}
                  textStyle={{color: Colors.red}}
                />
                <Pressable
                  onPress={() => {
                    props.navigation.navigate('ReceivePayments');
                    dispatch(getWhoAmI());
                  }}>
                  <ShortText
                    text={'Set Payments and Payout'}
                    textStyle={{color: Colors.primaryDif, fontWeight: 'bold'}}
                  />
                </Pressable>
              </View>
            )}
        </View>
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
                serviceTypes?.map((item: any) => (
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
        <View style={styles.headerContainer}>
          <TitleText
            text="Looking service for my"
            textStyle={styles.petTitleText}
          />
          {pets && pets.length > 0 && (
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
          {isMyPetEnabled && myPet?.length > 0
            ? myPet?.map((item: any) => (
                <PetCard
                  key={item.id}
                  data={item}
                  noShadow
                  onPressEvent={onPressPet}
                  divide={2}
                />
              ))
            : selectPetType.map(item => (
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
      <ScreenRapper rapperStyle={styles.rapperStyle}>
        <KeyboardAwareScrollView
          extraHeight={80}
          extraScrollHeight={120}
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          // keyboardVerticalOffset={20}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.rootContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.boxContainer}>
            <SearchSlider navigation={props.navigation} />
            <RenderHeader />
            <View style={styles.zipContainer}>
              <TitleText text="Near" textStyle={styles.zipText} />
              {/* <GoogleAutoComplete
                  onPressAddress={onPressAddress}
                  placeholder={'Type a place'}
                /> */}
              <GooglePredictLocation
                placeholder={'Type a place'}
                onPlaceSelected={onPressAddress}
                onChange={value => {
                  setAddressLine(value);
                  setErrorMessage(null);
                }}
              />
              {errorMessage && <ErrorMessage error={errorMessage} />}
              <View style={styles.footerContainer}>
                <ButtonCom
                  title="Search"
                  loading={loading}
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={btnStyles.containerStyleFullWidth}
                  titleStyle={btnStyles.titleStyle}
                  onSelect={handleSubmit}
                />
              </View>
            </View>
          </View>
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
    paddingTop: Platform.OS === 'android' ? 20 : 60,
  },
  scrollContainer: {
    // paddingHorizontal: '5%',
  },
  boxContainer: {
    // paddingHorizontal: '10%'
  },
  boxContainerIn: {
    padding: 10,
    borderWidth: 1,
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
    marginLeft: '4%',
    width: '90%',
    marginVertical: 10,
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
