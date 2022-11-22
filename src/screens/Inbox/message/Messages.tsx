import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../activity/styles';
import TitleText from '../../../components/common/text/TitleText';
import ShortText from '../../../components/common/text/ShortText';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import io from 'socket.io-client';
import {msgUrl} from '../../../utils/helpers/httpRequest';
import SendMessage from './SendMessage';
import {apiMsg} from '../../../api/client';
import {formatDistance, subDays} from 'date-fns';
import storage from '../../../utils/helpers/auth/storage';
import {useAppDispatch} from '../../../store/store';
import {getProviderProposal} from '../../../store/slices/Appointment/Proposal/getProviderProposal';
import {getAllPets} from '../../../store/slices/pet/allPets/allPetsAction';
import {getWhoAmI} from '../../../store/slices/common/whoAmI/whoAmIAction';
import Colors from '../../../constants/Colors';

const Messages = (props: {roomId: any; opk: any}) => {
  const {colors} = useTheme();
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([]);
  const [isLoadingMsg, setIsLoadingMsg] = useState<boolean>(false);
  const [user, setUser] = useState();
  const getTokenDecoded = async () => {
    const decoded: any = await storage.getUser();
    setUser(decoded);
  };
  useEffect(() => {
    getTokenDecoded();
  }, []);
  console.log(messages)
  const getPreviousMessages = async () => {
    console.log('outside')
    if (socket === null) {
      console.log('in1');
      let tempSocket = io(`${msgUrl}`);
      tempSocket.emit('user', user?.id);
      setSocket(tempSocket);
      if (props.roomId) {
        console.log('in2');
        const slug = `/v1/messages/group/${props.roomId}`;
        setIsLoadingMsg(true);
        const result = await apiMsg.get(slug);
        if (result.ok) {
          setMessages(result.data?.data?.reverse());
          setIsLoadingMsg(false);
        }
        if (!result.ok) {
          setIsLoadingMsg(false);
        }
      }
    } else {
      console.log('in3', props.roomId, user?.id);
      if (props.roomId) {
        console.log('in4');
        socket.emit('user', user?.id);
        const slug = `/v1/messages/group/${props.roomId}`;
        setIsLoadingMsg(true);
        const result = await apiMsg.get(slug);
        if (result.ok) {
          setMessages(result.data?.data?.reverse());
          setIsLoadingMsg(false);
        }
        if (!result.ok) {
          setIsLoadingMsg(false);
        }
      }
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    console.log('pressing1');
    getPreviousMessages();
    dispatch(getProviderProposal(props.opk));
    dispatch(getAllPets());
    dispatch(getWhoAmI());
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (socket === null) {
      let tempSocket = io(`${msgUrl}`);
      tempSocket.emit('user', user?.id);
      setSocket(tempSocket);
    } else {
      getPreviousMessages();
      socket.on('message', (data: any) => {
        if (data?.group === props.roomId) {
          setMessages(prevMess => [...prevMess, data]);
        }
      });
    }
    // return () => {};
  }, [socket, props.roomId]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit('user', user?.id);
    }
  }, [user, socket]);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const scrollViewRef = useRef<any>();
  const navigation = useNavigation();

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

  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollTop}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoadingMsg ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              paddingTop: 100,
            }}>
            <ActivityIndicator />
          </View>
        ) : messages.length === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 20,}}>
            {/* <TitleText
              textStyle={styles.emptyContainer}
              text={`The Conversation just got created, No texts yet...`}
            /> */}
            <TouchableOpacity onPress={() => onRefresh()}>
              <TitleText text={'Refresh Again'} textStyle={{paddingTop: 10, color: Colors.blue}} />
            </TouchableOpacity>
          </View>
        ) : (
          messages?.map((item: any, i) =>
            item.sender === user?.id ? (
              // Sender
              <View key={i} style={styles.senderContainer}>
                <View
                  style={[
                    styles.sender,
                    {backgroundColor: colors.inputLightBg},
                  ]}>
                  <TitleText text={item.content} />
                  {item.attachmentType === 'image' && (
                    <Image
                      source={{uri: item.attachment}}
                      style={styles.image}
                    />
                  )}
                  <ShortText
                    text={formatDistance(
                      subDays(new Date(item?.createdAt), 0),
                      new Date(),
                      {addSuffix: true},
                    )}
                  />
                </View>
                <View style={styles.userIconView}>
                  <View
                    style={[
                      styles.imageStyle,
                      {borderColor: colors.borderColor},
                    ]}
                  >
                    <TitleText text={'S'} />
                  </View>
                </View>
              </View>
            ) : (
              // Receiver
              <View key={i} style={styles.receiverContainer}>
                <View style={styles.userIconViewReceiver}>
                  <View
                    style={[
                      styles.imageStyle,
                      {borderColor: colors.borderColor},
                    ]}
                  >
                    <TitleText text={'R'} />
                  </View>
                </View>
                <View
                  style={[
                    styles.receiver,
                    {backgroundColor: colors.inputLightBg},
                  ]}>
                  {/* {item?.content && <HeaderText text={item?.content} />} */}
                  <TitleText text={item.content} />
                  {item.attachmentType === 'image' && (
                    <Image
                      source={{uri: item.attachment}}
                      style={styles.image}
                    />
                  )}
                  {item?.details && (
                    <View>
                      <View style={styles.detailsImage}>
                        <Image
                          source={{uri: item.attachment}}
                          style={[
                            styles.imageStyle,
                            {borderColor: colors.borderColor},
                          ]}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Checkout')}>
                        <TitleText
                          text="VIEW DETAILS"
                          textStyle={styles.textDetailsStyle}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {
                    <ShortText
                      text={formatDistance(
                        subDays(new Date(item?.createdAt), 0),
                        new Date(),
                        {addSuffix: true},
                      )}
                    />
                  }
                </View>
              </View>
            ),
          )
        )}
        <View style={{height: paddingHeight}} />
      </ScrollView>
      <SendMessage
        roomId={props.roomId}
        setMessages={setMessages}
        socket={socket}
        user={user}
        opk={props.opk}
      />
    </View>
  );
};

export default Messages;
