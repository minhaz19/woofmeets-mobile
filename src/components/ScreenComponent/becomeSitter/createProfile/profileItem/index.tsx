import {View, StyleSheet, TouchableOpacity, GestureResponderEvent} from 'react-native';
import React from 'react';
import TitleText from '../../../../common/text/TitleText';
import Colors from '../../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileItemCard = (props: {
  userInfo: any;title: string; id: number; isCompleted: boolean, handleClick: ((event: GestureResponderEvent) => void) | undefined; name: string 
}) => {
  const CompletedIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <AntDesign
          name="checkcircle"
          size={12}
          color={Colors.primary}
          style={styles.iconStyle}
        />
      </View>
    )
  }
  const UnCompletedIcon = () => {
    return (
      <View style={{...styles.numberViewContainerOuter, backgroundColor: Colors.primaryLight}}>
        <View style={{...styles.numberViewContainer, backgroundColor: Colors.primary}}/>
      </View>
    )
  }
  const getIconType = (name: string) => {
    switch(name) {
      case 'pet':
        if (props.userInfo && props.userInfo[`${props.name}`]?.length > 0) {
          return (
            <CompletedIcon />
          )
        } else {
          return (
            <UnCompletedIcon />
          )
        }
        case 'Gallery':
          if (props.userInfo && props.userInfo[`${props.name}`]?.length > 0) {
            return (
              <CompletedIcon />
            )
          } else {
            return (
              <UnCompletedIcon />
            )
          }
        case 'basicInfo':
          if (props.userInfo && props.userInfo[`${props.name}`]) {
            return (
              <CompletedIcon />
            )
          } else {
            return (
              <UnCompletedIcon />
            )
          }
        case 'contact':
          if (props.userInfo && props.userInfo[`${props.name}`]) {
            return (
              <CompletedIcon />
            )
          } else {
            return (
              <UnCompletedIcon />
            )
          }
        case 'provider':
          if (props.userInfo && props.userInfo[`${props.name}`]?.providerDetails) {
            return (
              <CompletedIcon />
            )
          } else {
            return (
              <UnCompletedIcon />
            )
          }
    }
  }
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <View style={styles.headerContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.textContainer}>
          {props?.userInfo && !props.userInfo[props.name] ?
          <View style={{...styles.numberViewContainerOuter, backgroundColor: Colors.primaryLight}}>
            <View style={{...styles.numberViewContainer, backgroundColor: Colors.primary}}/>
          </View> : 
          getIconType(props.name)}
          <TitleText text={props.title} textStyle={{...styles.textStyle, color: props.isCompleted ? Colors.primary : Colors.light.subText}} />
          </View>
          {props.isCompleted ?
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={Colors.primary}
            /> :
            <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={Colors.subText}
            />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 1,
    width: '90%',
    paddingLeft: '5%',
    marginLeft: '5%',
    marginVertical: '1%',
  },
  headerContainer: {
    width: '100%',
    borderRadius: 0,
    paddingVertical: 12,
  },
  cardContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontWeight: '500',
  },
  numberStyle: {
    fontWeight: '500',
  },
  numberViewContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 6,
    width: 6,
    borderRadius: 100,
  },
  numberViewContainerOuter: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 12,
    width: 12,
    borderRadius: 100,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileItemCard;
