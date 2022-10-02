/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Visa} from '../../../../../assets/svgs/Cards';

import {Delete} from '../../../../../assets/svgs/SVG_LOGOS';
interface Props {
  cards?: any;
  newCard?: boolean;
  Icon: any;
}
const ListItem = ({cards, newCard = false, Icon}: Props) => {
  const navigation = useNavigation();
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
        <TouchableOpacity style={{margin: 10}}>
          <Delete fill="black" width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{margin: 10}}>
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
        <TouchableOpacity
          style={[styles.taskContainer]}
          onPress={() => navigation.navigate('AddCardForm')}>
          <View style={[styles.task, {justifyContent: 'flex-start'}]}>
            {Icon}
            <Text style={styles.text}>Add new card</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Swipeable
          renderRightActions={rightSwipeActions}
          onSwipeableRightOpen={swipeFromRightOpen}
          onSwipeableLeftOpen={swipeFromLeftOpen}>
          <TouchableOpacity style={[styles.taskContainer]}>
            <View style={[styles.task]}>
              {Icon}
              <Text style={styles.stars}>****</Text>
              <Text style={styles.taskTitle}>{cards?.last4}</Text>
              <Text style={styles.taskTitle}>12/29</Text>
            </View>
          </TouchableOpacity>
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
  },
  stars: {
    marginBottom: 0,
    marginTop: 0,
  },
  taskTitle: {
    alignSelf: 'center',
  },
});

export default ListItem;
