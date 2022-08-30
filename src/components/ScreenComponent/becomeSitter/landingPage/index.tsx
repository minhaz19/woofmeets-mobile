import {View, StyleSheet, TouchableOpacity, GestureResponderEvent} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Card from '../../../UI/Card';
import Colors from '../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LandingCard = (props: {title: string; id: number; isCompleted: boolean, handleClick: ((event: GestureResponderEvent) => void) | undefined}) => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <Card style={styles.headerContainer} containerStyle={styles.contentStyle}>
        <View style={styles.cardContainer}>
          <View style={styles.textContainer}>
          <View style={{...styles.numberViewContainer, backgroundColor: props.isCompleted ? Colors.primary : Colors.border}}>
             <TitleText text={props.id} textStyle={{...styles.numberStyle, color: Colors.light.background}} />
          </View>
          <TitleText text={props.title} textStyle={{...styles.textStyle, color: props.isCompleted ? Colors.primary : Colors.light.subText}} />
          </View>
          {props.isCompleted ?
          <AntDesign
            name="checkcircle"
            size={22}
            color={Colors.primary}
            style={styles.iconStyle}
            /> :
            <MaterialCommunityIcons
            name="progress-clock"
            size={22}
            color={Colors.subText}
            />}
        </View>
      </Card>
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
    marginRight: 10,
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LandingCard;
