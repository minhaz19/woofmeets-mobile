import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';
import PastMessage from './PastMessage';
import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
import BottomCard from './BottomCard';
import Details from './Details';

const Past = () => {
  const [isPayment, setIsPayment] = useState(false);
  const [isPet, setIsPet] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    if (!modalVisible) {
      setIsPayment(false);
    }
  }, [modalVisible]);
  return (
    <View>
      <PastMessage setModalVisible={setModalVisible} />
      <BottomHalfModal
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}>
        {isPayment === false ? (
          <BottomCard
            isPayment={isPayment}
            setIsPayment={setIsPayment}
            isPet={isPet}
            setIsPet={setIsPet}
            setModalVisible={setModalVisible}
          />
        ) : (
          <Details
            setIsPayment={setIsPayment}
            setModalVisible={setModalVisible}
          />
        )}
      </BottomHalfModal>
    </View>
  );
};

export default Past;
