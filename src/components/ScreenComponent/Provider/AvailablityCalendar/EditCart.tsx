/* eslint-disable react-native/no-inline-styles */
import {Alert, Platform, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import ServiceSlotModal from './ServiceSlotModal';
import ServiceDaySlotModal from './ServiceDaySlotModal';
import TitleText from '../../../common/text/TitleText';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {getAvailableDays} from '../../../../store/slices/Provider/Unavailability/getAvailableDay';
import {baseUrlV} from '../../../../utils/helpers/httpRequest';
import {setOpenSettings} from '../../../../store/slices/misc/openFilter';
import {formatDate} from '../../../common/formatDate';
interface Props {
  startingDate: string;
  endingDate: string;
  // resetRange: () => void;
  foundAvailable: boolean;
  monthRef: any;
  resetSelection: any;
  getAvailablity: any;
}
const dayAvEndpoint = '/availability/';
const unavailabilityEndpoint = `${baseUrlV}/v2/unavailability`;
const availablityEndpoint = '/availability/add-dates';
const EditCart = ({
  startingDate,
  endingDate,
  getAvailablity,
  foundAvailable,
  monthRef,
  resetSelection,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const {userActiveServices} = useAppSelector(state => state.services);
  const dispatch = useAppDispatch();
  const {request} = useApi(methods._post);
  const {request: putRequest} = useApi(methods._put);
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });
  const selectDate = new Date(startingDate?.replace(/-/g, '/')).getMonth() + 1;
  const currentDate = new Date().getMonth() + 1;

  useMemo(() => {
    offset.value = withSpring(startingDate ? 10 / 100 : 300);
  }, [startingDate, offset]);

  const handleUnavailable = async (selectedService: any) => {
    if (selectedService.length === 0) {
      Alert.alert('Please select at lease one service');
      return;
    }
    const payload = {
      from: formatDate(new Date(startingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      to:
        endingDate !== undefined && endingDate !== ''
          ? formatDate(new Date(endingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'")
          : null,
      providerServiceIds: selectedService,
    };

    const result = await request(unavailabilityEndpoint, payload);
    if (result.ok) {
      setIsVisible(false);
      const monthData = {
        year: new Date(startingDate?.replace(/-/g, '/')).getFullYear(),
        month: new Date(startingDate?.replace(/-/g, '/')).getMonth() + 1,
        dateString: formatDate(
          new Date(startingDate?.replace(/-/g, '/')),
          'yyyy-MM-dd',
        ),
      };
      getAvailablity(
        monthData,
        selectDate === currentDate ? 'current' : 'next',
      );
      resetSelection();
    }
  };

  const handleAvailable = async (selectedService: any) => {
    if (selectedService.length === 0) {
      Alert.alert('Please select at lease one service');
      return;
    }
    const payload = {
      from: formatDate(new Date(startingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      to:
        endingDate !== undefined && endingDate !== ''
          ? formatDate(new Date(endingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'")
          : null,
      providerServiceIds: selectedService,
    };

    const result = await request(availablityEndpoint, payload);
    if (result.ok) {
      setIsVisible(false);
      const monthData = {
        year: new Date(startingDate?.replace(/-/g, '/')).getFullYear(),
        month: new Date(startingDate?.replace(/-/g, '/')).getMonth() + 1,
        dateString: formatDate(
          new Date(startingDate?.replace(/-/g, '/')),
          'yyyy-MM-dd',
        ),
      };
      getAvailablity(
        monthData,
        selectDate === currentDate ? 'current' : 'next',
      );
      resetSelection();
    }
  };

  const handleMAUnavailable = async () => {
    const payload = {
      from: formatDate(new Date(startingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      to:
        endingDate !== undefined && endingDate !== ''
          ? formatDate(new Date(endingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'")
          : formatDate(new Date(startingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      providerServiceIds: userActiveServices.map(
        (item: {id: number}) => item.id,
      ),
    };
    const result = await request(unavailabilityEndpoint, payload);
    if (result.ok) {
      const monthData = {
        year: new Date(startingDate?.replace(/-/g, '/')).getFullYear(),
        month: new Date(startingDate?.replace(/-/g, '/')).getMonth() + 1,
        dateString: formatDate(
          new Date(startingDate?.replace(/-/g, '/')),
          'yyyy-MM-dd',
        ),
      };
      getAvailablity(
        monthData,
        selectDate === currentDate ? 'current' : 'next',
      );
      resetSelection();
    }
  };
  const handleMAAvailable = async () => {
    const payload = {
      providerServiceIds: userActiveServices.map(
        (item: {id: number}) => item.id,
      ),
      from: formatDate(new Date(startingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      to:
        endingDate !== undefined && endingDate !== ''
          ? formatDate(new Date(endingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'")
          : formatDate(new Date(startingDate), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    };

    const result = await request(availablityEndpoint, payload);
    if (result.ok) {
      const monthData = {
        year: new Date(startingDate?.replace(/-/g, '/')).getFullYear(),
        month: new Date(startingDate?.replace(/-/g, '/')).getMonth() + 1,
        dateString: formatDate(
          new Date(startingDate?.replace(/-/g, '/')),
          'yyyy-MM-dd',
        ),
      };
      getAvailablity(
        monthData,
        selectDate === currentDate ? 'current' : 'next',
      );
      resetSelection();
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
        dispatch(setOpenSettings(false));
        dispatch(getAvailableDays());
        dispatch;
        if (monthRef && Object.keys(monthRef).length !== 0) {
          if (monthRef.month === new Date().getMonth() + 1) {
            getAvailablity(monthRef, 'current');
          } else {
            getAvailablity(monthRef, 'next');
          }
          resetSelection();
        } else {
          const monthData =
            startingDate !== undefined && startingDate !== ''
              ? {
                  year: new Date(
                    startingDate?.replace(/-/g, '/'),
                  ).getFullYear(),
                  month:
                    new Date(startingDate?.replace(/-/g, '/')).getMonth() + 1,
                  dateString: formatDate(
                    new Date(startingDate?.replace(/-/g, '/')),
                    'yyyy-MM-dd',
                  ),
                }
              : {
                  year: new Date().getFullYear(),
                  month: new Date().getMonth() + 1,
                  dateString: formatDate(new Date(), 'yyyy-MM-dd'),
                };
          getAvailablity(monthData, 'current');
        }
      }
    });
  };
  return (
    <Animated.View
      style={[
        styles.editContainer,
        {
          backgroundColor: Colors.black,
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
                borderRightColor: Colors.background,
              },
            ]}
            onPress={handleMAUnavailable}>
            <TitleText
              textStyle={{
                color: Colors.background,
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
                borderRightColor: Colors.background,
              },
            ]}
            onPress={handleMAAvailable}>
            <TitleText
              textStyle={{
                color: Colors.background,
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
              color: Colors.background,
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
        handleVisibility={() => dispatch(setOpenSettings(false))}
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
