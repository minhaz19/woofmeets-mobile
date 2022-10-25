/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
interface Props {
  startingDate: string;
  endingDate: string;
  // resetRange: () => void;
  setIsDayVisible: (arg: boolean) => void;
  isDayVisible: boolean;
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
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const {userServices} = useAppSelector(state => state.services);
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
  };
  const handleMAAvailable = async () => {
    const payload = {
      from: new Date(startingDate).toISOString(),
      to:
        endingDate !== undefined && endingDate !== ''
          ? new Date(endingDate).toISOString()
          : null,
      providerServiceIds: userServices.map((item: {id: number}) => item.id),
    };
    await request(dayAvEndpoint, payload);
  };

  const handleDayAvailability = (data: any) => {
    const modData = Object.keys(data).map(key => {
      return data[key];
    });
    modData.map(async item => {
      const payload = {
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
      const r = await putRequest(dayAvEndpoint + item.putServiceId, payload);
      r.ok && setIsDayVisible(false);
    });
  };

  return (
    <Animated.View style={[styles.editContainer, animatedStyles]}>
      <View style={styles.availablity}>
        {true ? (
          <TouchableOpacity
            style={styles.markContainer}
            onPress={handleMAUnavailable}>
            <TitleText textStyle={styles.mark} text={'Mark as unavailable'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.markContainer}
            onPress={handleMAAvailable}>
            <TitleText textStyle={styles.mark} text={'Mark as Available'} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.editBtnContainer}
          onPress={() => setIsVisible(true)}>
          <TitleText textStyle={styles.edit} text={'Edit'} />
        </TouchableOpacity>
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
    bottom: '10%',
    backgroundColor: Colors.black,
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
    // borderRightWidth: 1,
    // borderRightColor: 'white',
    paddingVertical: 10,
    // width: '2%',
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
