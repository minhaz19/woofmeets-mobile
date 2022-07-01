import Colors from '../Colors';

export const colors = {
  headerText: Colors.light.text,
  descriptionText: Colors.light.subText,
};

export const themedColors = {
  light: {
    ...colors,
  },
  dark: {
    ...colors,
    headerText: Colors.dark.text,
    descriptionText: Colors.dark.text,
  },
};
