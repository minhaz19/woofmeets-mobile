import {Platform, StyleSheet} from 'react-native';
import Colors from '../../Colors';
import {descriptionDarkText, titleDarkText} from '../../FontDetails';

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
  modalCancel: {
    paddingRight: '5%',
    top: -18,
    position: 'absolute',
    right: 10,
  },
  modalView: {
    height: '40%',
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
    fontSize: titleDarkText.fontSize,
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
    fontSize: descriptionDarkText.fontSize,
    color: 'black',
  },
});

export default designs;
