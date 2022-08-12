import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView, StyleSheet, Image, View, Keyboard} from 'react-native';
import {TextInput} from 'react-native';
import Colors from '../../../constants/Colors';
import {conversation} from './conversation';
import ActivityHeader from '../../../components/ScreenComponent/activity/ActivityHeader';
import ShortText from '../../../components/common/text/ShortText';
import HeaderText from '../../../components/common/text/HeaderText';
import TitleText from '../../../components/common/text/TitleText';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {CameraIcon, SendIcon} from '../../../assets/Inbox_SVG';
import BottomHalfModal from '../../../components/UI/modal/BottomHalfModal';
import Details from '../../../components/ScreenComponent/Inbox/Past/Details';

const ActivityScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {image} = {
    image: 'https://picsum.photos/200/200',
  };
  const currentUser = {
    id: 1,
    name: 'Tanvir',
    image: 'https://picsum.photos/200',
  };
  const [message, setMessage] = useState('');
  const [paddingHeight, setPaddingHeight] = useState(0);
  const scrollViewRef = useRef();

  const sendMsg = async () => {};

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setPaddingHeight(5);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setPaddingHeight(0);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const {colors} = useTheme();
  const [isDetailsModal, setIsDetailsModal] = useState(false);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <>
          <ActivityHeader setIsDetailsModal={setIsDetailsModal} />
          <BottomHalfModal
            isModalVisible={isDetailsModal}
            setIsModalVisible={setIsDetailsModal}>
            <Details setIsDetailsModal={setIsDetailsModal} />
          </BottomHalfModal>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollTop}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            {conversation[0].messages === undefined ? (
              <TitleText
                textStyle={styles.emptyContainer}
                text={`' '
                The Conversation just got created, No texts yet...' '`}
              />
            ) : (
              conversation[0].messages?.map((item, i) =>
                item.type === 'other' ? (
                  // Sender
                  <View key={i} style={styles.senderContainer}>
                    <View
                      style={[
                        styles.sender,
                        {backgroundColor: colors.inputLightBg},
                      ]}>
                      <TitleText text={item.msg} />
                      <ShortText text="Jun 14, 9:27" />
                    </View>
                    <View style={styles.userIconView}>
                      <Image
                        source={{uri: currentUser.image}}
                        style={styles.imageStyle}
                      />
                    </View>
                  </View>
                ) : (
                  // Receiver
                  <View key={i} style={styles.receiverContainer}>
                    <View style={styles.userIconViewReceiver}>
                      <Image source={{uri: image}} style={styles.imageStyle} />
                    </View>
                    <View
                      style={[
                        styles.receiver,
                        {backgroundColor: colors.inputLightBg},
                      ]}>
                      {item.title && <HeaderText text={item.title} />}
                      <TitleText text={item.msg} />
                      {item.details && (
                        <View>
                          <View style={styles.detailsImage}>
                            <Image
                              source={{uri: image}}
                              style={styles.imageStyle}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('Checkout')
                            }>
                            <TitleText
                              text="VIEW DETAILS"
                              textStyle={styles.textDetailsStyle}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                      {!item.details && <ShortText text="Jun 14, 9:27" />}
                    </View>
                  </View>
                ),
              )
            )}
            <View style={{height: paddingHeight}} />
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cameraIconContainer}>
              <CameraIcon />
            </TouchableOpacity>
            <TextInput
              placeholder="Type Message..."
              style={styles.textInput}
              numberOfLines={10}
              onChangeText={text => setMessage(text)}
              value={message}
            />
            <TouchableOpacity
              onPress={sendMsg}
              activeOpacity={0.5}
              style={{marginRight: 20}}>
              <SendIcon height={20} width={20} fill={Colors.primary} />
            </TouchableOpacity>
          </View>
          <BottomSpacing />
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 15,
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
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
    marginLeft: 10,
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
    marginRight: 10,
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
    height: SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 36 : 40,
    width: SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 36 : 40,
    borderRadius: 20,
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
});

export default ActivityScreen;