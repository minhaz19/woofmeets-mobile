import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useSelector} from 'react-redux';
import AppIntroSlider from '../components/splash/react-native-app-intro-slider/dist';
import Colors from '../constants/Colors';
import Text_Size from '../constants/textScaling';
import {textStyle} from '../constants/theme/common/textStyle';
import MainNavigationContainer from '../navigation/MainNavigationContainer';
import FirstScreen from './FirstScreen';

const Splash = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  // const loggedIn = useSelector(state => state.login);
  const [isPreviousUser] = useState(false);

  // useEffect(() => {
  //   setIsPreviousUser(loggedIn.isPreviousUser);
  // }, [loggedIn]);
  const [state, setState] = useState({
    showRealApp: false,
  });
  console.log('loggedin', isPreviousUser);

  const slides = [
    {
      key: 1,
      title: 'Book Sitters & Walkers',
      text: "Pick the service you need and book your pet's perfect match. Pay directly through our secured app.",
      image: require('../assets/splash/sp-1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Loving Pet Care In Your',
      text: "Welcome to the world's largest network of 5-star pet sitters and dog walkers.",
      image: require('../assets/splash/sp-2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Keep Connected',
      text: "Chat with your sitter or walker and receive photo updates for any service you book. You'll even receive GPS maps for walks.",
      image: require('../assets/splash/sp-3.png'),
      backgroundColor: '#22bcb5',
    },
    {
      key: 4,
      title: 'Enjoy Peace Of Mind',
      text: 'All sitters are reviewed and approved, and every booking is backed by the Woofmeets Guarantee, which includes 24/7 support and vet care reimbursement for eligible claims',
      image: require('../assets/splash/sp-4.png'),
      backgroundColor: '#22bcb5',
    },
  ];

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
          <Text
            style={[
              styles.text,
              {
                color: isDarkMode ? Colors.dark.text : Colors.headerText,
              },
            ]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: isDarkMode ? Colors.dark.text : Colors.subText,
              },
            ]}>
            {item.text}
          </Text>
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
          <MainNavigationContainer previousLoggedIn />
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
    fontFamily: 'Arial',
    marginHorizontal: '10%',
    textAlign: 'center',
  },
  headerText: {
    fontSize: Text_Size.Text_4,
    fontFamily: 'Arial',
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
    ...textStyle.descriptionText,
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
    height: '60%',
    paddingTop: '20%',
    width: '100%',
  },
});
