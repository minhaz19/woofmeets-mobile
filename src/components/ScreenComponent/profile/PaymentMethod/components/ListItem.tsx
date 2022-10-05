/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import methods from '../../../../../api/methods';

import {Delete} from '../../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../../constants/Colors';
import Text_Size from '../../../../../constants/textScaling';
import {getCards} from '../../../../../store/slices/payment/PaymentCards/getCardsAction';
import {useAppDispatch} from '../../../../../store/store';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../../common/text/TitleText';
interface Props {
  cards?: any;
  newCard?: boolean;
  Icon: any;
  defaultCard?: boolean;
  onPress?: () => void;
  activeCard?: boolean;
  handleUpdate?: (arg: number) => void;
}
type StackParamList = {
  AddCardForm: {foo: string; onBar: () => void} | undefined;
};

type NavigationProps = StackNavigationProp<StackParamList>;
const ListItem = ({
  cards,
  Icon,
  onPress,
  newCard = false,
  defaultCard = false,
  activeCard = false,
  handleUpdate,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          marginRight: 20,
        }}>
        <TouchableOpacity
          style={{margin: 10}}
          onPress={() => handleUpdate!(cards.id)}>
          <Delete fill="black" width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 10}}
          onPress={() => {
            Alert.alert('Delete!', 'Are you sure to  delete this card.', [
              {
                text: 'No',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  await methods._delete(
                    `/stripe-payment-method/customer/all-cards/${cards.id}`,
                  );
                  dispatch(getCards());
                },
              },
            ]);
          }}>
          <Delete fill="black" width={20} height={20} />
        </TouchableOpacity>
      </View>
    );
  };
  const swipeFromLeftOpen = () => {
    // Alert.alert('Swipe from left');
  };
  const swipeFromRightOpen = () => {
    // Alert.alert('Swipe from right');
  };
  return (
    <>
      {newCard ? (
        <AppTouchableOpacity
          style={[styles.taskContainer, {paddingVertical: 20}]}
          onPress={() => navigation.navigate('AddCardForm')}>
          <View style={[styles.task, {justifyContent: 'center'}]}>
            {Icon}
            <TitleText textStyle={styles.text} text={'Add New Card'} />
          </View>
        </AppTouchableOpacity>
      ) : (
        <Swipeable
          renderRightActions={rightSwipeActions}
          onSwipeableRightOpen={swipeFromRightOpen}
          onSwipeableLeftOpen={swipeFromLeftOpen}>
          <AppTouchableOpacity
            onPress={onPress}
            onLongPress={() => {
              Alert.alert(
                'Update Card',
                'Do you want to use this card as a default card',
                [
                  {
                    text: 'No',
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      await methods._update(
                        `/stripe-payment-method/all-cards/${cards.id}/change-default-card`,
                      );
                      dispatch(getCards());
                    },
                  },
                ],
              );
            }}
            style={[
              styles.taskContainer,
              {
                borderWidth: defaultCard ? 2 : activeCard ? 1 : 0,
                borderColor:
                  defaultCard || activeCard ? Colors.primary : 'none',
              },
            ]}>
            <View style={[styles.task]}>
              {Icon}
              <TitleText textStyle={styles.stars} text={'****'} />
              <TitleText textStyle={styles.taskTitle} text={cards?.last4} />
              <TitleText
                textStyle={styles.taskTitle}
                text={
                  ('0' + cards.expMonth).slice(-2) +
                  '/' +
                  String(cards.expYear).slice(-2)
                }
              />
            </View>
            {defaultCard && (
              <View
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  backgroundColor: 'green',
                }}
              />
            )}
          </AppTouchableOpacity>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    marginHorizontal: 20,

    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 20,
    fontSize: Text_Size.Text_1,
    color: Colors.text,
  },
  stars: {
    marginBottom: 0,
    marginTop: 5,
  },
  taskTitle: {
    alignSelf: 'center',
  },
});

export default ListItem;
