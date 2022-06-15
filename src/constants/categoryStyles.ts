import {StyleSheet} from 'react-native';
import Colors from './Colors';
import {SCREEN_WIDTH} from './WindowSize';

export const categoryStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: '3%',
    paddingTop: '3%',
  },
  containerBg: {
    backgroundColor: 'white',
    flex: 1,
  },
  //service
  containerStyle: {
    padding: SCREEN_WIDTH <= 380 ? 20 : 20,
    alignItems: 'center',
  },
  serviceIconView: {
    width: SCREEN_WIDTH < 700 ? SCREEN_WIDTH * 0.18 : 84,
    height: SCREEN_WIDTH < 700 ? SCREEN_WIDTH * 0.26 : 124,
    borderWidth: 7,
    borderRadius: SCREEN_WIDTH * 0.098,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderColor: Colors.categoryBorderInactive,
  },
  serviceIcon: {
    width: SCREEN_WIDTH < 700 ? SCREEN_WIDTH * 0.14 : 69,
    height: SCREEN_WIDTH < 700 ? SCREEN_WIDTH * 0.22 : 109,
    borderRadius: 30,
  },
  serviceText: {
    paddingTop: 5,
    paddingBottom: 10,
    textAlign: 'center',
    color: '#231F20',
    fontSize: SCREEN_WIDTH <= 380 ? 11 : 15,
    fontWeight: '700',
    width: 70,
    minHeight: 40,
  },
});
