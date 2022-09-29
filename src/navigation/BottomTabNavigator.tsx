import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Finder, Setting, Pets, InboxIcon} from '../assets/svgs/SVG_LOGOS';
import Colors from '../constants/Colors';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import InboxNavigator from './bottoms/InboxNavigator';
import SettingNavigator from './bottoms/SettingNavigator';
import ServiceNavigator from './bottoms/ServiceNavigator';
import PetNavigator from './bottoms/PetNavigator';
import authStorage from '../utils/helpers/auth/storage';
import jwtDecode from 'jwt-decode';
import ProHomeNavigator from './providers/bottoms/HomeNavigator';
import {ProHomeIcon, ProRescheduleIcon} from '../assets/svgs/Provider_Logos';
import ProRescheduleNavigator from './providers/bottoms/RescheduleNavigator';
import ProSettingNavigator from './providers/bottoms/SettingNavigator';
import BottomTabText from '../components/common/text/BottomTabText';
import { useTheme } from '../constants/theme/hooks/useTheme';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const isDarkMode = useColorScheme() === 'dark';
  const {colors} = useTheme();
  const [token, setToken] = useState<any>();
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
      ? 70
      : 60
    : Platform.OS === 'ios'
    ? 80
    : 75;
  getDecodedToken();
  if (token && token.provider) {
    return (
      <Tab.Navigator
        initialRouteName="ProHomeNavigator"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.light.inputBackground,
            height: height,
            position: 'absolute',
            bottom: 0,
            elevation: 9,
            shadowOpacity: 0.9,
            shadowOffset: {width: 2, height: 8},
            shadowColor: isDarkMode
              ? Colors.dark.background
              : Colors.background,
          },
        }}>
        <Tab.Screen
          name="ProHomeNavigator"
          component={ProHomeNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <ProHomeIcon
                  stroke={focused ? Colors.primary : Colors.subText}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText text="Home" focused={focused} textStyle={styles.textStyle} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProRescheduleNavigator"
          component={ProRescheduleNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <ProRescheduleIcon
                  stroke={focused ? Colors.primary : Colors.subText}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText text="Reschedule" focused={focused} textStyle={styles.textStyle} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="InboxNavigator"
          component={InboxNavigator}
          options={() => ({
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <Pets
                  fill={
                    focused
                      ? Colors.primary
                      : isDarkMode
                      ? Colors.light.placeholderTextColor
                      : Colors.subText
                  }
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText text="Inbox" focused={focused} textStyle={styles.textStyle} />
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
                  fill={focused ? Colors.primary : Colors.subText}
                  height={SCREEN_WIDTH <= 380 ? 24 : 28}
                  width={SCREEN_WIDTH <= 380 ? 26 : 33}
                />
                <BottomTabText text="Setting" focused={focused} textStyle={styles.textStyle} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        initialRouteName="ServiceNavigator"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.background,
            height: height,
            position: 'absolute',
            bottom: 0,
            elevation: 9,
            shadowOpacity: 0.9,
            shadowOffset: {width: 2, height: 8},
            shadowColor: isDarkMode
              ? Colors.dark.background
              : Colors.background,
            borderTopWidth: 2,
            borderColor: colors.borderColor,
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
                  fill={focused ? Colors.primary : Colors.light.lightText}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText text="Services" focused={focused} textStyle={styles.textStyle} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="InboxNavigator"
          component={InboxNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.bottomContainer}>
                <InboxIcon
                  stroke={focused ? Colors.primary : Colors.subText}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText text="Inbox" focused={focused} textStyle={styles.textStyle} />
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
                  fill={
                    focused
                      ? Colors.primary
                      : isDarkMode
                      ? Colors.light.placeholderTextColor
                      : Colors.subText
                  }
                  height={SCREEN_WIDTH <= 380 ? 20 : 22}
                  width={SCREEN_WIDTH <= 380 ? 20 : 24}
                />
                <BottomTabText text="My Pets" focused={focused} textStyle={styles.textStyle} />
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
                  fill={focused ? Colors.primary : Colors.subText}
                  height={SCREEN_WIDTH <= 380 ? 20 : 24}
                  width={SCREEN_WIDTH <= 380 ? 20 : 26}
                />
                <BottomTabText text="Setting" focused={focused} textStyle={styles.textStyle} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    width: SCREEN_WIDTH / 4,
  },
  textStyle: {
    paddingVertical: 2,
    paddingTop: 4,
  },
});

export default BottomTabNavigator;
