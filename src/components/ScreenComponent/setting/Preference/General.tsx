import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import InputText from '../../../common/input/InputText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import DescriptionText from '../../../common/text/DescriptionText';
import BottomSpacing from '../../../UI/BottomSpacing';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import Dropdown from '../../../common/dropDown/Dropdown';
import SwitchView from '../../../common/switch/SwitchView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../../constants/theme/textTheme';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

const General = () => {
  const [textInput, setTextInput] = useState('');
  const [isQuickHour, setIsQuickHour] = useState(false);
  const [isMessageSupport, setIsMessageSupport] = useState(false);
  const tempData = [
    {
      id: 1,
      title: 'MMS Message Support',
      icon: true,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      input: false,
      iconComponent: (
        <SwitchView
          isActive={isMessageSupport}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsMessageSupport(is);
          }}
        />
      ),
    },
    {
      id: 2,
      title: 'Quick Hours',
      icon: true,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      input: false,
      iconComponent: (
        <SwitchView
          isActive={isQuickHour}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsQuickHour(is);
          }}
        />
      ),
    },
    {
      id: 3,
      title: 'Private Woofmeets Number',
      icon: false,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      input: true,
      iconComponent: '',
    },
  ];
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <Dropdown
          label="Time Zone"
          placeholder={'Select time zone'}
          data={countries}
        />
      </View>
      <View style={[styles.container]}>
        <InputText
          title={'Your Mobile Number'}
          description={
            'Which number would you like to use for text alert?\nUpdate Number.'
          }
          placeholder={'Mobile Number'}
          value={textInput}
          setValue={setTextInput}
          icon={true}
        />
      </View>
      {tempData.map((item, index) => {
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
              <Dropdown placeholder={'Anytime'} data={countries} />
            )}
          </View>
        );
      })}
      <TouchableOpacity onPress={() => {}}>
        <DescriptionText text={'Deactivate Account'} textStyle={styles.input} />
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Save Setting'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
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
