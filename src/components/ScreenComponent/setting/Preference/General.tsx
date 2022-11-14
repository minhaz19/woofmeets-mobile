import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import BottomSpacing from '../../../UI/BottomSpacing';
import {colors} from '../../../../constants/theme/textTheme';
import Colors from '../../../../constants/Colors';
import {useFormContext} from 'react-hook-form';
import {timeZones} from './utils/timeZones';
import SubmitButton from '../../../common/Form/SubmitButton';
import AppDropDownSelect from '../../../common/AppDropDownSelect';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TimezoneDropDown from './TimezoneDropDown';
interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
}

const General = ({handleSubmit, loading}: Props) => {
  const {
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  const timezoneData = getValues();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <TimezoneDropDown
        title={'Time Zone'}
        setValue={setValue}
        name={'timezone'}
        data={timeZones}
        valueData={timezoneData.timezone}
        placeholder={'Select time zone'}
        errors={errors}
      />
      <View style={styles.footerContainer}>
        <SubmitButton
          title="Save Settings"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
      <BottomSpacing />
      <BottomSpacing />
    </ScrollView>
  );
};

export default General;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
  },
  innerContainer: {
    width: '80%',
  },
  secondInnerWidth: {
    // width: '20%',
  },
  _text: {
    paddingTop: SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '4%' : '0%',
    color: colors.descriptionText,
  },
  _textHeader: {
    fontWeight: '500',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '3%',
  },
  input: {
    paddingTop: SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
    color: Colors.button.blue,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    paddingTop:
      SCREEN_WIDTH <= 380 ? '10%' : SCREEN_WIDTH <= 600 ? '10%' : '4%',
  },
  container: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
  },
});
