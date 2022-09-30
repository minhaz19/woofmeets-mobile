import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../common/text/TitleText';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import HeaderText from '../../common/text/HeaderText';
import DescriptionText from '../../common/text/DescriptionText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const ActivityHeader = (props: {
  setIsDetailsModal: (arg0: boolean) => void;
}) => {
  let navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {borderColor: colors.borderColor}]}>
      <View style={styles.containerInner}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="ios-chevron-back"
              size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
              style={styles.iconStyle}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.titleMargin}>
              <HeaderText text="Steave G." />
              <DescriptionText text="Boarding on Jun 14 - Jun 16" />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.leftContainer}>
          <Entypo
            name="dots-three-vertical"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerTwo}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
            <TitleText
              text="Book"
              textStyle={{...styles.textStyle, color: Colors.light.background}}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => navigation.navigate('EditDetails')}>
            <TitleText
              text="Modify"
              textStyle={{...styles.textStyle, color: Colors.light.background}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => props.setIsDetailsModal(true)}
          style={[
            styles.detailsButtonStyle,
            {borderColor: colors.borderColor},
          ]}>
          <TitleText text="Details" textStyle={styles.textStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerInner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMargin: {
    marginLeft: 10,
  },
  leftContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: SCREEN_WIDTH <= 380 ? 10 : SCREEN_WIDTH <= 600 ? 15 : 15,
    width: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: '49%',
  },
  iconStyle: {paddingRight: 10},
  innerTwo: {
    paddingHorizontal: 5,
    marginTop: SCREEN_WIDTH <= 380 ? 10 : SCREEN_WIDTH <= 600 ? 15 : 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButtonStyle: {
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: SCREEN_WIDTH <= 380 ? 5 : SCREEN_WIDTH <= 600 ? 8 : 8,
    borderRadius: 40,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 40,
  },
  textStyle: {
    fontWeight: '500',
  },
});

export default ActivityHeader;
