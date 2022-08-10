import {View} from 'react-native';
import React from 'react';
import FullCalendar from '../../../components/ScreenComponent/Service/ProviderFullCalendar/FullCalendar';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const ProviderCalendar = () => {
  const {colors} = useTheme();
  return (
    <View style={{backgroundColor: colors.backgroundColor}}>
      <FullCalendar />
    </View>
  );
};

export default ProviderCalendar;
