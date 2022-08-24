import {
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '../constants/theme/hooks/useTheme';
import ButtonCom from '../components/UI/ButtonCom';
import {btnStyles} from '../constants/theme/common/buttonStyles';
import IOSButton from '../components/UI/IOSButton';
import Colors from '../constants/Colors';
import Text_Size from '../constants/textScaling';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import BigText from '../components/common/text/BigText';
import TitleText from '../components/common/text/TitleText';

const AfterIntroScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.secondary,
        },
      ]}>
      <ScrollView
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
          <BigText text="Woofmeets" />
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
    borderRadius: 100,
    width: '60%',
    height: SCREEN_WIDTH <= 380 ? 160 : 260,
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
    paddingTop: '18%',
    paddingHorizontal: SCREEN_WIDTH <= 800 ? '5%' : '10%',
  },
  titleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_1,
    flex: 1,
  },
  signTitleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_1,
    flex: 1,
    marginTop: 15,
  },
  description: {
    marginTop: '3%',
  },
});
