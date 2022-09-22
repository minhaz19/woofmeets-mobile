/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import {getAvailability} from '../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import {getOnboardingProgress} from '../../../store/slices/onBoarding/initial';
import {getYourHome} from '../../../store/slices/onBoarding/setUpService/yourHome/getYourHome';
import {getPetPreference} from '../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const ServiceSetUp = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const boardingSelection = useAppSelector(
    (state: any) => state.initial.boardingSelection,
  );
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const servicesData = serviceSetup ? serviceSetup.routeData : '';
  const {service} = servicesData;
  const providerServiceId =
    service && service.map((data: {id: string}) => data.id);
  const {availability, loading: availabilityLoader} = useAppSelector(
    (state: any) => state?.availability,
  );
  const {yourHome, loading: yourHomeLoader} = useAppSelector(
    (state: any) => state?.yourHome,
  );
  const {petPreference, loading: petPreferenceLoader} = useAppSelector(
    (state: any) => state?.petPreference,
  );

  useEffect(() => {
    dispatch(getAvailability(providerServiceId[0]));
    yourHome === null && dispatch(getYourHome());
    petPreference === null && dispatch(getPetPreference());
  }, [dispatch, petPreference, yourHome]);

  return (
    <>
      {/* {(availabilityLoader || yourHomeLoader || petPreferenceLoader) && (
        <AppActivityIndicator visible={true} />
      )} */}
      <View
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <View style={styles.innerContainer}>
          {/* completed */}
          {boardingSelection.map(
            (item: any) =>
              item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  handleClick={item.onPress}
                  isBoarding={true}
                />
              ),
          )}
          {/* not completed */}
          {boardingSelection.map(
            (item: any) =>
              !item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  handleClick={item.onPress}
                  isBoarding={true}
                />
              ),
          )}
        </View>
        {boardingSelection.map((item: any) => {
          if (item.inProgress) {
            return (
              <View key={item.id} style={{flex: 1}}>
                <item.screen />
              </View>
            );
          }
        })}
      </View>
    </>
  );
};

export default ServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
});
