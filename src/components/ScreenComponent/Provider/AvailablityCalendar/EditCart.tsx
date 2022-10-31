/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Text_Size from '../../../../constants/textScaling';
import {Setting} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import ServiceSlotModal from './ServiceSlotModal';
import ServiceDaySlotModal from './ServiceDaySlotModal';
import TitleText from '../../../common/text/TitleText';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {useAppSelector} from '../../../../store/store';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {useProviderAvailability} from './utils/useProviderAvailability';
import {format} from 'date-fns';
interface Props {
  startingDate: string;
  endingDate: string;
  // resetRange: () => void;
  setIsDayVisible: (arg: boolean) => void;
  isDayVisible: boolean;
  foundAvailable: boolean;
}
const dayAvEndpoint = '/availability/';
const unavailabilityEndpoint =
  'https://api-stg.woofmeets.com/v2/unavailability';
const availablityEndpoint = '/availability/add-dates';
const EditCart = ({
  startingDate,
  endingDate,
  setIsDayVisible,
  isDayVisible,
  foundAvailable,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const {colors, isDarkMode} = useTheme();

  const {userServices} = useAppSelector(state => state.services);
  const {getAvailablity} = useProviderAvailability();
  const {request} = useApi(methods._post);
  const {request: putRequest} = useApi(methods._put);
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  useMemo(() => {
    offset.value = withSpring(startingDate ? 10 / 100 : 300);
  }, [startingDate, offset]);

  const handleUnavailable = async (selectedService: any) => {
    const payload = {
      from: new Date(startingDate).toISOString(),
      to:
        endingDate !== undefined && endingDate !== ''
          ? new Date(endingDate).toISOString()
          : null,
      providerServiceIds: selectedService,
    };

    const result = await request(unavailabilityEndpoint, payload);
    result.ok && setIsVisible(false);
  };

  const handleAvailable = async (selectedService: any) => {
    const payload = {
      from: new Date(startingDate).toISOString(),
      to:
        endingDate !== undefined && endingDate !== ''
          ? new Date(endingDate).toISOString()
          : null,
      providerServiceIds: selectedService,
    };
    const result = await request(availablityEndpoint, payload);
    console.log('r', result);
    result.ok && setIsVisible(false);
  };

  const handleMAUnavailable = async () => {
    const payload = {
      from: new Date(startingDate).toISOString(),
      to:
        endingDate !== undefined && endingDate !== ''
          ? new Date(endingDate).toISOString()
          : null,
      providerServiceIds: userServices.map((item: {id: number}) => item.id),
    };
    const result = await request(unavailabilityEndpoint, payload);
    if (result.ok) {
      const monthData = {
        year: new Date(startingDate).getFullYear(),
        month: new Date(startingDate).getMonth() + 1,
        dateString: format(new Date(startingDate), 'yyyy-MM-dd'),
      };
      getAvailablity(monthData, 'current');
    }
  };
  const handleMAAvailable = async () => {
    const payload = {
      providerServiceIds: userServices.map((item: {id: number}) => item.id),
      from: new Date(startingDate).toISOString(),
      to:
        endingDate !== undefined && endingDate !== ''
          ? new Date(endingDate).toISOString()
          : null,
    };

    const result = await request(availablityEndpoint, payload);
    console.log('r', payload, result);
    if (result.ok) {
      const monthData = {
        year: new Date(startingDate).getFullYear(),
        month: new Date(startingDate).getMonth() + 1,
        dateString: format(new Date(startingDate), 'yyyy-MM-dd'),
      };
      getAvailablity(monthData, 'next');
    }
  };

  const handleDayAvailability = (data: any) => {
    const modData = Object.keys(data).map(key => {
      return data[key].putServiceId !== null ? data[key] : null;
    });
    modData.map(async item => {
      const payload =
        item === null
          ? null
          : {
              sat: item.sat,
              sun: item.sun,
              mon: item.mon,
              wed: item.wed,
              thu: item.thu,
              tue: item.tue,
              fri: item.fri,
              pottyBreak: 'string',
              fulltime: true,
            };
      const r =
        payload !== null
          ? await putRequest(dayAvEndpoint + item.putServiceId, payload)
          : null;
      if (r !== null && r.ok) {
        const monthData = {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          dateString: format(new Date(), 'yyyy-MM-dd'),
        };
        getAvailablity(monthData, 'current');
        setIsDayVisible(false);
      }
    });
  };

  return (
    <Animated.View
      style={[
        styles.editContainer,
        {
          backgroundColor: isDarkMode ? Colors.background : Colors.black,
        },
        animatedStyles,
      ]}>
      <View style={styles.availablity}>
        {foundAvailable ? (
          <AppTouchableOpacity
            style={[
              styles.markContainer,
              {
                borderRightWidth: 1,
                borderRightColor: isDarkMode ? Colors.text : Colors.background,
              },
            ]}
            onPress={handleMAUnavailable}>
            <TitleText
              textStyle={{
                color: isDarkMode ? Colors.text : Colors.background,
                fontSize: Text_Size.Text_0,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              text={'Mark as unavailable'}
            />
          </AppTouchableOpacity>
        ) : (
          <AppTouchableOpacity
            style={[
              styles.markContainer,
              {
                borderRightWidth: 1,
                borderRightColor: isDarkMode ? Colors.text : Colors.background,
              },
            ]}
            onPress={handleMAAvailable}>
            <TitleText
              textStyle={{
                color: isDarkMode ? Colors.text : Colors.background,
                fontSize: Text_Size.Text_0,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              text={'Mark as Available'}
            />
          </AppTouchableOpacity>
        )}
        <AppTouchableOpacity
          style={styles.editBtnContainer}
          onPress={() => setIsVisible(true)}>
          <TitleText
            textStyle={{
              color: isDarkMode ? Colors.text : Colors.background,
              fontSize: Text_Size.Text_0,
              fontWeight: 'bold',
              alignItems: 'center',
              textAlign: 'center',
            }}
            text={'Edit'}
          />
        </AppTouchableOpacity>
      </View>
      <ServiceSlotModal
        startingDate={startingDate}
        endingDate={endingDate}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleUnavailable={handleUnavailable}
        handleAvailable={handleAvailable}
      />
      <ServiceDaySlotModal
        isVisible={isDayVisible}
        setIsVisible={setIsDayVisible}
        onPress={handleDayAvailability}
      />
    </Animated.View>
  );
};

export default EditCart;

const styles = StyleSheet.create({
  editContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '10%' : '12%',

    width: '90%',
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  availablity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  markContainer: {
    borderRightWidth: 1,
    borderRightColor: 'white',
    paddingVertical: 10,
    width: '75%',
  },
  mark: {
    fontSize: Text_Size.Text_0,
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editBtnContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  edit: {
    fontSize: Text_Size.Text_0,
    color: Colors.background,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    paddingRight: 25,
  },
});
