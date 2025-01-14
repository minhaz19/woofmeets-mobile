/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import BottomSpacing from '../../../../components/UI/BottomSpacing';
import RescheduleList from '../../../../components/ScreenComponent/Provider/Reschedule/RescheduleList';
import {rescheduleData} from '../utils/rescheduleData';
import BottomHalfModal from '../../../../components/UI/modal/BottomHalfModal';
import ServiceSelection from '../../../../components/ScreenComponent/Provider/Reschedule/ServiceSelection';
import EditSchedule from '../../../../components/ScreenComponent/Provider/Reschedule/EditSchedule';
import ScreenRapperGrey from '../../../../components/common/ScreenRapperGrey';

const RescheduleMain = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewDetails, setViewDetails] = useState<boolean>(true);

  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={rescheduleData}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => {
            return (
              <RescheduleList
                image={item.image}
                name={item.name}
                owner={item.owner}
                recentBooking={item.recentBooking}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
              />
            );
          }}
          ListFooterComponent={<BottomSpacing />}
        />
      </View>
      <BottomHalfModal
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}>
        {viewDetails ? (
          <ServiceSelection
            setModalVisible={setModalVisible}
            setViewDetails={setViewDetails}
          />
        ) : (
          <EditSchedule setViewDetails={setViewDetails} />
        )}
        <View style={{height: 30}} />
      </BottomHalfModal>
    </ScreenRapperGrey>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RescheduleMain;
