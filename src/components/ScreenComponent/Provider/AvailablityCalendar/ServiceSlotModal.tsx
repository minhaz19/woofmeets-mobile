import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MiddleModal from '../../../UI/modal/MiddleModal';
import ServiceSlot from './ServiceSlot';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
interface Props {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  onPress: () => void;
}
const ServiceSlotModal = ({isVisible, setIsVisible, onPress}: Props) => {
  return (
    <View>
      <MiddleModal
        isModalVisible={isVisible}
        setIsModalVisible={setIsVisible}
        onBlur={() => console.log('')}>
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
        <ServiceSlot />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setIsVisible(false)}>
            <TitleText text="Cancel" textStyle={styles.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={onPress}>
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
  cancelBtn: {backgroundColor: Colors.primary, flex: 1, padding: 10},
  saveBtn: {backgroundColor: Colors.primary, flex: 1, padding: 10},
  text: {color: 'white', textAlign: 'center'},
});
