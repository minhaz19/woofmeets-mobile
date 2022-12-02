import {useColorScheme} from 'react-native';
import {themedColors} from '../textTheme';

export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = themedColors.light;
  return {
    colors,
    isDarkMode,
  };
};
