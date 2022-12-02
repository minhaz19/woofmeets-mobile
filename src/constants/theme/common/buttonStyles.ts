import {StyleSheet} from 'react-native';
import Text_Size from '../../textScaling';
import {SCREEN_HEIGHT} from '../../WindowSize';

export const btnStyles = StyleSheet.create({
  //card button
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_0,
    flex: 1,
  },
  textAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 50,
    width: '90%',
    marginTop: '1%',
    borderRadius: 4,
  },
  containerStyleFullWidth: {
    height:
      SCREEN_HEIGHT > 400 && SCREEN_HEIGHT <= 800
        ? SCREEN_HEIGHT * 0.05
        : SCREEN_HEIGHT <= 400
        ? SCREEN_HEIGHT * 0.04
        : 45,
    marginTop: '1%',
    borderRadius: 50,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
  textAlignmentNoPadding: {
    justifyContent: 'center',
    paddingLeft: 0,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_5,
    flex: 1,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.04 : 30,
    borderRadius: 100,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
});
