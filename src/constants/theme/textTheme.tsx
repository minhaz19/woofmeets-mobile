import Colors from '../Colors';

export const colors = {
  headerText: Colors.light.text,
  descriptionText: Colors.light.subText,
  backgroundColor: Colors.light.background,
  lightBackgroundColor: Colors.light.background,
};

export const themedColors = {
  light: {
    ...colors,
  },
  dark: {
    ...colors,
    headerText: Colors.dark.text,
    descriptionText: Colors.dark.text,
    backgroundColor: Colors.dark.background,
    lightBackgroundColor: Colors.dark.lightDark,
  },
};
