/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../activity/styles';
import TitleText from '../../../components/common/text/TitleText';
import ShortText from '../../../components/common/text/ShortText';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import SendMessage from './SendMessage';
import {apiMsg} from '../../../api/client';
import {formatDistance, subDays} from 'date-fns';
import storage from '../../../utils/helpers/auth/storage';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getProviderProposal} from '../../../store/slices/Appointment/Proposal/getProviderProposal';
// import {getAllPets} from '../../../store/slices/pet/allPets/allPetsAction';
// import {getWhoAmI} from '../../../store/slices/common/whoAmI/whoAmIAction';
import Colors from '../../../constants/Colors';
import changeTextLetter from '../../../components/common/changeTextLetter';
import {socket} from '../../../../App';

const Messages = (props: {roomId: any; opk: any}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const userInfo = useAppSelector((state: any) => state.whoAmI.user);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const [user, setUser] = useState();
  const getTokenDecoded = async () => {
    const decoded: any = await storage.getUser();
    setUser(decoded);
  };
  useEffect(() => {
    getTokenDecoded();
  }, []);
  const getPreviousMessages = async () => {
    if (props.roomId) {
      const slug = `/v1/messages/group/${props.roomId}`;
      // setIsLoadingMsg(true);
      const result: any = await apiMsg.get(slug);
      if (result.ok) {
        setMessages(result.data?.data?.reverse());
        // setIsLoadingMsg(false);
      }
      if (!result.ok) {
        // setIsLoadingMsg(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getPreviousMessages();
    await dispatch(getProviderProposal(props.opk));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    setRefreshing(true);
    getPreviousMessages();
    socket.on('message', (data: any) => {
      if (data?.group === props.roomId) {
        // @ts-ignore
        setMessages(prevMess => [...prevMess, data]);
      }
    });
    setRefreshing(false);
  }, [props.roomId]);

  const [paddingHeight, setPaddingHeight] = useState(0);
  const scrollViewRef = useRef<any>();
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setPaddingHeight(25);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setPaddingHeight(10);
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
        {messages?.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <TouchableOpacity onPress={() => onRefresh()}>
              <TitleText
                text={'Refresh Again'}
                textStyle={{paddingTop: 10, color: Colors.primaryDif}}
              />
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
                    ]}>
                    <TitleText text={userInfo?.firstName?.slice(0, 1)} />
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
                    ]}>
                    <TitleText
                      text={
                        proposedServiceInfo?.providerId ===
                        userInfo?.provider?.id
                          ? changeTextLetter(
                              proposedServiceInfo?.userName,
                            )?.slice(0, 1)
                          : changeTextLetter(
                              proposedServiceInfo?.providerName,
                            )?.slice(0, 1)
                      }
                    />
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
        // socket={socket}
        user={user}
        opk={props.opk}
      />
    </View>
  );
};

export default Messages;
// isLoadingMsg ? (
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               flex: 1,
//               paddingTop: 100,
//             }}>
//             <ActivityIndicator size="large" />
//           </View>
//         ) :
