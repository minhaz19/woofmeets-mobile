import {StyleSheet} from 'react-native';
import Colors from './Colors';
import {SCREEN_HEIGHT} from './WindowSize';

export const btnStyles = StyleSheet.create({
  //card button
  titleStyle: {
    color: 'white',
    fontSize: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.022 : 20,
  },
  textAlignment: {
    justifyContent: 'center',
  },
  containerStyle: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 40,
    width: '90%',
    backgroundColor: Colors.secondary,
    marginTop: '1%',
    borderRadius: 4,
  },
  containerStyleFullWidth: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 40,
    // width: '95%',
    backgroundColor: Colors.secondary,
    marginTop: '1%',
    borderRadius: 4,
    marginLeft: 0,
    marginRight: 0,
  },
  textAlignmentNoPadding: {
    justifyContent: 'center',
    paddingLeft: 0,
  },
});
