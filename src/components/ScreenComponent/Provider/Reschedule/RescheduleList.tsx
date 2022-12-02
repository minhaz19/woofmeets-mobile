import {StyleSheet, View, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import ImageContainer from './ImageContainer';
import Card from '../../../UI/Card';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import {useAppDispatch} from '../../../../store/store';
import {setSelectedItem} from '../../../../store/slices/Provider/reschedule/rescheduleSlice';

interface Props {
  image: string;
  name: string;
  owner: string;
  recentBooking: string;
  setModalVisible: (arg1: boolean) => void;
  modalVisible: boolean;
}

const RescheduleList = ({
  image,
  owner,
  name,
  recentBooking,
  setModalVisible,
}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const dispatch = useAppDispatch();
  return (
    <>
      <Card
        style={{
          ...styles.container,
          backgroundColor: colors.backgroundColor,
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            dispatch(setSelectedItem(owner));
          }}
          style={styles.itemContainer}>
          <ImageContainer image={image} />
          <View style={styles.textContainer}>
            <HeaderText text={name} textStyle={styles.headerText} />
            <DescriptionText text={owner} textStyle={styles.descriptionText} />
            <DescriptionText
              text={`Recent Booking: ${recentBooking}`}
              textStyle={styles.recentBookingText}
            />
          </View>
        </TouchableOpacity>
      </Card>
    </>
  );
};

export default RescheduleList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '3%',
    marginVertical: 6,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    elevation: Platform.OS === 'android' ? 2 : 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingLeft: 10,
  },
  headerText: {
    paddingBottom: 5,
  },
  descriptionText: {
    paddingBottom: 5,
    fontWeight: '500',
  },
  recentBookingText: {
    color: Colors.gray,
  },
});
