/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeIcon, Social, Services, Orders, Finder, Setting, Pets} from '../assets/SVG_LOGOS';
import Colors from '../constants/Colors';

import {SCREEN_WIDTH} from '../constants/WindowSize';
import HomeNavigator from './bottoms/HomeNavigator';
import Text_Size from '../constants/textScaling';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.light.background,
          height: SCREEN_WIDTH <= 380 ? 60 : 65,

          position: 'absolute',
          bottom: 0,
          elevation: 9,
          shadowOpacity: 0.9,
          shadowOffset: {width: 2, height: 8},
          shadowColor: isDarkMode
            ? Colors.dark.background
            : Colors.light.background,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Services',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <Finder
                fill={focused ? Colors.primary : Colors.subText}
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
                  styles.textStyle,
                ]}>
                Services
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <Social
                fill={focused ? Colors.primary : Colors.subText}
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
                  styles.textStyle,
                ]}>
                Inbox
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={HomeNavigator}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <Pets
                fill={focused ? Colors.primary : Colors.subText}
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
                  styles.textStyle,
                ]}>
                My Pets
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="OrderNavi"
        component={HomeNavigator}
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
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
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

export default BottomTabNavigator;
