import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.logoContainer,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.background
            : Colors.background,
        },
      ]}>
      <Text
        style={[
          styles.headerText,
          {
            color: isDarkMode ? Colors.dark.text : Colors.text,
          },
        ]}>
        This is a header
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.dark.text : Colors.text,
          },
        ]}>
        One unified app for Meetings, Phone and Chat together on any device.
        Bundle Zoom Phone, Meetings and Chat together and save. Move from a chat
        or a phone call to a meeting with a single click Enjoy industry leading
        usability with top-rated video and audio quality Apps are available for
        Windows, MacOS and Linux as well as for iOS and Android OS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: Text_Size.Text_1,
    fontFamily: 'Muli', 'Arial',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontSize: Text_Size.Text_4,
    fontFamily: 'Muli', 'Arial',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
});

export default Home;
