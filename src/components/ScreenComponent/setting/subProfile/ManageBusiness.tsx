import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import jwtDecode from 'jwt-decode';
import storage from '../../../../utils/helpers/auth/storage';

const ManageBusiness = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
}) => {
  const [token, setToken] = useState<any>();
  const getDecodedToken = async () => {
    const tok: any = await storage.getToken();
    if (tok) {
      const decode: any = await jwtDecode(tok);
      setToken(decode);
      return decode;
    }
  };
  useEffect(() => {
    getDecodedToken();
  }, []);
  const modifyProfileData = [
    {
      id: 1,
      name: 'Calendar',
      icon: (
        <FontAwesome
          name="calendar"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
      screen: () => props.navigation.navigate('ProviderAvailablity'),
    },
    {
      id: 2,
      name: 'Subscription',
      icon: (
        <FontAwesome
          name="rocket"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
      screen: () =>
        props.navigation.navigate('SubscriptionScreen', {
          opk: 'current_plan',
          headerBack: true,
        }),
    },
    {
      id: 3,
      name: 'Receive payments',
      icon: (
        <FontAwesome
          name="dollar"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
      screen: () => props.navigation.navigate('ReceivePayments'),
    },
    {
      id: 4,
      name: 'Add or modify a payment',
      icon: (
        <FontAwesome
          name="credit-card-alt"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
      screen: () =>
        props.navigation.navigate('PaymentMethod', {sequence: null}),
    },
    {
      id: 5,
      name: 'Share your profile',
      icon: (
        <FontAwesome
          name="share-alt"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
      screen: () => {
        Linking.openURL(`https://woofmeets.com/profile/view/${token?.opk}`);
      },
    },
  ];
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      {modifyProfileData.map(
        (item: {id: number; icon: JSX.Element; name: string; screen: any}) => {
          return (
            <TouchableOpacity
              style={styles.tabContainer}
              key={item.id}
              onPress={item.screen}>
              <View style={styles.flexContainer}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <HeaderText text={item.name} textStyle={styles.headerText} />
              </View>
              <View>
                <MaterialCommunityIcons
                  name={'chevron-right'}
                  size={
                    SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28
                  }
                  color={Colors.primary}
                />
              </View>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default ManageBusiness;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '4%' : '6%',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
    width: '90%',
    paddingRight: 10,
  },
  headerText: {
    paddingLeft: 6,
  },
  iconStyles: {
    alignSelf: 'flex-start',
  },
  iconContainer: {
    width: '10%',
    paddingHorizontal: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
