/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../../common/text/TitleText';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';

const data = [
  {
    id: 'USER',
    title: 'Pet Owner',
  },
  {
    id: 'PROVIDER',
    title: 'Pet Sitter',
  },
];
interface Props {
  active: string;
  setActive: (arg: string) => void;
}
const UserProviderInbox = ({active, setActive}: Props) => {
  const {colors, isDarkMode} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.lightDark
            : Colors.primaryLight,
        },
      ]}>
      {data.map((item, index) => (
        <AppTouchableOpacity
          onPress={() => {
            setActive(item.id);
          }}
          key={index}
          style={{
            paddingVertical: 10,
            backgroundColor:
              active === item.id
                ? Colors.primary
                : isDarkMode
                ? Colors.dark.lightDark
                : Colors.primaryLight,
            width: '46%',
            margin: '2%',
            borderRadius: 6,
          }}>
          <TitleText
            textStyle={{
              textAlign: 'center',
              color: active === item.id ? Colors.background : colors.headerText,
              fontWeight: 'bold',
            }}
            text={item.title}
          />
        </AppTouchableOpacity>
      ))}
    </View>
  );
};

export default UserProviderInbox;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%',
    borderRadius: 10,

    marginVertical: 20,
  },
});
