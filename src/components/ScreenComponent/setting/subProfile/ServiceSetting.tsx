/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
// import ServiceSetUp from '../../../../screens/becomeSitter/ServiceSetUp';
import {setServiceSetup} from '../../../../store/slices/onBoarding/setUpService/serviceSetup/serviceSetUpSlice';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {useNavigation} from '@react-navigation/native';
import {getUserServices} from '../../../../store/slices/profile/services';
import {
  getOnboardingProgress,
  setCurrentScreen,
} from '../../../../store/slices/onBoarding/initial';
import {getWhoAmI} from '../../../../store/slices/common/whoAmI/whoAmIAction';
import SwitchView from '../../../common/switch/SwitchView';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import MiddleModal from '../../../UI/modal/MiddleModal';
import TitleText from '../../../common/text/TitleText';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import ShortText from '../../../common/text/ShortText';
import Text_Size from '../../../../constants/textScaling';
const activeEndpoint = '/provider-services/change-status/';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getNewOnboarding} from '../../../../store/slices/onBoarding/newOnboardingApi/newOnboardingAction';
import { CancelToken } from 'apisauce';

const ServiceSetting = () => {
  // const [isBoardingSelected, setIsBoardingSelected] = useState<boolean>(false);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {userServices} = useAppSelector((state: any) => state.services);
  const {progressData} = useAppSelector(state => state.initial);
  const {user} = useAppSelector((state: any) => state?.whoAmI);
  const navigation = useNavigation();

  const serviceData = userServices !== null && userServices;
  const {loading: activeLoading, request} = useApi(methods._update);
  const [selectedService, setSelectedService] = useState(null);
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sitter-home':
        return (
          <FontAwesome5Icon
            name="briefcase"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'sitter-traveling':
        return (
          <FontAwesome5Icon
            name="home"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'homevists':
        return (
          <FontAwesome5Icon
            name="house-user"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'daycare':
        return (
          <MaterialCommunityIcons
            name="dog-service"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'walking':
        return (
          <FontAwesome5Icon
            name="paw"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserServices());
    dispatch(getWhoAmI());
    dispatch(getOnboardingProgress());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const source = CancelToken.source();
    onRefresh();
    return () => {
      source.cancel();
    };
  }, []);
  const servicesProgress = progressData?.individualServiceSetupSublist;
  return (
    <>
      {/* {(userServicesLoading || loading) && (
        <AppActivityIndicator visible={true} />
      )} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[
          styles.rootContainer,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {serviceData &&
          serviceData.map((item: any, index: number) => {
            return (
              <Pressable
                style={[
                  styles.container,
                  {
                    backgroundColor: item.isActive
                      ? Colors.background
                      : Colors.lightShade,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  },
                ]}
                key={index}
                onPress={() => {
                  // dispatch(
                  //   setServiceSetup({
                  //     routeData: {
                  //       itemId: item?.id,
                  //       name: item.serviceType?.name,
                  //       image: getIcon(item?.serviceType?.icon),
                  //       description: item?.serviceType?.description,
                  //       serviceId: item?.serviceTypeId,
                  //       providerServicesId: item?.id,
                  //       service: item?.AvailableDay,
                  //     },
                  //   }),
                  // );
                  dispatch(setCurrentScreen({pass: 1}));
                  dispatch(getNewOnboarding(item?.id));
                  dispatch(setServiceSetup(item));
                  navigation.navigate('SingleServiceSetUp', {goBack: true});
                }}>
                <View style={styles.flexContainer}>
                  <View style={styles.serviceContainer}>
                    <View style={{marginLeft: 10}}>
                      {getIcon(item.serviceType.icon)}
                    </View>
                    <View style={styles.textContainer}>
                      <HeaderText
                        text={item.serviceType.name}
                        textStyle={styles.titleStyle}
                      />
                      <View
                        style={{
                          backgroundColor: item.isActive
                            ? '#E3FFF6'
                            : '#FBE4D8',

                          width: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 4,
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                        }}>
                        <ShortText
                          text={item.isActive ? 'Active' : 'Deactive'}
                          textStyle={{
                            fontWeight: '900',
                            textAlign: 'center',
                            color: item.isActive ? '#06CB8F' : '#FB341E',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <SwitchView
                      inactiveColor={'#06CB8F'}
                      iosBgColor={'#E3FFF6'}
                      isActive={
                        item.id === selectedService && activeLoading
                          ? !item.isActive
                          : item.isActive
                      }
                      onSelect={async () => {
                        setSelectedService(item.id);
                        const serviceProgress =
                          servicesProgress[item.serviceType.slug];

                        if (
                          serviceProgress['AVAILABILITY']['complete'] &&
                          serviceProgress['SERVICE_RATES']['complete']
                        ) {
                          const result = await request(
                            activeEndpoint + item.id,
                          );
                          result.ok &&
                            (dispatch(getUserServices()),
                            dispatch(getWhoAmI()));
                          return;
                        } else {
                          Alert.alert(
                            'Activation',
                            'Please complete the service first and pull to refresh!',
                          );
                        }
                      }}
                      activeText={''}
                      inActiveText={''}
                    />
                    <MaterialCommunityIcons
                      name={'chevron-right'}
                      size={
                        SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28
                      }
                      style={styles.iconStyle}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              </Pressable>
            );
          })}
        {serviceData.length === 5 ? null : (
          <View style={styles.submitContainer}>
            <ButtonCom
              title={'Add new service'}
              // loading={postLoading}
              textAlignment={btnStyles.textAlignment}
              containerStyle={btnStyles.containerStyleFullWidth}
              titleStyle={btnStyles.titleStyle}
              onSelect={
                user?.provider?.isApproved
                  ? () => navigation.navigate('ServiceSelection')
                  : () => setIsModalVisible(true)
              }
            />
          </View>
        )}
      </ScrollView>
      {isModalVisible && (
        <MiddleModal
          onBlur={undefined}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          // children={}
          handlePress={function (): void {
            throw new Error('Function not implemented.');
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flex: 0,
              width: '100%',
            }}>
            <TitleText
              textStyle={{fontWeight: 'bold'}}
              text={`You may notice during the onboarding process that you can only select one of the services you decided to offer clients. This is normal. We will run a background check on you once you’ve set up your profile. Assuming we accept you to join the Woofmeets team, you’ll be able to come back to your dashboard and set up the rest of your services.`}
            />
            <AppTouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                marginTop: 10,
              }}>
              <TitleText
                text={'Close'}
                textStyle={{
                  fontWeight: 'bold',
                  textAlign: 'center',

                  color: Colors.primaryDif,
                }}
              />
            </AppTouchableOpacity>
          </View>
        </MiddleModal>
      )}
    </>
  );
};

export default ServiceSetting;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.border,
  },
  rootContainer: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '5%' : '6%',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    paddingLeft: 20,
  },
  titleStyle: {
    paddingBottom: 6,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: Text_Size.Text_2,
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  iconStyle: {
    marginLeft: 10,
  },
  submitContainer: {
    paddingHorizontal: '20%',
    paddingTop: 20,
  },
});
