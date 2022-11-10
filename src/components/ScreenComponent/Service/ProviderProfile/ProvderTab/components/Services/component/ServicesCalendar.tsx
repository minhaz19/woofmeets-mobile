import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../../../../constants/Colors';
import TitleText from '../../../../../../../common/text/TitleText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AppSelectField from '../../../../../../../common/Form/AppSelectField';
import {useForm} from 'react-hook-form';
import {useMarkedStyles} from './utils/useMarkedStyles';
import {useAvailability} from './utils/useAvailability';

type StackParamList = {
  ProviderCalendar: {foo: string; onBar: () => void} | undefined;
};
type NavigationProps = StackNavigationProp<StackParamList>;
interface Props {
  availabilityData: any;
  providerOpk: string;
}
const today = new Date();
const ServicesCalendar = ({availabilityData, providerOpk}: Props) => {
  const [selectedService, setSelectedService] = useState(
    availabilityData.selectData[0].id,
  );
  const [monthRef, setMonthRef] = useState<any>(null);
  const {colors} = useTheme();
  const {control} = useForm();
  const navigation = useNavigation<NavigationProps>();
  const {loading, availabileDates, getAvailablity, getCurrentMonthDate} =
    useAvailability(selectedService, navigation, monthRef, providerOpk);
  const {_markedStyle} = useMarkedStyles(availabileDates);

  console.log('memo');
  return (
    <>
      <View style={styles.selectContainer}>
        <AppSelectField
          placeholder="Select Service"
          label={'Select a service'}
          name={'something'}
          defaultText={availabilityData.selectData[0].value}
          data={availabilityData.selectData}
          control={control}
          setSelectedService={setSelectedService}
        />
      </View>
      <View>
        <Calendar
          style={styles.calenderStyles}
          markingType={'custom'}
          markedDates={_markedStyle}
          minDate={today.toString()}
          pastScrollRange={0}
          enableSwipeMonths
          onMonthChange={monthData => {
            setMonthRef(monthData);
            if (monthData.month === today.getMonth() + 1) {
              getAvailablity(monthData, 'current');
            } else if (monthData.month < today.getMonth() + 1) {
              return;
            } else {
              getAvailablity(monthData);
            }
          }}
          displayLoadingIndicator={loading}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          theme={{
            backgroundColor: colors.backgroundColor,
            calendarBackground: colors.backgroundColor,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.headerText,
            todayTextColor: Colors.primary,
            dayTextColor: colors.headerText,
            textDisabledColor: Colors.gray,
            arrowColor: Colors.headerText,
            disabledArrowColor: Colors.subText,
            monthTextColor: colors.headerText,
            indicatorColor: colors.headerText,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={async () => {
          const monthData = getCurrentMonthDate(true);
          getAvailablity(monthData, 'fullYear');
        }}>
        <TitleText textStyle={styles.title} text="View Full Calendar 🗓" />
      </TouchableOpacity>
    </>
  );
};

export default ServicesCalendar;

const styles = StyleSheet.create({
  containerCL: {},
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  selectContainer: {width: '100%'},
});
