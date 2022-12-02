/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import SafetyScreen from './SafetyScreen';
import AppIntroSlider from '../../splash/react-native-app-intro-slider/dist';
import DescriptionText from '../../common/text/DescriptionText';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import SchedulePetSettings from './SchedulePetSettings';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';
import CareGiver from './CareGiver';
import DuringService from './DuringService';

const slidesData = [
  {
    id: 1,
    screen: <SafetyScreen />,
  },
  {
    id: 2,
    screen: <SchedulePetSettings />,
  },
  {
    id: 3,
    screen: <CareGiver />,
  },
  {
    id: 4,
    screen: <DuringService />,
  },
];

const ScreenSlider = () => {
  const {isDarkMode} = useTheme();

  const navigation = useNavigation();
  const _renderItem = ({item}: any): JSX.Element => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: Colors.background,
          },
        ]}>
        {item.screen}
      </View>
    );
  };

  const _onDone = () => {
    // setState({showRealApp: true});
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: '80%', width: '100%'}}>
        <AppIntroSlider
          activeDotStyle={styles.activeDotStyle}
          dotStyle={styles.dotStyle}
          renderItem={_renderItem}
          data={slidesData}
          onDone={_onDone}
          showNextButton={false}
          showDoneButton={false}
          showSkipButton={false}
        />
      </View>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: Colors.primary},
        ]}>
        <AppTouchableOpacity onPress={() => navigation.goBack()}>
          <DescriptionText text={'Book Now'} textStyle={styles.description} />
        </AppTouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScreenSlider;

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    backgroundColor: Colors.light.background,
    borderColor: Colors.primary,
  },
  activeDotStyle: {width: 10, backgroundColor: Colors.border},
  slide: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '10%' : '5%',
    width: '60%',
  },
  description: {
    paddingVertical: 10,
    color: Colors.light.background,
    alignSelf: 'center',
  },
});
