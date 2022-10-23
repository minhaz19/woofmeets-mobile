import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MiddleModal from '../../../UI/modal/MiddleModal';
import ServiceSlot from './ServiceSlot';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
interface Props {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  onPress: (arg: any) => void;
  startingDate: string;
  endingDate: string;
}
const ServiceSlotModal = ({isVisible, setIsVisible, onPress}: Props) => {
  const [selectedService, setSelectedService] = useState([]);
  console.log('selected servcie', selectedService);
  return (
    <View>
      <MiddleModal
        isModalVisible={isVisible}
        setIsModalVisible={setIsVisible}
        onBlur={() => null}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setIsVisible(false)}>
            <TitleText text="10-12-2022" textStyle={styles.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={onPress}>
            <TitleText text="10-01-2023" textStyle={styles.text} />
          </TouchableOpacity>
        </View>
        <ServiceSlot setSelectedService={setSelectedService} />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setIsVisible(false)}>
            <TitleText text="Cancel" textStyle={styles.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => onPress([...selectedService])}>
            <TitleText text="Save" textStyle={styles.text} />
          </TouchableOpacity>
        </View>
      </MiddleModal>
    </View>
  );
};

export default ServiceSlotModal;

const styles = StyleSheet.create({
  btnContainer: {flexDirection: 'row'},
  cancelBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 10,
    paddingVertical: 15,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 10,
    paddingVertical: 15,
  },
  text: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
