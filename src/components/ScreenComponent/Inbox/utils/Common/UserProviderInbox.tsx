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
    title: 'As Pet Owner',
  },
  {
    id: 'PROVIDER',
    title: 'As Pet Sitter',
  },
];
interface Props {
  active: string;
  setActive: (arg: string) => void;
  setPage: (arg: number) => void;
  setError: (arg: boolean) => void;
  setUser: (arg: any[]) => void;
  setProvider: (arg: any[]) => void;
}
const UserProviderInbox = ({
  active,
  setActive,
  setPage,
  setError,
  setProvider,
  setUser,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.background,
          // paddingTop: StatusBar.currentHeight,
        },
      ]}>
      {data.map((item, index) => (
        <AppTouchableOpacity
          onPress={() => {
            setError(false);
            setPage(1);
            if (item.id === 'USER') {
              setUser([]);
            } else {
              setProvider([]);
            }
            setActive(item.id);
          }}
          key={index}
          style={{
            paddingVertical: 10,
            backgroundColor:
              active === item.id ? Colors.primaryDeep : Colors.lightShade,
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
