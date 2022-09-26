/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DescriptionText from '../components/common/text/DescriptionText';
import HeaderText from '../components/common/text/HeaderText';
import AppIntroSlider from '../components/splash/react-native-app-intro-slider/dist';
import Colors from '../constants/Colors';
import Text_Size from '../constants/textScaling';
import MainNavigationContainer from '../navigation/MainNavigationContainer';
import FirstScreen from './FirstScreen';
import authStorage from '../utils/helpers/auth/storage';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import {slides} from '../utils/config/Data/splashDatas';
import {signIn} from '../store/slices/auth/userSlice';

const Splash = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPreviousUser, setIsPreviousUser] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    showRealApp: false,
  });

  const _renderItem = ({item}: any): JSX.Element => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.background,
          },
        ]}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.footerContainer}>
          <HeaderText text={item.title} textStyle={styles.text} />
          <DescriptionText text={item.text} textStyle={styles.description} />
        </View>
      </View>
    );
  };

  const _onDone = () => {
    setState({showRealApp: true});
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | any = null;
    if (state.showRealApp === false) {
      timer = setTimeout(() => {
        return setState({
          showRealApp: true,
        });
      }, 14000);
    } else {
      return () => clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [state.showRealApp]);

  const [ldIcon, setldIcon] = useState(true);

  useEffect(() => {
    let timer: any = null;
    if (ldIcon === true) {
      timer = setTimeout(() => {
        return setldIcon(false);
      }, 2000);
    } else {
      return () => clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [ldIcon]);

  const signInHandler = async () => {
    try {
      const token = await authStorage.getToken();
      if (token) {
        const decode: any = jwt_decode(token);
        const expiryData = decode.exp;
        const nowDate = new Date();
        let expDate = new Date(expiryData * 1000) > nowDate;
        if (expDate) {
          await dispatch(
            signIn({
              token: token,
              userInfo: decode,
            }),
          );
          setIsPreviousUser(true);
        } else {
          authStorage.removeToken();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    signInHandler();
  }, []);

  const RenderIcon = () => {
    return (
      <View style={styles.logoContainer}>
        <FirstScreen />
      </View>
    );
  };

  if (ldIcon) {
    return <RenderIcon />;
  } else {
    return (
      <>
        {isPreviousUser ? (
          <MainNavigationContainer previousLoggedIn={true} />
        ) : state.showRealApp ? (
          <MainNavigationContainer previousLoggedIn={false} />
        ) : (
          <AppIntroSlider
            activeDotStyle={styles.activeDotStyle}
            dotStyle={styles.dotStyle}
            renderItem={_renderItem}
            data={slides}
            onDone={_onDone}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            showSkipButton={true}
          />
        )}
      </>
    );
  }
};

export default Splash;

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: Text_Size.Text_5,
    fontWeight: 'bold',
    marginHorizontal: '10%',
    textAlign: 'center',
  },
  headerText: {
    fontSize: Text_Size.Text_5,
    fontFamily: 'Muli',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  dotStyle: {
    width: 10,
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
  },
  activeDotStyle: {width: 10, backgroundColor: Colors.primary},
  slide: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  description: {
    paddingTop: 15,
    marginBottom: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: '10%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    height: '50%',
    paddingTop: '20%',
    width: '100%',
  },
});
