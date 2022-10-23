import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import ServiceDaySlot from './ServiceDaySlot';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {FormProvider, useForm} from 'react-hook-form';
import {useAvailabilityDayInit} from './utils/useAVDinitState';
// import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
// import BottomHalfModalLite from '../../../UI/modal/BottomHalfModalLite';
interface Props {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  onPress: (data: any) => void;
}
const ServiceSlotModal = ({isVisible, setIsVisible, onPress}: Props) => {
  const {colors} = useTheme();
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: useAvailabilityDayInit(),
  });
  const {handleSubmit} = methods;
  console.log('useAvailabilityDayInit', useAvailabilityDayInit());
  return (
    <View>
      <Modal animated transparent visible={isVisible} animationType="fade">
        <Pressable
          style={styles.bgContainer}
          onPress={() => setIsVisible(!isVisible)}
        />

        <FormProvider {...methods}>
          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: colors.backgroundColor,
              },
            ]}>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsVisible(false)}>
                <TitleText text="Cancel" textStyle={styles.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSubmit(onPress)}>
                <TitleText text="Save" textStyle={styles.text} />
              </TouchableOpacity>
            </View>
            <ServiceDaySlot />
          </View>
        </FormProvider>
      </Modal>
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
  bgContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    // height: '60%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderTopWidth: 2,
    borderTopColor: Colors.background,
  },
});
