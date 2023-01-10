import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Finder, Setting, Pets, InboxIcon} from '../assets/svgs/SVG_LOGOS';
import Colors from '../constants/Colors';
import {SCREEN_WIDTH} from '../constants/WindowSize';
// import InboxNavigator from './bottoms/InboxNavigator';
import SettingNavigator from './bottoms/SettingNavigator';
import ServiceNavigator from './bottoms/ServiceNavigator';
import PetNavigator from './bottoms/PetNavigator';
import authStorage from '../utils/helpers/auth/storage';
import jwtDecode from 'jwt-decode';
import ProHomeNavigator from './providers/bottoms/HomeNavigator';
// import {ProHomeIcon} from '../assets/svgs/Provider_Logos';
// import ProRescheduleNavigator from './providers/bottoms/RescheduleNavigator';
import {ProRescheduleIcon} from '../assets/svgs/Provider_Logos';
import ProSettingNavigator from './providers/bottoms/SettingNavigator';
import BottomTabText from '../components/common/text/BottomTabText';
import {useAppDispatch, useAppSelector} from '../store/store';
import {getWhoAmI} from '../store/slices/common/whoAmI/whoAmIAction';
import InboxNavigator from './bottoms/InboxNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<any>();
  const {user} = useAppSelector((state: any) => state.whoAmI);

  useEffect(() => {
    dispatch(getWhoAmI());
  }, []);
  const getDecodedToken = async () => {
    const tok: any = await authStorage.getToken();
    if (tok) {
      const decode: any = await jwtDecode(tok);
      setToken(decode);
      return decode;
    }
  };
  const height =
    SCREEN_WIDTH <= 380
      ? Platform.OS === 'ios'
        ? 60
        : 60
      : Platform.OS === 'ios'
      ? 78
      : 70;
  getDecodedToken();
  if (user?.provider?.isApproved || token?.provider) {
    return (
      <Tab.Navigator
        initialRouteName="ServiceNavigator"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: Colors.background,
            height: height,
            paddingBottom: 0,
            position: 'absolute',
            bottom: 0,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,

            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            marginBottom: 20,
          },
        }}>
        <Tab.Screen
          name="ServiceNavigator"
          component={ServiceNavigator}
          options={{
            tabBarLabel: 'Services',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Finder
                  fill={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText
                  text="Services"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProHomeNavigator"
          component={ProHomeNavigator}
          options={{
            headerShown: false,

            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <ProRescheduleIcon
                  stroke={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 18 : 20}
                  width={SCREEN_WIDTH <= 380 ? 18 : 20}
                />
                <BottomTabText
                  text="Appointments"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="InboxNavigator"
          component={InboxNavigator}
          options={() => ({
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Pets
                  fill={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 18 : 20}
                  width={SCREEN_WIDTH <= 380 ? 18 : 20}
                />
                <BottomTabText
                  text="Inbox"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="ProSettingNavigator"
          component={ProSettingNavigator}
          options={{
            headerShown: false,
            // tabBarBadge: 3,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Setting
                  fill={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText
                  text="Setting"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else if (token && !token.provider) {
    return (
      <Tab.Navigator
        initialRouteName="ServiceNavigator"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: Colors.background,
            height: height,
            paddingBottom: 0,
            position: 'absolute',
            bottom: 0,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,

            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            marginBottom: 20,
          },
        }}>
        <Tab.Screen
          name="ServiceNavigator"
          component={ServiceNavigator}
          options={{
            tabBarLabel: 'Services',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Finder
                  fill={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText
                  text="Services"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="InboxNavigator"
          component={InboxNavigator}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <InboxIcon
                  stroke={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText
                  text="Inbox"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="PetNavigator"
          component={PetNavigator}
          options={() => ({
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Pets
                  fill={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 20 : 22}
                  width={SCREEN_WIDTH <= 380 ? 20 : 24}
                />
                <BottomTabText
                  text="My Pets"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="SettingNavigator"
          component={SettingNavigator}
          options={{
            headerShown: false,
            // tabBarBadge: 3,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Setting
                  fill={focused ? Colors.primary : Colors.gray}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText
                  text="Setting"
                  focused={focused}
                  textStyle={styles.textStyle}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return <View />;
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: SCREEN_WIDTH / 4,
  },
  textStyle: {
    paddingVertical: 2,
    paddingTop: 5,
  },
});

export default BottomTabNavigator;
