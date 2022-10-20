import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import TitleText from '../../../components/common/text/TitleText';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import FilterProviderBody from '../../../components/ScreenComponent/Service/FilterProvider/FilterProviderBody';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {days} from '../../../utils/config/Data/filterProviderDatas';
import {getAllProviderOneTime} from '../../../store/slices/Provider/allProvider/getAllProvider';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {setOpenFilter} from '../../../store/slices/misc/openFilter';
import {
  setDropIn,
  setDropOut,
  setFormattedData,
  setIsService,
  setIsYardEnabled,
  setLocation,
  setMultiSliderValue,
  setPetType,
  setScheduleId,
  setSelectedHome,
  setSelectedPet,
  setServiceFrequency,
} from '../../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {petData} from './utils/petData';

const FilterProvider = () => {
  const dispatch = useAppDispatch();
  const {pets} = useAppSelector((state: any) => state?.allPets);
  const {
    location,
    selectedPet,
    selectedHome,
    multiSliderValue,
    dropIn,
    dropOut,
    isService,
    isYardEnabled,
    serviceFrequency,
    petType,
    scheduleId,
  } = useAppSelector((state: any) => state.providerFilter);

  const onPressAddress = (data: any, details: any) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    dispatch(setLocation({lat: lat, lng: lng}));
  };
  useEffect(() => {
    if (pets) {
      dispatch(setSelectedPet(pets));
    }
  }, [dispatch, pets]);

  const handleSubmit = () => {
    const selectedPetType = petType
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.slug);
    const selectedMyPet = selectedPet
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.id);
    const service_frequency = serviceFrequency
      ?.filter((item: any) => item.selected)
      .map((item: any) => item.value);

    let formattedData;
    if (pets) {
      formattedData = {
        service: isService.service ? isService.service : null,
        serviceId: isService.serviceId ? isService.serviceId : null,
        petsId: selectedMyPet.length > 0 ? selectedMyPet.toString() : null,
        service_frequency:
          scheduleId === 0
            ? null
            : service_frequency.length > 0
            ? service_frequency.toString()
            : null,
        lat: location.lat ? location.lat : null,
        lng: location.lng ? location.lng : null,
        startDate: dropIn ? new Date(dropIn).toISOString() : null,
        endDate:
          scheduleId === 1
            ? null
            : dropOut
            ? new Date(dropOut).toISOString()
            : null,
        homeType: selectedHome ? selectedHome : null,
        yardType: isYardEnabled ? isYardEnabled : null,
        // preferenceIds: '',
        minPrice: multiSliderValue[0],
        maxPrice: multiSliderValue[1],
        page: 1,
        limit: 10,
      };
    } else {
      formattedData = {
        service: isService.service ? isService.service : null,
        serviceId: isService.serviceId ? isService.serviceId : null,
        pet_type:
          selectedPetType.length > 0 ? selectedPetType.toString() : null,
        service_frequency:
          scheduleId === 0
            ? null
            : service_frequency.length > 0
            ? service_frequency.toString()
            : null,
        lat: location.lat ? location.lat : null,
        lng: location.lng ? location.lng : null,
        startDate: dropIn ? new Date(dropIn).toISOString() : null,
        endDate:
          scheduleId === 1
            ? null
            : dropOut
            ? new Date(dropOut).toISOString()
            : null,
        homeType: selectedHome ? selectedHome : null,
        yardType: isYardEnabled ? isYardEnabled : null,
        // preferenceIds: '',
        minPrice: multiSliderValue[0],
        maxPrice: multiSliderValue[1],
        page: 1,
        limit: 10,
      };
    }
    dispatch(setFormattedData(formattedData));
    dispatch(getAllProviderOneTime(formattedData));
    dispatch(setOpenFilter(false));
  };
  const handleReset = () => {
    dispatch(setLocation({lat: 40.702078, lng: -73.822156}));
    dispatch(setSelectedPet(pets));
    dispatch(setSelectedHome(''));
    dispatch(setMultiSliderValue([0, 150]));
    dispatch(setDropIn(null));
    dispatch(setDropOut(null));
    dispatch(setIsService({service: '', serviceId: ''}));
    dispatch(setIsYardEnabled(''));
    dispatch(setServiceFrequency(days));
    dispatch(setPetType(petData));
    dispatch(setScheduleId(null));
  };
  return (
    <View>
      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title1} text="Filter" />
        <AppTouchableOpacity onPress={handleReset}>
          <TitleText textStyle={styles.title2} text="Reset" />
        </AppTouchableOpacity>
      </View>
      <View>
        <FilterProviderBody
          handleSubmit={handleSubmit}
          onPressAddress={onPressAddress}
          multiSliderValue={multiSliderValue}
          selectedHome={selectedHome}
          selectedPet={selectedPet}
          dropIn={dropIn}
          dropOut={dropOut}
          isService={isService}
          isYardEnabled={isYardEnabled}
          serviceFrequency={serviceFrequency}
          petType={petType}
          scheduleId={scheduleId}
        />
      </View>
    </View>
  );
};

export default FilterProvider;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title1: {fontSize: Text_Size.Text_1, fontWeight: 'bold'},
  title2: {fontSize: Text_Size.Text_1, color: Colors.primary},
});
