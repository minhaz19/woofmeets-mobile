import {useColorScheme} from 'react-native';
import {themedColors} from '../textTheme';

export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = isDarkMode ? themedColors.dark : themedColors.light;
  return {
    colors,
    isDarkMode,
  };
};
