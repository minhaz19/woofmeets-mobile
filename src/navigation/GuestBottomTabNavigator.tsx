import React from 'react';
import {View, Text, StyleSheet, useColorScheme, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Finder, Setting} from '../assets/svgs/SVG_LOGOS';
import Colors from '../constants/Colors';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import Text_Size from '../constants/textScaling';
import SettingNavigator from './bottoms/SettingNavigator';
import ServiceNavigator from './bottoms/ServiceNavigator';

const Tab = createBottomTabNavigator();

function GuestBottomTabNavigator() {
  const isDarkMode = useColorScheme() === 'dark';
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
          height:
            SCREEN_WIDTH <= 380
              ? Platform.OS === 'ios'
                ? 70
                : 60
              : Platform.OS === 'ios'
              ? 95
              : 75,

          position: 'absolute',
          bottom: 0,
          elevation: 9,
          shadowOpacity: 0.9,
          shadowOffset: {width: 2, height: 8},
          shadowColor: isDarkMode ? Colors.dark.background : Colors.background,
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
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                allowFontScaling={false}
                style={[
                  focused
                    ? {color: Colors.primary}
                    : {color: Colors.light.lightText},
                  styles.textStyle,
                ]}>
                Services
              </Text>
            </View>
          ),
        }}
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
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                allowFontScaling={false}
                style={[
                  focused
                    ? {color: Colors.primary}
                    : {color: Colors.light.lightText},
                  styles.textStyle,
                ]}>
                Setting
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    width: SCREEN_WIDTH / 4,
  },
  textStyle: {
    fontSize: Text_Size.Text_0,
    fontWeight: '500',
    paddingVertical: 5,
  },
});

export default GuestBottomTabNavigator;
