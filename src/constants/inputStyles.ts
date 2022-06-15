import {Dimensions, StyleSheet} from 'react-native';
import Colors from './Colors';
import {
  descriptionDarkText,
  descriptionLightText,
  descriptionPrimaryText,
  useArialNormal,
} from './FontDetails';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const inputStyles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT <= 700 ? SCREEN_HEIGHT * 0.04 : SCREEN_HEIGHT * 0.05,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: Colors.light.lighttext,
  },
  inputDes: {
    height: 'auto',
    minHeight: SCREEN_WIDTH <= 380 ? 50 : 70,
    padding: 10,
    color: 'black',
    borderRadius: 4,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.light.text,
  },
  input: {
    height: 40,
    borderWidth: 2,
    padding: 10,
    margin: 12,
    color: 'black',
    borderColor: Colors.light.lighttext,
  },
  containerStyle: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  inputContainerStylePet: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT <= 700 ? SCREEN_HEIGHT * 0.058 : SCREEN_HEIGHT * 0.07,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: Colors.light.lighttext,
  },
  containerStylePet: {
    paddingLeft: '5%',
    paddingRight: '5%',
    height:
      SCREEN_HEIGHT <= 700 ? SCREEN_HEIGHT * 0.065 : SCREEN_HEIGHT * 0.075,
  },
  inputStylePet: {
    color: 'black',
    letterSpacing: 1,
    fontSize: descriptionDarkText.fontSize,
    fontFamily: useArialNormal.fontFamily,
    paddingLeft: 17,
  },
  inputStyle: {
    color: Colors.light.text,
    letterSpacing: 1,
    fontSize: descriptionPrimaryText.fontSize,
    fontFamily: useArialNormal.fontFamily,
    paddingLeft: 15,
  },
  inputFontStyle: {
    fontFamily: useArialNormal.fontFamily,
    color: '#424244',
    fontSize: descriptionLightText.fontSize,
  },
  marginTop: {marginTop: 5},
  marginBottom: {marginBottom: 5},
  height: {height: 200},
  inputContainerStyleBook: {
    height: SCREEN_HEIGHT <= 700 ? SCREEN_HEIGHT * 0.04 : SCREEN_HEIGHT * 0.05,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: Colors.light.lighttext,
  },
  inputStyleBook: {
    color: 'black',
    letterSpacing: 1,
    fontSize: descriptionDarkText.fontSize,
    fontFamily: useArialNormal.fontFamily,
  },
});
