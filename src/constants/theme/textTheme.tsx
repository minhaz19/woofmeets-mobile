import Colors from '../Colors';

export const colors = {
  headerText: Colors.light.text,
  descriptionText: Colors.light.subText,
  lightText: Colors.light.lightText,
  placeholderTextColor: Colors.light.placeholderTextColor,
  backgroundColor: Colors.light.background,
  lightBackgroundColor: Colors.light.background,
  inputLightBg: Colors.light.inputBg,
  alert: Colors.alert,
  blueText: Colors.light.blue,
  borderColor: Colors.light.borderColor,
  inputBackground: Colors.light.inputBackground,
};

export const themedColors = {
  light: {
    ...colors,
  },
  dark: {
    ...colors,
    headerText: Colors.dark.text,
    descriptionText: Colors.dark.text,
    lightText: Colors.dark.text,
    backgroundColor: Colors.dark.background,
    lightBackgroundColor: Colors.dark.lightDark,
    placeholderTextColor: Colors.dark.text,
    inputLightBg: Colors.dark.borderColor,
    blueText: Colors.dark.text,
    borderColor: Colors.dark.borderColor,
    inputBackground: Colors.dark.text,
  },
};
