import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import ReusableCard from '../utils/Common/ReusableCard';
import Colors from '../../../../constants/Colors';
import {PendingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';

export const data = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Bobby',
    boardingTime: 'From Jun 14 to Jun 16',
    description: 'Bobby is a 2 year old dog who is looking for a home.',
    status: 'Pending',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Bobby',
    boardingTime: 'From Jun 14 to Jun 16',
    description: 'Bobby is a 2 year old dog who is looking for a home.',
    status: 'Pending',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Bobby',
    boardingTime: 'From Jun 14 to Jun 16',
    description: 'Bobby is a 2 year old dog who is looking for a home.',
    status: 'Pending',
  },
  // {
  //   id: 4,
  //   image: require('../../../../assets/image/pet/mypet.png'),
  //   name: 'Bobby',
  //   boardingTime: 'Boarding on Jun 14 - Jun 16',
  //   description: 'Bobby is a 2 year old dog who is looking for a home.',
  //   status: 'Pending',
  // },
  // {
  //   id: 5,
  //   image: require('../../../../assets/image/pet/mypet.png'),
  //   name: 'Bobby',
  //   boardingTime: 'Boarding on Jun 14 - Jun 16',
  //   description: 'Bobby is a 2 year old dog who is looking for a home.',
  //   status: 'Pending',
  // },
];

const PendingMessage = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FilterByDateAndActivity
          handleActivity={() => {}}
          handleDate={() => {}}
        />
        {data.length > 0 ? (
          data?.map((item, index) => {
            return (
              <ReusableCard
                key={index}
                item={{
                  name: item.name,
                  image: item.image,
                  description: item.description,
                  boardingTime: item.boardingTime,
                  status: item.status,
                }}
                buttonStyles={Colors.yellow}
              />
            );
          })
        ) : (
          <MessageNotSend
            svg={<PendingSvg width={200} height={200} />}
            title={'No messages in Pending inbox'}
            description={
              'You will find messages here when you and sitter have confirmed a booking together'
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PendingMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
});
