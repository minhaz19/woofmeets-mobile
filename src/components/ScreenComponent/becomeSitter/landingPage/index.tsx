import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  setBoardingScreen,
  setCurrentScreen,
  setProfileScreen,
} from '../../../../store/slices/onBoarding/initial';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
const LandingCard = (props: {
  item: {
    inProgress: any;
    isCompleted: any;
    title: any;
    id: any;
  };
  disable: boolean;
  completed: boolean;
}) => {
  const {inProgress, isCompleted, title, id} = props.item;
  const [loading, setLoading] = useState<boolean>(false);

  const {sitterData} = useAppSelector(state => state.initial);
  const dispatch = useAppDispatch();
  // const handleSubmit = async () => {

  //   if (id !== 2 && !sitterData[id - 2].isCompleted) {
  //     Alert.alert(
  //       'Warning!',
  //       `Please complete "${
  //         'STEP-' +
  //         sitterData[id - 3].id +
  //         ' : ' +
  //         sitterData[id - 2].title.toUpperCase()
  //       }" first to move forward. Thanks!`,
  //     );
  //   } else if (id === 2 && !sitterData[0].isCompleted) {
  //     Alert.alert(
  //       'Warning!',
  //       `Please complete "${
  //         'STEP-' +
  //         sitterData[id - 3].id +
  //         ' : ' +
  //         sitterData[id - 2].title.toUpperCase()
  //       }" first to move forward. Thanks!`,
  //     );
  //   } else {
  //     setLoading(true);
  //     dispatch(setCurrentScreen({pass: id - 1}));
  //     dispatch(setProfileScreen({pass: 0}));
  //     dispatch(setBoardingScreen({pass: 0}));
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async () => {
    // if (!sitterData[id - 2].isCompleted) {
    //   Alert.alert(
    //     'Warning!',
    //     `Please complete "${
    //       'STEP-' +
    //       sitterData[id - 3].id +
    //       ' : ' +
    //       sitterData[id - 2].title.toUpperCase()
    //     }" first to move forward. Thanks!`,
    //   );
    // } else {
    setLoading(true);
    dispatch(setCurrentScreen({pass: id - 1}));
    dispatch(setProfileScreen({pass: 0}));
    dispatch(setBoardingScreen({pass: 0}));
    setLoading(false);
    // }
  };
  const id_ = id === 1 ? '*' : id - 1;
  return (
    <TouchableOpacity
      style={{...styles.cardContainer}}
      onPress={handleSubmit}
      disabled={props?.disable}>
      {inProgress ? (
        <View style={styles.middleContainer}>
          <View
            style={{
              ...styles.numberViewContainer,
              backgroundColor: Colors.primary,
            }}>
            <TitleText
              text={id_}
              textStyle={{
                ...styles.numberStyle,
                fontSize: id_ === '*' ? Text_Size.Text_5 : Text_Size.Text_8,
                color: Colors.light.background,
              }}
            />
          </View>
          <TitleText
            text={title}
            textStyle={{...styles.textStyle, color: Colors.primary}}
          />
        </View>
      ) : (
        props?.completed &&
        id !== 1 && (
          <>
            <AntDesign
              name="checkcircle"
              size={22}
              color={Colors.primary}
              style={styles.iconStyle}
            />
            {/* <View
              style={{
                ...styles.numberViewContainer,
                backgroundColor: Colors.light.subText,
              }}>
              <TitleText
                text={id_}
                textStyle={{
                  ...styles.numberStyle,
                  color: Colors.light.background,
                }}
              />
            </View> */}
          </>
        )
      )}
      {!props?.completed && !inProgress && (
        <View style={styles.rightContainer}>
          <View
            style={{
              ...styles.numberViewContainer,
              backgroundColor: Colors.subText,
              // backgroundColor: isCompleted
              //   ? Colors.primary
              //   : Colors.light.subText,
            }}>
            <TitleText
              text={id_}
              textStyle={{
                ...styles.numberStyle,
                color: Colors.light.background,
              }}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
  },
  textStyle: {
    fontWeight: '500',
    paddingLeft: 10,
  },
  numberStyle: {
    fontWeight: '500',
    fontSize: Text_Size.Text_8,
  },
  numberViewContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: SCREEN_WIDTH < 380 ? 20 : SCREEN_WIDTH < 600 ? 24 : 28,
    width: SCREEN_WIDTH < 380 ? 20 : SCREEN_WIDTH < 600 ? 24 : 28,
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
    justifyContent: 'space-between',
  },
  rightContainer: {},
});

export default LandingCard;
