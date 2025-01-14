import {Platform, StyleSheet} from 'react-native';
import Colors from '../../Colors';
import Text_Size from '../../textScaling';
import {SCREEN_WIDTH} from '../../WindowSize';
import {textStyle} from './textStyle';
// import {SCREEN_WIDTH} from '../../WindowSize';

export const designs = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    height: '100%',
    paddingBottom: 10,
  },
  centeredView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 32 : 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredViewBg: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 32 : 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  centeredViewBgLite: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 32 : 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  modalCancel: {
    paddingRight: '5%',
    top: -18,
    position: 'absolute',
    right: 10,
  },
  modalView: {
    maxHeight: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    paddingTop: 20,
  },
  modalViewRounded: {
    minHeight: '40%',
    maxHeight: '90%',
    width: '100%',
    shadowColor: 'black',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
    paddingTop: 20,
  },
  modalViewRoundedless: {
    // minHeight: '40%',
    // maxHeight: '100%',
    width: '100%',
    shadowColor: 'black',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
    paddingTop: 20,
  },
  fullHeightModalView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 9,
  },
  modalCancelCross: {
    width: 32,
    height: 32,
    right: 15,
    top: -15,
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalBack: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 20,
    color: 'black',
  },
  textSuccess: {
    fontWeight: '500',
    fontSize: Text_Size.Text_3,
    maxWidth: '70%',
    marginLeft: '15%',
    textAlign: 'center',
    color: Colors.primary,
    paddingBottom: 20,
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  backButtonModal: {
    // paddingBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: Platform.OS === 'ios' ? 10 : 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    width: '80%',
    fontWeight: '700',
    fontSize: Text_Size.Text_3,
    color: 'black',
  },
});

export default designs;
