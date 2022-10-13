import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import TitleText from '../../../components/common/text/TitleText';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import FilterProviderBody from '../../../components/ScreenComponent/Service/FilterProvider/FilterProviderBody';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {days} from '../../../utils/config/Data/filterProviderDatas';
import {getAllProvider} from '../../../store/slices/Provider/allProvider/getAllProvider';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {setOpenFilter} from '../../../store/slices/misc/openFilter';

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

const FilterProvider = () => {
  const dispatch = useAppDispatch();
  const {pets} = useAppSelector((state: any) => state?.allPets);
  const [location, setLocation] = useState({
    lat: 40.702078,
    lng: -73.822156,
  });
  const [selectedPet, setSelectedPet] = useState([]);
  const [selectedHome, setSelectedHome] = useState('');
  const [multiSliderValue, setMultiSliderValue] = useState([0, 150]);
  const [dropIn, setDropIn] = useState();
  const [dropOut, setDropOut] = useState();
  const [isService, setIsService] = useState({
    service: '',
    serviceId: '',
  });
  const [isYardEnabled, setIsYardEnabled] = useState('');
  const [serviceFrequency, setServiceFrequency] = useState(days);
  const [petType, setPetType] = useState(petData);
  const [scheduleId, setScheduleId] = useState(null);

  const onPressAddress = (data: any, details: any) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    setLocation({lat: lat, lng: lng});
  };
  useEffect(() => {
    if (pets) {
      setSelectedPet(pets);
    }
  }, [pets]);

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
          service_frequency.length > 0 ? service_frequency.toString() : null,
        lat: location.lat ? location.lat : null,
        lng: location.lng ? location.lng : null,
        startDate: dropIn ? new Date(dropIn).toISOString() : null,
        endDate: dropOut ? new Date(dropOut).toISOString() : null,
        homeType: selectedHome ? selectedHome : null,
        yardType: isYardEnabled ? isYardEnabled : null,
        // preferenceIds: '',
        minPrice: multiSliderValue[0],
        maxPrice: multiSliderValue[1],
      };
    } else {
      formattedData = {
        service: isService.service ? isService.service : null,
        serviceId: isService.serviceId ? isService.serviceId : null,
        pet_type:
          selectedPetType.length > 0 ? selectedPetType.toString() : null,
        service_frequency:
          service_frequency.length > 0 ? service_frequency.toString() : null,
        lat: location.lat ? location.lat : null,
        lng: location.lng ? location.lng : null,
        startDate: dropIn ? new Date(dropIn).toISOString() : null,
        endDate: dropOut ? new Date(dropOut).toISOString() : null,
        homeType: selectedHome ? selectedHome : null,
        yardType: isYardEnabled ? isYardEnabled : null,
        // preferenceIds: '',
        minPrice: multiSliderValue[0],
        maxPrice: multiSliderValue[1],
      };
    }
    dispatch(getAllProvider(formattedData));
    dispatch(setOpenFilter(false));
  };
  const handleReset = () => {
    setLocation({lat: 40.702078, lng: -73.822156});
    setSelectedPet(pets);
    setSelectedHome('');
    setMultiSliderValue([0, 150]);
    setDropIn(null);
    setDropOut(null);
    setIsService({service: '', serviceId: ''});
    setIsYardEnabled('');
    setServiceFrequency(days);
    setPetType(petData);
    setScheduleId(null);
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
          setMultiSliderValue={setMultiSliderValue}
          multiSliderValue={multiSliderValue}
          selectedHome={selectedHome}
          setSelectedHome={setSelectedHome}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          dropIn={dropIn}
          setDropIn={setDropIn}
          dropOut={dropOut}
          setDropOut={setDropOut}
          isService={isService}
          setIsService={setIsService}
          isYardEnabled={isYardEnabled}
          setIsYardEnabled={setIsYardEnabled}
          serviceFrequency={serviceFrequency}
          setServiceFrequency={setServiceFrequency}
          setPetType={setPetType}
          petType={petType}
          scheduleId={scheduleId}
          setScheduleId={setScheduleId}
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
