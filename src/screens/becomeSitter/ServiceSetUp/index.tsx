/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import {getAvailability} from '../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import {setUpdateBoardingSelection} from '../../../store/slices/onBoarding/initial';

const ServiceSetUp = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {boardingSelection, individualServiceSublist, selectedService} =
    useAppSelector((state: any) => state.initial);
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  // const [modBoardng, setModBoardng] = useState([]);
  const servicesData = serviceSetup ? serviceSetup.routeData : '';
  const {service, serviceSlug} = servicesData;
  const providerServiceId =
    service &&
    service.map((data: {providerServiceId: string}) => data.providerServiceId);

  useEffect(() => {
    dispatch(getAvailability(providerServiceId[0]));
    // const newArray = [...boardingSelection];
    // const newArray1 = [...boardingSelection];
    // const a = newArray1?.map(v => {
    //   return {
    //     ...v,
    //     isCompleted:
    //       v.name === 'CANCELLATION_POLICY'
    //         ? v?.isCompleted
    //         : individualServiceSublist?.[serviceSlug]?.[v.name]?.complete,
    //   };
    // });

    // a && dispatch(setUpdateBoardingSelection(a));
    // a && setModBoardng(a);
  }, [dispatch]);
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
            {boardingSelection?.map(
              (item: any) =>
                item?.isCompleted && (
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
            {boardingSelection?.map(
              (item: any) =>
                !item?.isCompleted && (
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
        {boardingSelection?.map((item: any) => {
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
