import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import InputText from '../../../common/input/InputText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import DescriptionText from '../../../common/text/DescriptionText';
import {CallIcon} from '../../../../assets/Setting_SVG';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../UI/BottomSpacing';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';

const tempData = [
  {
    id: 1,
    title: 'MMS Message Support',
    icon: true,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    input: false,
  },
  {
    id: 1,
    title: 'Quick Hours',
    icon: true,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    input: false,
  },
  {
    id: 1,
    title: 'Private Woofmeets Number',
    icon: false,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    input: true,
  },
];

const General = () => {
  const [textInput, setTextInput] = useState('');
  const {colors} = useTheme();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <InputText
          title={'Time Zone'}
          placeholder={'Time Zone'}
          value={textInput}
          setValue={setTextInput}
          icon={true}
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
          <>
            <View
              key={index}
              style={[
                styles.divider,
                {backgroundColor: colors.descriptionText},
              ]}
            />
            <View style={styles.flexContainer}>
              <View style={styles.innerContainer}>
                <HeaderText text={item.title} />
                <DescriptionText
                  textStyle={styles._text}
                  text={item.description}
                />
              </View>
              <View style={styles.secondInnerWidth}>
                {item.icon && (
                  <CallIcon
                    height={
                      SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 24 : 28
                    }
                  />
                )}
              </View>
            </View>
            {item.input && (
              <InputText
                placeholder={'Anytime'}
                value={textInput}
                setValue={setTextInput}
                icon={true}
                style={styles.input}
              />
            )}
          </>
        );
      })}
      <DescriptionText text={'Deactivate'} textStyle={styles.input} />
      <DescriptionText text={'Account'} textStyle={styles.input} />
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
    marginTop: '2%',
  },
  innerContainer: {
    width: '80%',
  },
  secondInnerWidth: {
    // width: '20%',
  },
  _text: {
    paddingTop: '4%',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  input: {
    paddingTop: '2%',
  },
  footerContainer: {
    paddingVertical: '10%',
  },
  container: {
    marginVertical: '1%',
  },
});
