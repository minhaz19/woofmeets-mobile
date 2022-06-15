import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Linking,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ent from 'react-native-vector-icons/Entypo';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import {useArialNormal} from '../constants/FontDetails';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerNavigationState, ParamListBase} from '@react-navigation/native';
const CustomDrawerContent = (
  props:
    | (JSX.IntrinsicAttributes &
        ScrollViewProps & {
          children: React.ReactNode;
        } & React.RefAttributes<ScrollView>)
    | (JSX.IntrinsicAttributes & {
        state: DrawerNavigationState<ParamListBase>;
        navigation: DrawerNavigationHelpers;
        descriptors: DrawerDescriptorMap;
      }),
) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.flexContainer}>
      <DrawerContentScrollView {...props}>
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.dark.background
                : Colors.light.background,
            },
          ]}
        />
        <TouchableOpacity
          style={styles.closeDrawer}
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Ent name="cross" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer} />
          <View style={styles.nameContainer}>
            <View>
              <Text
                style={[
                  styles.userText,
                  {color: isDarkMode ? Colors.light.text : Colors.dark.text},
                ]}>
                User Name
              </Text>
              <TouchableOpacity>
                <Text style={{paddingTop: 5, color: Colors.primary}}>EDIT</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon
                name="keyboard-arrow-right"
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 50}} />
        <DrawerItemList {...props} />
        <DrawerItem
          label="About Us"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
          labelStyle={styles.itemText}
          style={styles.itemStyle}
        />
        <DrawerItem
          label="Share"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
          labelStyle={styles.itemText}
          style={styles.itemStyle}
        />
        <DrawerItem
          label="Signout"
          onPress={() => {}}
          labelStyle={styles.itemText}
          style={styles.itemStyle}
        />
        <View style={styles.bottomLastView}>
          <Text style={styles.versionText}>Version 1.5</Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {flex: 1},
  closeDrawer: {alignSelf: 'flex-end', paddingRight: 20, paddingTop: 10},
  userText: {fontWeight: '600', fontFamily: 'Arial'},
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
  },
  nameContainer: {
    padding: 10,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomLastView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 20,
  },
  versionText: {
    color: Colors.light.text,
    fontSize: SCREEN_WIDTH <= 380 ? 9 : 13,
    opacity: 0.7,
  },
  itemText: {
    color: Colors.primary,
    fontFamily: useArialNormal.fontFamily,
  },
  itemStyle: {borderBottomColor: '#ECE8E8', borderBottomWidth: 1},
});

export default CustomDrawerContent;
