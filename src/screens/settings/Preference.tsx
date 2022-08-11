import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import PreferenceItem from '../../components/ScreenComponent/setting/Preference/PreferenceItem';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import Text_Size from '../../constants/textScaling';

const Preference = (props: {navigation: {navigate: (arg0: string) => any}}) => {
  const {colors} = useTheme();
  const supportData = [
    {
      id: 1,
      title: 'Account Setting',
      screenName: () => props.navigation.navigate('AccountSetting'),
      opacity: 1,
    },
    {
      id: 2,
      title: 'Logout',
      screenName: () => {},
      opacity: 1,
    },
    {
      id: 3,
      title: 'Terms of Service',
      screenName: () => {},
      details: 'https://www.google.com',
      opacity: 1,
    },
    {
      id: 4,
      title: 'Privacy Policy',
      screenName: () => {},
      details: 'https://www.google.com',
      opacity: 1,
    },
    {
      id: 5,
      title: 'Version',
      screenName: () => {},
      details: '1.0.2 - beta',
      opacity: 1,
    },
  ];
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <HeaderText text="General" textStyle={styles.textContainer} />
      {supportData?.map(item => (
        <PreferenceItem key={item.id} data={item} />
      ))}
      <HeaderText text="Woofmeets" textStyle={styles.bottomTextContainer} />
    </ScrollView>
  );
};

export default Preference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '5%' : '7%',
    paddingVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '0%',
    fontSize: Text_Size.Text_9,
  },
  bottomTextContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    paddingVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
    fontSize: Text_Size.Text_2,
  },
});
