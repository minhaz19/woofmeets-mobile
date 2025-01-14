import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import HeaderText from '../../../../common/text/HeaderText';
import Text_Size from '../../../../../constants/textScaling';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';

const CardFormHeader = () => {
  const {colors, isDarkMode} = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <AnimatedLottieView
        autoPlay
        loop
        source={require('../../../../../assets/cards.json')}
        style={styles.loaderStyle}
      />
      <HeaderText textStyle={styles.text} text={'Add New Card'} />
      <AppTouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons
          name="ios-chevron-back"
          size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
          style={styles.iconStyle}
          color={Colors.primary}
        />
      </AppTouchableOpacity>
    </View>
  );
};

export default CardFormHeader;

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 300 : 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  loaderStyle: {width: Platform.OS === 'ios' ? '50%' : '60%'},
  text: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
    paddingBottom: 10,
  },
  leftContainer: {
    position: 'absolute',
    left: '4%',
    top: Platform.OS === 'ios' ? '20%' : '10%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 10},
});
