import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import General from './General';
import Notification from './Notification';

const data = [
  {
    id: 1,
    title: 'General',
    opacity: 1,
  },
  {
    id: 2,
    title: 'Notification',
    opacity: 1,
  },
];

const AccountSetting = () => {
  const [showSetting, setShowSetting] = useState(1);
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <HeaderText text="Account Setting" textStyle={styles.textContainer} />
      <View style={styles.flexContainer}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => setShowSetting(item.id)}>
                <HeaderText
                  text={item.title}
                  textStyle={
                    showSetting === item.id ? styles.text1 : styles.text2
                  }
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      {showSetting === 1 && <General />}
      {showSetting === 2 && <Notification />}
    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '4%',
  },
  textContainer: {
    fontSize: Text_Size.Text_2,
    marginBottom: '1%',
  },
  itemContainer: {
    paddingTop: '4%',
    paddingRight:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '5%' : '7%',
  },
  flexContainer: {
    flexDirection: 'row',
  },
  text1: {
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: '2%',
  },
  text2: {
    fontWeight: '400',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginBottom:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
  },
});
