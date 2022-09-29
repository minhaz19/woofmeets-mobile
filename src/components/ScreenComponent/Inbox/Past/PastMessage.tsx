import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {data} from '../Pending/PendingMessage';
import Colors from '../../../../constants/Colors';
import ReusableCard from '../utils/Common/ReusableCard';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {PastSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import {setOpenFilter} from '../../../../store/slices/misc/openFilter';
import { useAppDispatch } from '../../../../store/store';

const PastMessage = () => {
  const dispatch = useAppDispatch();
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
                buttonStyles={Colors.green}
                handlePress={() => dispatch(setOpenFilter(true))}
              />
            );
          })
        ) : (
          <MessageNotSend
            svg={<PastSvg width={200} height={200} />}
            title={'No messages in Past inbox'}
            description={
              "You'll find messages here from bookings that have been completed"
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PastMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
});
