/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {BellIcon} from '../../../assets/SVG_LOGOS';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Ion from 'react-native-vector-icons/Ionicons';
import Text_Size from '../../../constants/textScaling';
import {colors} from '../../../constants/theme/textTheme';

const HeaderWithBack = (props: {
  navigation: {goBack: () => void};
  title: string | undefined;
}) => {
  return (
    <SafeAreaView style={{backgroundColor: colors.backgroundColor}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Ion
            name="ios-chevron-back"
            size={24}
            style={{paddingRight: 10}}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <Text style={[styles.title, {color: colors.headerText}]}>
            {props.title}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.bellContainer} onPress={() => {}}>
            <BellIcon />
            <View style={styles.bellView} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  headerContainer: {
    marginRight: 10,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  title: {
    fontWeight: '500',
    fontSize: Text_Size.Text_2,
    alignSelf: 'center',
    textAlign: 'center',
  },
  titleBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: SCREEN_WIDTH * 0.25,
  },
  bellContainer: {paddingRight: 5, paddingTop: 5},
  bellView: {
    height: 7,
    width: 7,
    backgroundColor: 'red',
    position: 'absolute',
    right: 12,
    top: 5,
    borderRadius: 5,
    backfaceVisibility: 'hidden',
  },
  leftContainer: {
    paddingLeft: SCREEN_WIDTH * 0.15,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderWithBack;
