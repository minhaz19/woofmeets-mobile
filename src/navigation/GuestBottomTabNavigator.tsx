import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Finder, Setting} from '../assets/svgs/SVG_LOGOS';
import Colors from '../constants/Colors';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import SettingNavigator from './bottoms/SettingNavigator';
import ServiceNavigator from './bottoms/ServiceNavigator';
import BottomTabText from '../components/common/text/BottomTabText';

const Tab = createBottomTabNavigator();

function GuestBottomTabNavigator() {
  // const {colors} = useTheme();
  const height =
    SCREEN_WIDTH <= 380
      ? Platform.OS === 'ios'
        ? 60
        : 60
      : Platform.OS === 'ios'
      ? 80
      : 70;
  return (
    <Tab.Navigator
      initialRouteName="ServiceNavigator"
      screenOptions={{
        // tabBarShowLabel: false,
        // tabBarHideOnKeyboard: true,
        // tabBarStyle: {
        //   backgroundColor: Colors.background,
        //   height: height,
        //   position: 'absolute',
        //   bottom: 0,
        //   elevation: 9,
        //   shadowOpacity: 0.9,
        //   shadowOffset: {width: 2, height: 8},
        //   shadowColor: Colors.background,
        //   borderTopWidth: 2,
        //   borderColor: colors.borderColor,
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
          marginBottom: Platform.os === 'IOS' ? 20 : 10,
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

export default GuestBottomTabNavigator;
