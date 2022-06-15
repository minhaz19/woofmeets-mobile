import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerItemStyle: {
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? '#ECE8E8' : '#ECE8E8',
          padding: 0,
        },
      }}
      initialRouteName="BottomTabNavigator">
      <Drawer.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerTitle: 'Gotta',
          headerShown: false,
          drawerLabel: () => (
            <View style={styles.mainContainer}>
              <Text style={{color: Colors.primary}}>Home</Text>
              <Icon
                name="keyboard-arrow-right"
                size={24}
                color={Colors.primary}
              />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DrawerNavigator;
