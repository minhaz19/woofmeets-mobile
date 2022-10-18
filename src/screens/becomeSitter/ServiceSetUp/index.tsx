/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import {getAvailability} from '../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import {getYourHome} from '../../../store/slices/onBoarding/setUpService/yourHome/getYourHome';
import {getPetPreference} from '../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';

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
        <ScrollView horizontal={true}>
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
                    inProgress={item.inProgress}
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
                    inProgress={item.inProgress}
                    isBoarding={true}
                  />
                ),
            )}
          </View>
        </ScrollView>
        {boardingSelection.map((item: any) => {
          if (item.inProgress) {
            return (
              <View key={item.id} style={{flex: 32}}>
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
    paddingTop: 10,
  },
  innerContainer: {
    flexDirection: 'row',
  },
});
