import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import ServiceDaySlot from './ServiceDaySlot';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useForm} from 'react-hook-form';
import {availabilityDayInit} from './utils/availabilityinitState';
import {useAppSelector} from '../../../../store/store';
interface Props {
  handleVisibility: any;
  onPress: (data: any) => void;
}
const ServiceSlotModal = ({handleVisibility, onPress}: Props) => {
  const {serviceDays} = useAppSelector(state => state.serviceDays);
  const {isSettingVisible} = useAppSelector(state => state.filter);
  const [initalState, setInitalState] = useState({});
  const {colors} = useTheme();

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: initalState,
  });
  const {handleSubmit, setValue, reset} = methods;
  useEffect(() => {
    const init = availabilityDayInit(serviceDays);
    setInitalState(init);
  }, [serviceDays]);
  useEffect(() => {
    if (initalState) {
      reset(availabilityDayInit(serviceDays));
    }
  }, [initalState, reset, serviceDays]);
  return (
    <View>
      <Modal
        animated
        transparent
        visible={isSettingVisible}
        animationType="fade">
        <Pressable style={styles.bgContainer} onPress={handleVisibility} />

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
              onPress={handleVisibility}>
              <TitleText text="Cancel" textStyle={styles.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSubmit(onPress)}>
              <TitleText text="Save" textStyle={styles.text} />
            </TouchableOpacity>
          </View>
          <ServiceDaySlot setValue={setValue} />
        </View>
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
    // borderTopWidth: 2,
    // borderTopColor: Colors.background,
  },
});
