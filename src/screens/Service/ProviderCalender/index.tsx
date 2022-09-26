import {View} from 'react-native';
import React from 'react';
import FullCalendar from '../../../components/ScreenComponent/Service/ProviderFullCalendar/FullCalendar';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
interface Props {
  route: {
    params: {
      availability: [string];
      loading: boolean;
    };
  };
}
const ProviderCalendar = ({route}: Props) => {
  const {colors} = useTheme();
  const {availability} = route?.params;
  return (
    <>
      {/* {loading && <AppActivityIndicator visible={true} />} */}
      <View style={{backgroundColor: colors.backgroundColor}}>
        <FullCalendar availability={availability} />
      </View>
    </>
  );
};

export default ProviderCalendar;
