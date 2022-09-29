import {View} from 'react-native';
import React, {useState} from 'react';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';
import PastMessage from './PastMessage';
import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
import BottomCard from './BottomCard';
import Details from './Details';
import { useAppSelector } from '../../../../store/store';

const Past = () => {
  const [isPayment, setIsPayment] = useState(false);
  const [isPet, setIsPet] = useState(false);
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  return (
    <View>
      <FilterByDateAndActivity
        handleActivity={() => {}}
        handleDate={() => {}}
      />
      <PastMessage />
      <BottomHalfModal isModalVisible={filter}>
        {isPayment === false ? (
          <BottomCard
            isPayment={isPayment}
            setIsPayment={setIsPayment}
            isPet={isPet}
            setIsPet={setIsPet}
          />
        ) : (
          <Details setIsPayment={setIsPayment} />
        )}
      </BottomHalfModal>
    </View>
  );
};

export default Past;
