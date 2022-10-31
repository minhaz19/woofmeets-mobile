import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import InputText from '../../../common/input/InputText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import DescriptionText from '../../../common/text/DescriptionText';
import BottomSpacing from '../../../UI/BottomSpacing';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import SwitchView from '../../../common/switch/SwitchView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../../constants/theme/textTheme';
import Colors from '../../../../constants/Colors';
import AppSelectField from '../../../common/Form/AppSelectField';
import AppSelectState from '../../../common/Form/AppSelectState';
import CustomStateChange from '../CustomStateChange';
import {useFormContext} from 'react-hook-form';
import {timeZones} from './utils/timeZones';
import SubmitButton from '../../../common/Form/SubmitButton';

interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
}

const General = ({handleSubmit, loading}: Props) => {
  // const [textInput, setTextInput] = useState('');
  // const [isQuickHour, setIsQuickHour] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const {control, setValue, getValues} = useFormContext();
  const timezoneData = getValues();

  // const tempData = [
  //   {
  //     id: 2,
  //     title: 'Quick Hours',
  //     icon: true,
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     input: false,
  //     iconComponent: (
  //       <SwitchView
  //         isActive={isQuickHour}
  //         activeText=""
  //         inActiveText=""
  //         onSelect={is => {
  //           setIsQuickHour(is);
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     title: 'Private Woofmeets Number',
  //     icon: false,
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     input: true,
  //     iconComponent: '',
  //   },
  // ];
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomStateChange
        visible={dropVisible}
        setVisible={setDropVisible}
        title={'Select State'}
        setValue={setValue}
        name={'timezone'}
        data={timeZones}
        value={timezoneData.timezone}
      />
      <View style={[styles.container]}>
        <AppSelectState
          placeholder={'Select time zone'}
          setOpenDropDown={() => setDropVisible(!dropVisible)}
          label={'Time Zone'}
          dropVisible={dropVisible}
          control={control}
          name={'timezone'}
        />
      </View>
      {/* <View style={[styles.container]}>
        <InputText
          title={'Your Mobile Number'}
          description={
            'Which number would you like to use for text alert?\nUpdate Number.'
          }
          placeholder={'Mobile Number'}
          value={textInput}
          setValue={setTextInput}
        />
      </View> */}
      {/* {tempData.map((item, index) => {
        return (
          <View key={index}>
            <View
              style={[
                styles.divider,
                {backgroundColor: colors.descriptionText},
              ]}
            />
            <View style={styles.flexContainer}>
              <View style={styles.innerContainer}>
                <HeaderText text={item.title} textStyle={styles._textHeader} />
                <DescriptionText
                  textStyle={styles._text}
                  text={item.description}
                />
              </View>
              <View style={styles.secondInnerWidth}>
                {item.icon && item.iconComponent}
              </View>
            </View>
            {item.input && (
              <AppSelectField
                label="Time Zone"
                placeholder={'Select time zone'}
                data={countries}
                name={''}
                control={control}
              />
            )}
          </View>
        );
      })} */}
      {/* <TouchableOpacity onPress={() => {}}>
        <DescriptionText text={'Deactivate Account'} textStyle={styles.input} />
      </TouchableOpacity> */}
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
