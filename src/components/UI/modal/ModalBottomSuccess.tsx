import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import Ent from 'react-native-vector-icons/Entypo';
import {Success} from '../../../assets/svgs/SVG_LOGOS';
import {designs} from '../../../constants/theme/common/modalEndStyles';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import {descriptionDarkText} from '../../../constants/FontDetails';
import ButtonCom from '../ButtonCom';

const ModalBottomView = (props: {
  modalVisible: boolean | undefined;
  onSelect: ((event: GestureResponderEvent) => void) | undefined;
  title: string | undefined;
  notButton: boolean;
  isOffer: boolean | undefined;
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View style={designs.centeredView}>
          <View style={designs.modalView}>
            <TouchableOpacity
              style={designs.modalCancelCross}
              onPress={props.onSelect}>
              <Ent name="cross" color="white" size={24} />
            </TouchableOpacity>
            <View style={designs.modalContainer}>
              <View style={designs.successContainer}>
                <Success />
              </View>
              <Text style={designs.textSuccess}>
                {props.title ? props.title : 'Success'}
              </Text>
              {!props.notButton && (
                <ButtonCom
                  title="Continue"
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={styles.containerStyle}
                  titleStyle={styles.titleStyle}
                  onSelect={props.onSelect}
                  progressStyle={undefined}
                  icon={undefined}
                  isLeftIcon={false}
                />
              )}
              {props.isOffer && (
                <View style={styles.offerContainer}>
                  <Text style={styles.offerText}>{props.isOffer}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
  },
  offerContainer: {
    justifyContent: 'center',
    paddingTop: 10,
  },
  offerText: {
    color: Colors.primary,
    fontSize: descriptionDarkText.fontSize,
    textAlign: 'center',
  },
  textAlignment: {
    justifyContent: 'center',
  },
  containerStyle: {
    height: 40,
    width: '90%',
    backgroundColor: Colors.secondary,
    borderRadius: 4,
  },
});

export default ModalBottomView;
