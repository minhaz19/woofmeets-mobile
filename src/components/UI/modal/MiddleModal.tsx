/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import IOSButton from '../IOSButton';

const MiddleModal = (props: {
  onBlur: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined;
  setIsModalVisible: (arg0: boolean) => void;
  isModalVisible: boolean | undefined;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  isButton?: boolean;
  notOutsidePress?: boolean;
  height?: string;
  handlePress: () => void;
}) => {
  const {colors} = useTheme();
  return (
    <TouchableWithoutFeedback
      onBlur={props.onBlur}
      onPress={() => props?.setIsModalVisible(false)}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props?.isModalVisible}>
        <TouchableWithoutFeedback
          disabled={props.notOutsidePress ? true : false}
          onPress={() =>
            props?.setIsModalVisible && props?.setIsModalVisible(false)
          }>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: colors.backgroundColor,
                  minHeight: props.height ? props.height : '20%',
                },
              ]}>
              {props.children}
              {/*Bottom Buttons */}
              {props.isButton && (
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <IOSButton
                    containerStyle={styles.containerStyle}
                    onSelect={() => {
                      props?.setIsModalVisible(false);
                      props.handlePress && props.handlePress();
                    }}
                    textAlignment={styles.textAlignment}
                    titleStyle={styles.textStyle}
                    title={'Cancel'}
                  />
                  <IOSButton
                    containerStyle={styles.containerStyle}
                    onSelect={() => {
                      props?.setIsModalVisible(false);
                      props.handlePress && props.handlePress();
                    }}
                    textAlignment={styles.textAlignment}
                    titleStyle={styles.textStyle}
                    title={'Okay'}
                  />
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  modalText: {
    color: 'black',
    fontSize: Text_Size.Text_1,
  },
  iconContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
  iconView: {height: 80, width: 80, marginBottom: 10},
  modalView: {
    width: SCREEN_WIDTH > 800 ? '60%' : '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    justifyContent: 'space-around',
    alignItems: 'center',
    // flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
  },
  containerStyle: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 50,
    width: '40%',
    marginTop: '1%',
    borderRadius: 4,
  },
  textAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: Text_Size.Text_8,
  },
});

export default MiddleModal;
