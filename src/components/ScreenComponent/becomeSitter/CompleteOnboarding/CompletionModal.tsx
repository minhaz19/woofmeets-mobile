import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
interface Props {
  isVisible: boolean;
}
const CompletionModal = ({isVisible}: Props) => {
  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.body}>
          <AnimatedLottieView
            loop={false}
            autoPlay
            source={require('../../../../assets/completionModal.json')}
            style={styles.animation}
          />
          <View>
            <TitleText
              textStyle={styles.title}
              text={'Congrats! Profile Submitted!'}
            />
            <TitleText
              textStyle={styles.short}
              text={`Redirecting To Profile...`}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompletionModal;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '80%',
    marginTop: 10,
  },
  body: {
    // marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // hight,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_2,
    color: Colors.green,
    textAlign: 'center',
  },
  short: {
    // width: '80%',
    // alignSelf: 'center',
    fontWeight: 'bold',
    // fontSize: Text_Size.Text_2,
    color: Colors.primaryDeep,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
