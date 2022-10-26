import { View, ScrollView, Image, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../activity/styles';
import TitleText from '../../../components/common/text/TitleText';
import ShortText from '../../../components/common/text/ShortText';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../constants/theme/hooks/useTheme';
import io from 'socket.io-client';
import { msgUrl } from '../../../utils/helpers/httpRequest';
import { useAppSelector } from '../../../store/store';
import SendMessage from './SendMessage';
import { apiMsg } from '../../../api/client';
import { formatDistance, subDays } from 'date-fns';
import storage from '../../../utils/helpers/auth/storage';

const Messages = (props: { roomId: any; }) => {
    const {colors} = useTheme();
    const [socket, setSocket] = useState<any>(null);
    const [messages, setMessages] = useState([]);
    const [isLoadingMsg, setIsLoadingMsg] = useState<boolean>(false);
    const [user, setUser] = useState();
    const getToken = async() => {
      const decoded: any = await storage.getUser();
      setUser(decoded);
    }
    useEffect(() => {
      getToken()
    }, [])
    // console.log('msg-----', messages, user?.id)
    const getPreviousMessages = async () => {
      const slug = `/v1/messages/group/${props.roomId}`
      setIsLoadingMsg(true);
      const result = await apiMsg.get(slug);
      // console.log('result--------------', result.data);
      if(result.ok) {
        setMessages(result.data?.data?.reverse());
        setIsLoadingMsg(false);
      }
    }

    useEffect(() => {
      if (socket === null) {
        let tempSocket = io(
          `${msgUrl}`,
        );
        setSocket(tempSocket);
      } else {
        getPreviousMessages();
        socket.on('message', (data: any) => {
          if (data?.group === props.roomId) {
            setMessages((prevMess) => [...prevMess, data]);
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
    
    const {image} = {
        image: 'https://via.placeholder.com/40x40.png?',
    };
    const currentUser = {
        id: 1,
        name: 'Tanvir',
        image: 'https://via.placeholder.com/40x40.png?',
    };
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
    }>
    {isLoadingMsg ? (
      <View style={{justifyContent: 'center', alignItems:'center', flex: 1, paddingTop: 100}}>
        <ActivityIndicator />
      </View>
    ) : (
      messages.length === 0 ? (
        <TitleText
          textStyle={styles.emptyContainer}
          text={`The Conversation just got created, No texts yet...`}
        />
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
                <ShortText text={formatDistance(subDays(new Date(item?.createdAt), 0), new Date(), { addSuffix: true })} />
              </View>
              <View style={styles.userIconView}>
                <Image
                  source={{uri: currentUser.image}}
                  style={[
                    styles.imageStyle,
                    {borderColor: colors.borderColor},
                  ]}
                />
              </View>
            </View>
          ) : (
            // Receiver
            <View key={i} style={styles.receiverContainer}>
              <View style={styles.userIconViewReceiver}>
                <Image
                  source={{uri: image}}
                  style={[
                    styles.imageStyle,
                    {borderColor: colors.borderColor},
                  ]}
                />
              </View>
              <View
                style={[
                  styles.receiver,
                  {backgroundColor: colors.inputLightBg},
                ]}>
                {/* {item?.content && <HeaderText text={item?.content} />} */}
                <TitleText text={item.content} />
                {item?.details && (
                  <View>
                    <View style={styles.detailsImage}>
                      <Image
                        source={{uri: image}}
                        style={[
                          styles.imageStyle,
                          {borderColor: colors.borderColor},
                        ]}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Checkout')
                      }>
                      <TitleText
                        text="VIEW DETAILS"
                        textStyle={styles.textDetailsStyle}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {<ShortText text={formatDistance(subDays(new Date(item?.createdAt), 0), new Date(), { addSuffix: true })} />}
              </View>
            </View>
          ),
        )
      )
    )}
    <View style={{height: paddingHeight}} />
    </ScrollView>
    <SendMessage roomId={props.roomId} setMessages={setMessages} socket={socket} user={user} />
    </View>
  )
}

export default Messages