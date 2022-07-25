import {Text} from 'react-native';
import React, {useState} from 'react';
import MiddleModal from '../../../components/UI/modal/MiddleModal';

const FilterProvider = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  return (
    <MiddleModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      onBlur={() => console.log()}>
      <Text>FilterProvider</Text>
    </MiddleModal>
  );
};

export default FilterProvider;

// const styles = StyleSheet.create({});
