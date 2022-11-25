/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../../assets/svgs/Services_SVG';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
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
const activeEndpoint = '/provider-services/change-status/';
const ServiceSetting = () => {
  // const [isBoardingSelected, setIsBoardingSelected] = useState<boolean>(false);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {userServices, userServicesLoading} = useAppSelector(
    (state: any) => state.services,
  );
  const {progressData, loading} = useAppSelector(state => state.initial);
  const {user} = useAppSelector((state: any) => state?.whoAmI);
  const navigation = useNavigation();

  const serviceData = userServices !== null && userServices;
  const {loading: activeLoading, request} = useApi(methods._update);
  const [selectedService, setSelectedService] = useState(null);
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sitter-home':
        return <BoardingIcon width={34} height={36} />;
      case 'sitter-traveling':
        return <HouseSittingIcon width={34} height={36} />;
      case 'homevists':
        return <DropInVisitIcon width={34} height={36} />;
      case 'walking':
        return <DogWalkingIcon width={34} height={36} />;
      case 'daycare':
        return <DoggyDayCareIcon width={34} height={36} />;
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
    onRefresh();
  }, []);
  const servicesProgress = progressData?.individualServiceSetupSublist;
  return (
    <>
      {(userServicesLoading || loading) && (
        <AppActivityIndicator visible={true} />
      )}
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
              <TouchableOpacity
                key={index}
                onPress={() => {
                  dispatch(
                    setServiceSetup({
                      routeData: {
                        itemId: item.id,
                        name: item.serviceType.name,
                        image: getIcon(item.serviceType.icon),
                        description: item.serviceType.description,
                        serviceId: item.serviceTypeId,
                        providerServicesId: item.id,
                        service: item?.AvailableDay,
                      },
                    }),
                  );
                  dispatch(setCurrentScreen({pass: 1}));
                  navigation.navigate('SingleServiceLanding');
                }}>
                <View style={styles.flexContainer}>
                  <View style={styles.serviceContainer}>
                    <View>{getIcon(item.serviceType.icon)}</View>
                    <View style={styles.textContainer}>
                      <HeaderText
                        text={item.serviceType.name}
                        textStyle={styles.titleStyle}
                      />
                      <DescriptionText
                        text={item.isActive
                          ? 'Active'
                          : 'Inactive'}
                        textStyle={styles.shortText}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <SwitchView
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
                <View
                  style={[
                    styles.divider,
                    {backgroundColor: colors.descriptionText},
                  ]}
                />
              </TouchableOpacity>
            );
          })}
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

                  color: Colors.blue,
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
    paddingLeft: 10,
  },
  titleStyle: {
    paddingBottom: 6,
  },
  shortText: {color: Colors.gray},
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
