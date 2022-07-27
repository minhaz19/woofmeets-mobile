import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {data} from '../Pending/PendingMessage';
import ReusableCard from '../utils/ReusableCard/ReusableCard';
import {AddPet} from '../../../../assets/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import MessageNotSend from '../utils/ReusableCard/MessageNotSend';
import Colors from '../../../../constants/Colors';

const ArchivedMessage = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
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
                buttonStyles={Colors.success}
              />
            );
          })
        ) : (
          <MessageNotSend
            svg={<AddPet width={200} height={200} />}
            title={'No messages in Archived inbox'}
            description={
              " You'll find messages here from bookings that have been completed"
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ArchivedMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
});
