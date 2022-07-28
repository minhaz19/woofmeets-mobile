import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '2%',
  },
  imageContainer: {
    width: '100%',
    height: SCREEN_WIDTH >= 800 ? 260 : 200,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {width: '100%', height: '100%'},
  innerContainer: {
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '4%',
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalPadding: {
    paddingVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
  },
  titleStyleMedium: {
    textAlign: 'center',
    fontWeight: '500',
  },
  titleStylePaddingMedium: {
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },
  titleStylePadding: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  titleStylePadding2: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    width: SCREEN_WIDTH <= 800 ? '90%' : '60%',
    alignSelf: 'center',
  },
});
