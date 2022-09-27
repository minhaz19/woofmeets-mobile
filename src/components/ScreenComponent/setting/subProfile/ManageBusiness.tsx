import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ManageBusiness = () => {
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
    },
    {
      id: 2,
      name: 'Receive payments',
      icon: (
        <FontAwesome
          name="dollar"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
    },
    {
      id: 3,
      name: 'Add or modify a payment method',
      icon: (
        <FontAwesome
          name="credit-card-alt"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
    },
    {
      id: 4,
      name: 'Share your profile',
      icon: (
        <FontAwesome
          name="share-alt"
          size={20}
          color={Colors.primary}
          style={styles.iconStyles}
        />
      ),
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
        (item: {id: number; icon: JSX.Element; name: string}) => {
          return (
            <TouchableOpacity style={styles.tabContainer} key={item.id}>
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
  },
  headerText: {
    paddingLeft: 6,
  },
  iconStyles: {
    alignSelf: 'flex-start',
  },
  iconContainer: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
