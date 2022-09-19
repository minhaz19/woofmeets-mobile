import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { setCurrentScreen, setSitterData } from '../../../../store/slices/onBoarding/initial';
import { useAppDispatch } from '../../../../store/store';

const LandingCard = (props: { item: { inProgress: any; isCompleted: any; title: any; id: any; }; }) => {
  const {inProgress, isCompleted, title, id} = props.item;
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleSubmit = async() => {
      setLoading(true);
      dispatch(setCurrentScreen({pass: id-1}));
      setLoading(false);
  }
  return (
    <TouchableOpacity style={{...styles.cardContainer}} onPress={handleSubmit}>
    <View style={styles.leftContainer}>
        {
         inProgress ? 
            <View style={styles.middleContainer}>
              <View style={{...styles.numberViewContainer, backgroundColor: Colors.primary}}>
                <TitleText text={id} textStyle={{...styles.numberStyle, color: Colors.light.background}} />
              </View>
              <TitleText text={title} textStyle={{...styles.textStyle, color: Colors.primary}} />
            </View> 
          : isCompleted && 
            <AntDesign
              name="checkcircle"
              size={22}
              color={Colors.primary}
              style={styles.iconStyle}
            />
          }
      </View>
      
      {!isCompleted && !inProgress && <View style={styles.rightContainer}>
        <View style={{...styles.numberViewContainer, backgroundColor: isCompleted ? Colors.primary : Colors.light.subText}}>
          <TitleText text={id} textStyle={{...styles.numberStyle, color: Colors.light.background}} />
        </View>
      </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  textStyle: {
    fontWeight: '500',
    paddingLeft: 10, 
  },
  numberStyle: {
    fontWeight: '500',
  },
  numberViewContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    borderRadius: 100,
    flexDirection: 'row',
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
    // alignContent: 'flex-end',
    justifyContent: 'flex-end',
  }
});

export default LandingCard;
