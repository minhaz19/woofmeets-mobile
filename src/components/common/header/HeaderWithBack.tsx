import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import {BellIcon} from '../../../assets/SVG_LOGOS';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Ion from 'react-native-vector-icons/Ionicons';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../text/HeaderText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const HeaderWithBack = (props: {
  navigation: {goBack: () => void};
  title: string | undefined;
  icon?: boolean;
}) => {
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Ion
            name="ios-chevron-back"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            style={styles.iconStyle}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <HeaderText text={props.title} />
        </View>
        {props.icon && (
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.bellContainer} onPress={() => {}}>
              <BellIcon
                height={
                  SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28
                }
              />
              <View style={styles.bellView} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  iconStyle: {paddingRight: 10},
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
