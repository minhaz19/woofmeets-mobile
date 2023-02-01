import {Platform, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  headerTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
  },
  container: {
    height: '100%',
  },
  scrollTop: {
    marginBottom: '2%',
  },
  emptyContainer: {
    color: 'black',
    textAlign: 'center',
    marginTop: '100%',
  },
  senderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginLeft: 15,
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
  },
  textDetailsStyle: {
    color: Colors.primary,
    fontWeight: '500',
  },
  receiver: {
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    margin: 15,
    marginLeft: 5,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 10,
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    marginRight: 5,
    maxWidth: '80%',
    position: 'relative',
    color: 'white',
  },
  senderText: {
    color: 'white',
  },
  detailsImage: {
    paddingVertical: 15,
  },
  userIconView: {
    alignSelf: 'flex-end',
    paddingBottom: 5,
    marginRight: 10,
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 18 : SCREEN_WIDTH <= 600 ? 20 : 22,
    width: SCREEN_WIDTH <= 380 ? 18 : SCREEN_WIDTH <= 600 ? 20 : 22,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconViewReceiver: {
    alignSelf: 'flex-end',
    paddingBottom: 5,
    paddingLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'android' ? 35 : 5,
  },
  cameraIconContainer: {
    paddingHorizontal: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
    fontFamily: 'Muli',
    fontSize: Text_Size.Text_11,
  },
  notActive: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 2,
  },
  active: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 5,
  },
  sendIcon: {marginRight: 20},
  messageContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default styles;
