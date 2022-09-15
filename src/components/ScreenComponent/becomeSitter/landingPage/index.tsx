import {View, StyleSheet} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LandingCard = (props: { item: { inProgress: any; isCompleted: any; title: any; id: any; }; }) => {
  const {inProgress, isCompleted, title, id} = props.item;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        {isCompleted && <AntDesign
          name="checkcircle"
          size={22}
          color={Colors.primary}
          style={styles.iconStyle}
          />}
         {inProgress && <View style={styles.middleContainer}>
            <View style={{...styles.numberViewContainer, backgroundColor: Colors.primary}}>
              <TitleText text={id} textStyle={{...styles.numberStyle, color: Colors.light.background}} />
            </View>
            <TitleText text={title} textStyle={{...styles.textStyle, color: Colors.primary}} />
          </View>
          }
      </View>
      
      {!isCompleted && !inProgress && <View style={styles.rightContainer}>
        <View style={{...styles.numberViewContainer, backgroundColor: isCompleted ? Colors.primary : Colors.light.subText}}>
          <TitleText text={id} textStyle={{...styles.numberStyle, color: Colors.light.background}} />
        </View>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
