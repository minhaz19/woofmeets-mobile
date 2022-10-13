/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import PriceRange from './PriceRange';
import HomeType from './HomeType';
import Text_Size from '../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import DateRange from '../../../common/DateRange';
import FilterSwitch from './FilterSwitch';
import HeaderText from '../../../common/text/HeaderText';
import BottomSpacing from '../../../UI/BottomSpacing';
import AppButton from '../../../common/AppButton';
import {
  filterPetSwitch,
  homeType,
} from '../../../../utils/config/Data/filterProviderDatas';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Colors from '../../../../constants/Colors';
import AppSelectField from '../../../common/Form/AppSelectField';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarInput from './CalendarInput';
import FilterMyPet from './FilterMyPet';
import FilterDaySelect from './FilterDaySelect';
import FilterSchedule from './FilterSchedule';
import {Calendar, Repeat} from '../../../../assets/svgs/SVG_LOGOS';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {setOpenFilter} from '../../../../store/slices/misc/openFilter';

const schedule = [
  {
    id: 1,
    title: 'Specific Dates',
    Icon: <Calendar width={20} height={20} fill={'black'} />,
  },
  {
    id: 2,
    title: 'Repeat weekly',
    Icon: <Repeat width={30} height={30} fill={'black'} />,
  },
];

interface Props {
  handleSubmit: (value: any) => void;
  onPressAddress: (arg1: any, arg2: any) => void;
  onPress?: () => void;
  selectedPet?: any;
  setSelectedPet: (arg0: any) => void;
  multiSliderValue: any;
  setMultiSliderValue: (arg0: any) => void;
  selectedHome: any;
  setSelectedHome: (arg0: any) => void;
  dropIn: any;
  setDropIn: (arg0: any) => void;
  dropOut: any;
  setDropOut: (arg0: any) => void;
  isService: any;
  setIsService: (arg: any) => void;
  isYardEnabled: string;
  setIsYardEnabled: (arg0: string) => void;
  serviceFrequency: any;
  setServiceFrequency: (arg: any) => void;
  petType: any;
  setPetType: (arg0: any) => void;
  setScheduleId: (arg0: any) => void;
  scheduleId: any;
}

const FilterProviderBody = ({
  handleSubmit,
  onPressAddress,
  selectedPet,
  setSelectedPet,
  multiSliderValue,
  setMultiSliderValue,
  selectedHome,
  setSelectedHome,
  dropIn,
  setDropIn,
  dropOut,
  setDropOut,
  isService,
  setIsService,
  isYardEnabled,
  setIsYardEnabled,
  serviceFrequency,
  setServiceFrequency,
  petType,
  setPetType,
  setScheduleId,
  scheduleId,
}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const dispatch = useAppDispatch();
  const [OpenDropIn, setOpenDropIn] = useState(false);
  const [OpenDropOut, setOpenDropOut] = useState(false);
  // const [scheduleId, setScheduleId] = useState(null);
  const {control} = useForm();
  const {serviceTypes} = useAppSelector((state: any) => state?.services);
  const servicesData = serviceTypes.map((item: any) => {
    return {label: item.name, value: item.slug, id: item.id};
  });

  // date open Close
  const handleDropIn = () => {
    setOpenDropIn(!OpenDropIn);
    setOpenDropOut(false);
  };
  const handleDropOut = () => {
    setOpenDropOut(!OpenDropOut);
    setOpenDropIn(false);
  };

  useEffect(() => {
    if (isService.serviceId === 1 || isService.serviceId === 2) {
      setScheduleId(null);
    }
  }, [isService.serviceId, setScheduleId]);

  const handleCancel = () => {
    dispatch(setOpenFilter(false));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleText textStyle={styles.label} text={'Service'} />
        <AppSelectField
          placeholder={'Select service'}
          data={servicesData}
          name={''}
          control={control}
          setIsService={setIsService}
        />
        <TitleText textStyle={styles.label} text={'Location'} />
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
              // borderRadius: 5,
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
        {(isService.serviceId === 3 ||
          isService.serviceId === 4 ||
          isService.serviceId === 5) && (
          <>
            <FilterSchedule
              title="Schedule"
              data={schedule}
              //@ts-ignore
              setScheduleId={setScheduleId}
              name="schedule"
            />
            {scheduleId === 1 && (
              <FilterDaySelect
                serviceFrequency={serviceFrequency}
                setServiceFrequency={setServiceFrequency}
              />
            )}
          </>
        )}
        <TitleText textStyle={styles.title} text={'Dates'} />
        <View style={styles.calendarContainer}>
          <View style={{width: '48%'}}>
            <CalendarInput
              placeholder={'Start date'}
              value={dropIn}
              setOpenCal={handleDropIn}
            />
          </View>
          {!(scheduleId === 1) && (
            <View style={{width: '48%'}}>
              <CalendarInput
                placeholder={'End date'}
                value={dropOut}
                setOpenCal={handleDropOut}
              />
            </View>
          )}
        </View>
        {OpenDropIn && <DateRange setValue={setDropIn} value={null} />}
        {OpenDropOut && <DateRange setValue={setDropOut} value={dropIn} />}
        {selectedPet.length > 0 ? (
          <View>
            <TitleText textStyle={{...styles.label}} text="My Pet" />
            <FilterMyPet
              setSelectedPet={setSelectedPet}
              selectedPet={selectedPet}
            />
          </View>
        ) : (
          <View>
            <TitleText textStyle={{...styles.label}} text="Pet Type(s)" />
            <FilterMyPet setSelectedPet={setPetType} selectedPet={petType} />
          </View>
        )}
        <View>
          <PriceRange
            setMultiSliderValue={setMultiSliderValue}
            multiSliderValue={multiSliderValue}
          />
        </View>
        <TitleText textStyle={styles.title} text="Home Type" />
        <FlatList
          data={homeType}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => {
            return (
              <HomeType
                Icon={item.type}
                selected={selectedHome}
                text={item.title}
                slug={item.slug}
                onPress={() => setSelectedHome(item.slug)}
              />
            );
          }}
        />
        <View>
          {filterPetSwitch.map((item, index) => (
            <View key={index} style={styles.switch}>
              <HeaderText text={item.heading} textStyle={{...styles.title}} />
              {item.switch.map((switchItem, i) => (
                <FilterSwitch
                  key={i}
                  isEnabled={switchItem.name === isYardEnabled ? true : false}
                  title={switchItem.title}
                  onPress={() => setIsYardEnabled(switchItem.name)}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <ButtonCom
            title="Search"
            // loading={getLoading}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={handleSubmit}
          />
          <AppButton title="cancel" onPress={handleCancel} />
        </View>
        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

export default FilterProviderBody;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  switch: {
    marginBottom: 20,
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: SCREEN_WIDTH < 390 ? 30 : 0,
  },
  title: {fontSize: Text_Size.Text_0, fontWeight: 'bold', marginVertical: 10},
  label: {
    fontSize: Text_Size.Text_0,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
