/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeIcon, Social, Services, Orders} from '../assets/SVG_LOGOS';
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
          height: SCREEN_WIDTH <= 380 ? 60 : 75,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
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
          tabBarLabel: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.bottomContainer}>
              <HomeIcon
                fill={focused ? Colors.primary : '#424244'}
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
                  styles.textStyle,
                ]}>
                Home
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
                fill={focused ? Colors.primary : '#424244'}
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
                  styles.textStyle,
                ]}>
                Social
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
              <Services
                fill={focused ? Colors.primary : '#424244'}
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
              <Orders
                fill={focused ? Colors.primary : '#424244'}
                height={SCREEN_WIDTH <= 380 ? 24 : 28}
                width={SCREEN_WIDTH <= 380 ? 26 : 33}
              />
              <Text
                style={[
                  focused ? {color: Colors.primary} : {color: '#424244'},
                  styles.textStyle,
                ]}>
                Orders
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
