/* eslint-disable react-native/no-inline-styles */
import {FlatList, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {PreviewModal} from './Preview';
import {usePeerTrackNodes} from './utils/functions';
import Peer from './Peer';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../constants/Colors';
import BigText from '../../common/text/BigText';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';
import {HMSLocalPeer} from '@100mslive/react-native-hms';
import AppActivityIndicator from '../../common/Loaders/AppActivityIndicator';
import Text_Size from '../../../constants/textScaling';

interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: RouteProp<
    {
      params: {
        token: string;
        roomType: string;
        userName: string;
        userId: any;
        appointmentOpk: string;
        image: string;
      };
    },
    'params'
  >;
}
const Room = ({route, navigation}: Props) => {
  const [localPeer, setLocalPeer] = useState<HMSLocalPeer>();
  const [isAudioMute, setIsAudioMute] = useState<boolean | undefined>(
    localPeer?.audioTrack?.isMute(),
  );

  const [isVideoMute, setIsVideoMute] = useState<boolean | undefined>(
    localPeer?.videoTrack?.isMute(),
  );

  const {
    peerTrackNodes,
    loading,
    leaveRoom,
    hmsInstanceRef,
    leaveLoading,
    modalType,
    joinButtonLoading,
    setJoinButtonLoading,
    hmsRoom,
    previewTracks,
    onJoinRoom,
  } = usePeerTrackNodes(route, navigation);

  const HmsView = hmsInstanceRef.current?.HmsView;
  const _keyExtractor = (item: {id: any}) => item.id;
  const hmsInstance = hmsInstanceRef.current;

  const audioAllowed = localPeer?.audioTrack?.type;
  const videoAllowed = localPeer?.videoTrack?.type;

  // for leaving the room
  const handleRoomEnd = async () => {
    await leaveRoom();
  };
  useEffect(() => {
    setIsVideoMute(localPeer?.videoTrack?.isMute());
    setIsAudioMute(localPeer?.audioTrack?.isMute());
  }, [localPeer]);

  useEffect(() => {
    const updateLocalPeer = async () => {
      await hmsInstance
        ?.getLocalPeer()
        .then((peer: React.SetStateAction<HMSLocalPeer | undefined>) => {
          setLocalPeer(peer);
        });
    };

    if (hmsInstance) {
      updateLocalPeer();
    }
  }, [hmsInstance]);

  return (
    <>
      {loading || leaveLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <>
          {modalType === 'preview' && previewTracks ? (
            <PreviewModal
              room={hmsRoom}
              previewTracks={previewTracks}
              join={onJoinRoom}
              setLoadingButtonState={setJoinButtonLoading}
              loadingButtonState={joinButtonLoading}
              hmsInstance={hmsInstance}
              setIsAudioMute={setIsAudioMute}
              isAudioMute={isAudioMute}
              setIsVideoMute={setIsVideoMute}
              isVideoMute={isVideoMute}
            />
          ) : (
            <SafeAreaView style={{flex: 1, backgroundColor: Colors.headerText}}>
              {/* <View > */}
              <BigText
                text={'Woofmeets Conference'}
                textStyle={{
                  fontSize: Text_Size.Text_3,
                  color: Colors.light.background,
                  textAlign: 'center',
                  paddingTop: 10,
                }}
              />
              <FlatList
                centerContent={true}
                data={peerTrackNodes}
                showsVerticalScrollIndicator={false}
                keyExtractor={_keyExtractor}
                renderItem={(item: any) => {
                  return <Peer item={item?.item} HmsView={HmsView} />;
                }}
                contentContainerStyle={{
                  flexGrow: Platform.OS === 'android' ? 1 : undefined,
                  justifyContent:
                    Platform.OS === 'android' ? 'center' : undefined,
                }}
              />
              <View style={styles.iconBottomWrapper}>
                <View style={styles.iconBotttomButtonWrapper}>
                  {videoAllowed && (
                    <AppTouchableOpacity
                      onPress={() => {
                        localPeer?.localVideoTrack()?.setMute(!isVideoMute);
                        setIsVideoMute(!isVideoMute);
                      }}
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: isVideoMute
                            ? Colors.washedRed
                            : Colors.subText,
                        },
                      ]}>
                      <Feather
                        name={isVideoMute ? 'video-off' : 'video'}
                        style={{color: Colors.light.background}}
                        size={20}
                      />
                    </AppTouchableOpacity>
                  )}
                  {audioAllowed && (
                    <AppTouchableOpacity
                      onPress={() => {
                        localPeer?.localAudioTrack()?.setMute(!isAudioMute);
                        setIsAudioMute(!isAudioMute);
                      }}
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: isAudioMute
                            ? Colors.washedRed
                            : Colors.subText,
                        },
                      ]}>
                      <Feather
                        name={isAudioMute ? 'mic-off' : 'mic'}
                        style={{color: Colors.light.background}}
                        size={20}
                      />
                    </AppTouchableOpacity>
                  )}
                  <AppTouchableOpacity
                    onPress={handleRoomEnd}
                    style={[styles.iconContainer, {backgroundColor: Colors.washedRed}]}>
                    <Feather
                      name={'phone'}
                      style={{color: Colors.light.background}}
                      size={20}
                    />
                  </AppTouchableOpacity>
                </View>
              </View>
              {/* </View> */}
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
};

export default Room;

const styles = StyleSheet.create({
  iconBottomWrapper: {
    // height: 200,
    width: '100%',
    paddingVertical: 4,
    backgroundColor: Colors.OVERLAY,
    zIndex: 2,
    borderRadius: 16,
  },
  iconBotttomButtonWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconContainer: {
    bottom: 40,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
