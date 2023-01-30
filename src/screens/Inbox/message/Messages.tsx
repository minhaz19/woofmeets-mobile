/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../activity/styles';
import TitleText from '../../../components/common/text/TitleText';
import ShortText from '../../../components/common/text/ShortText';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import SendMessage from './SendMessage';
import changeTextLetter from '../../../components/common/changeTextLetter';
import {formatDistance, subDays} from 'date-fns';
import {useAppSelector} from '../../../store/store';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import Colors from '../../../constants/Colors';

const Messages = (props: {
  roomId: any;
  opk: any;
  messages: any;
  setMessages: any;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}) => {
  const {messages, loading, onRefresh, refreshing} = props;
  const {colors} = useTheme();
  const user = useAppSelector((state: any) => state.whoAmI.user);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  const [paddingHeight, setPaddingHeight] = useState(0);
  const scrollViewRef = useRef<any>();
  const navigation = useNavigation<any>();

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

  function checkLink(str: any) {
    let regex = new RegExp('roomType=(AUDIO|VIDEO)');
    let match = str.match(regex);
    let splittingMessage =
      match?.length > 0 ? (
        match[1] === 'AUDIO' ? (
          <View style={styles.messageContainer}>
            <TitleText text={`${str.split(' ')[0]} start a audio call.`} />
            <AppTouchableOpacity>
              <TitleText
                textStyle={{
                  textDecorationLine: 'underline',
                  color: Colors.primaryDif,
                }}
                text={' Join here'}
              />
            </AppTouchableOpacity>
          </View>
        ) : (
          <View style={styles.messageContainer}>
            <TitleText text={`${str.split(' ')[0]} start a video call.`} />
            <AppTouchableOpacity>
              <TitleText
                textStyle={{
                  textDecorationLine: 'underline',
                  color: Colors.primaryDif,
                }}
                text={' Join here'}
              />
            </AppTouchableOpacity>
          </View>
        )
      ) : (
        <TitleText text={str} />
      );
    return splittingMessage;
  }

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" />
        </View>
      ) : props.roomId === null ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 20,
          }}>
          <TitleText
            text={
              'Sorry! we are unable to retribe message data. Appointment must be broken.'
            }
            textStyle={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}
          />
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollTop}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {messages?.map((item: any, i: number) =>
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
                    <TitleText text={user?.firstName?.slice(0, 1)} />
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
                        proposedServiceInfo?.providerId === user?.provider?.id
                          ? changeTextLetter(
                              proposedServiceInfo?.userName,
                            )?.slice(0, 1)!
                          : changeTextLetter(
                              proposedServiceInfo?.providerName,
                            )?.slice(0, 1)!
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
                  {/* {<TitleText text={checkLink(item.content)} />} */}
                  {checkLink(item.content)}
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
          )}
          <View style={{height: paddingHeight}} />
        </ScrollView>
      )}

      <SendMessage
        roomId={props.roomId}
        setMessages={props.setMessages}
        // socket={socket}
        user={user}
        opk={props.opk}
      />
    </View>
  );
};

export default Messages;
