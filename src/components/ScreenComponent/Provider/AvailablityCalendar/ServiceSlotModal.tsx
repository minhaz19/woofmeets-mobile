import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MiddleModal from '../../../UI/modal/MiddleModal';
import ServiceSlot from './ServiceSlot';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
interface Props {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  handleUnavailable: (arg: any) => void;
  handleAvailable: (arg: any) => void;
  startingDate: string;
  endingDate: string;
}
const ServiceSlotModal = ({
  isVisible,
  setIsVisible,
  handleUnavailable,
  handleAvailable,
  startingDate,
  endingDate,
}: Props) => {
  const [selectedService, setSelectedService] = useState([]);
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
            <TitleText text={startingDate} textStyle={styles.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn}>
            <TitleText
              text={endingDate !== undefined ? endingDate : 'Not Selected'}
              textStyle={styles.text}
            />
          </TouchableOpacity>
        </View>
        <ServiceSlot setSelectedService={setSelectedService} />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => handleAvailable([...selectedService])}>
            <TitleText text="Mark Available" textStyle={styles.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => handleUnavailable([...selectedService])}>
            <TitleText text="Mark Unavailable" textStyle={styles.text} />
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
    backgroundColor: Colors.dark.background,
    flex: 1,
    padding: 10,
    paddingVertical: 15,
  },
  saveBtn: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    padding: 10,
    paddingVertical: 15,
  },
  text: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
