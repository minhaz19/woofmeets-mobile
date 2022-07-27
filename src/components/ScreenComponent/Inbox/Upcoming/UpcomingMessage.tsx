import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ReusableCard from '../utils/ReusableCard/ReusableCard';
import {data} from '../Pending/PendingMessage';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/ReusableCard/MessageNotSend';
import Colors from '../../../../constants/Colors';

const UpcomingMessage = () => {
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
                buttonStyles={Colors.primary}
              />
            );
          })
        ) : (
          <MessageNotSend
            svg={<UpcomingSvg width={200} height={200} />}
            title={'No messages in Upcoming inbox'}
            description={
              " You'll find messages here when you and sitter have confirmed a booking together"
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

export default UpcomingMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
});
