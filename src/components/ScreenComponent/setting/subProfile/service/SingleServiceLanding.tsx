import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect} from 'react';
// import {
//   CallSvg,
//   FileTextSvg,
//   ImageStackSvg,
//   PetSvg,
// } from '../../../../../screens/settings/Profile/utils/ProfileSvg';
import HeaderText from '../../../../common/text/HeaderText';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
// import {ProfileIcon} from '../../../../../assets/svgs/Setting_SVG';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../../../constants/Colors';
import {getSitterDetails} from '../../../../../store/slices/profile/details';
import {useAppDispatch} from '../../../../../store/store';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SingleServiceLanding = (props: {
  navigation: {navigate: (arg0: string) => any};
}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const modifyProfileData = [
    {
      id: 1,
      name: 'Rates',
      icon: (
        <FontAwesome5Icon
          name="file-invoice-dollar"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
      screen: () => props.navigation.navigate('RatesScreen'),
    },
    {
      id: 2,
      name: 'Availability',
      icon: (
        <FontAwesome5Icon
          name="calendar-check"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
      screen: () => props.navigation.navigate('AvailabilityScreen'),
    },
    {
      id: 3,
      name: 'Cancellation Policy',
      icon: (
        <MaterialIcons
          name="policy"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
      screen: () => props.navigation.navigate('CancellationPolicyScreen'),
    },
  ];

  useEffect(() => {
    dispatch(getSitterDetails());
  }, []);
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      {modifyProfileData.map(
        (item: {
          id: number;
          icon: JSX.Element;
          name: string;
          screen: ((event: GestureResponderEvent) => void) | undefined;
        }) => {
          return (
            <TouchableOpacity
              style={styles.tabContainer}
              key={item.id}
              onPress={item.screen}>
              <View style={styles.flexContainer}>
                <View>{item.icon}</View>
                <HeaderText text={item.name} textStyle={styles.headerText} />
              </View>
              <View>
                <MaterialCommunityIcons
                  name={'chevron-right'}
                  size={
                    SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28
                  }
                  color={Colors.primary}
                />
              </View>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default SingleServiceLanding;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '5%' : '6%',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  headerText: {
    paddingLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
