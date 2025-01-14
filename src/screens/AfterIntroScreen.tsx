import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../constants/theme/hooks/useTheme';
import ButtonCom from '../components/UI/ButtonCom';
import {btnStyles} from '../constants/theme/common/buttonStyles';
import IOSButton from '../components/UI/IOSButton';
import Colors from '../constants/Colors';
import Text_Size from '../constants/textScaling';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import TitleText from '../components/common/text/TitleText';
import BottomSpacing from '../components/UI/BottomSpacing';

const AfterIntroScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {colors, isDarkMode} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
        style={[
          styles.infoContainer,
          {
            backgroundColor: colors.lightBackgroundColor,
          },
        ]}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.roundContainer}
            resizeMode="contain"
            source={require('../assets/image/login/logo.png')}
          />
        </View>
        <View style={styles.middleContainer}>
          {/* <BigText text="Woofmeets" /> */}
          <TitleText
            text="Loving pet care in your neighbourhood"
            textStyle={styles.description}
          />
        </View>
        <View style={styles.footerContainer}>
          <ButtonCom
            title={'Find pet care'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => props.navigation.navigate('GuestBottomTab')}
          />

          <IOSButton
            title={'Sign In'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={styles.signTitleStyle}
            onSelect={() => props.navigation.navigate('LogIn')}
          />
          <IOSButton
            title={'Create account'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={styles.titleStyle}
            onSelect={() => props.navigation.navigate('SignUp')}
          />
        </View>
        <BottomSpacing />
      </ScrollView>
    </View>
  );
};

export default AfterIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    marginTop: SCREEN_WIDTH <= 380 ? 80 : 120,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    height: '100%',
  },
  view: {
    height: 80,
  },
  roundContainer: {
    borderRadius: 200,
    width: '60%',
    height: SCREEN_WIDTH <= 380 ? 160 : 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  footerContainer: {
    paddingTop: '12%',
    paddingHorizontal: SCREEN_WIDTH <= 800 ? '5%' : '10%',
  },
  titleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_2,
    flex: 1,
  },
  signTitleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_2,
    flex: 1,
    marginTop: 15,
  },
  description: {
    marginTop: '0%',
  },
});
