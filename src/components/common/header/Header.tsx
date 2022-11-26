import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {BellIcon} from '../../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../text/HeaderText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Screen from '../Screen';

const HeaderWithBack = (props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
  title: string | undefined;
  notification?: boolean;
  Icon?: any;
  SecondIcon?: any;
  onPress?: (arg: any) => void;
}) => {
  const {colors} = useTheme();
  return (
    <Screen
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <HeaderText text={props.title} textStyle={{textAlign: 'center'}}/>
        </View>
        {props.Icon && (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.filterContainer}
              onPress={props.onPress}>
              <props.Icon
                height={
                  SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28
                }
              />
            </TouchableOpacity>
          </View>
        )}
        {props.notification && (
          <>
            {/* <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.bellContainer}
                onPress={() => props.navigation.navigate('Notifications')}>
                <BellIcon
                  height={
                    SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28
                  }
                />
                <View style={styles.bellView} />
              </TouchableOpacity>
            </View> */}
            {props.SecondIcon && (
              <View style={styles.secondContainer}>
                <TouchableOpacity
                  style={styles.touchContainer}
                  onPress={props.onPress}>
                  <props.SecondIcon
                    height={
                      SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28
                    }
                  />
                  {/* <View style={styles.bellView} /> */}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 0 : 5,
    paddingBottom: 4,
  },
  iconStyle: {paddingRight: 10},
  headerContainer: {
    marginRight: 10,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  filterContainer: {
    marginRight: 10,
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  secondContainer: {
    marginRight: 60,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  touchContainer: {},
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
    paddingLeft: SCREEN_WIDTH <= 800 ? SCREEN_WIDTH * 0.15 : SCREEN_WIDTH * 0.1,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderWithBack;
