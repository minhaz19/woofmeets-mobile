import {Platform} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {
  HMSAudioTrackSettings,
  HMSConfig,
  HMSPeerUpdate,
  HMSRoom,
  HMSSDK,
  HMSTrack,
  HMSTrackSettings,
  HMSTrackSettingsInitState,
  HMSTrackSource,
  HMSTrackType,
  HMSTrackUpdate,
  HMSUpdateListenerActions,
  HMSVideoTrackSettings,
} from '@100mslive/react-native-hms';

import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {RouteProp} from '@react-navigation/native';
import methods from '../../../../api/methods';
import {useApi} from '../../../../utils/helpers/api/useApi';

const endPoint = '/conference/leave-room';
export const usePeerTrackNodes = (
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
  >,
  navigation: {navigate: (arg0: string) => void},
) => {
  const {token, roomType, userName, userId, appointmentOpk, image} =
    route.params;
  const hmsInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [peerTrackNodes, setPeerTrackNodes] = useState([]);
  const [previewTracks, setPreviewTracks] = useState<HMSTrack[]>();
  const [hmsRoom, setHmsRoom] = useState<HMSRoom>();
  const [joinButtonLoading, setJoinButtonLoading] = useState<boolean>(false);
  const [modalType, setModalType] = useState('');
  const {request: leaveRequest, loading: leaveLoading} = useApi(methods._post);

  let hmsConfig = new HMSConfig({
    authToken: token,
    username: userName,
    captureNetworkQualityInPreview: true,
    // endpoint,
  });

  const handleRoomLeave = async () => {
    const payload = {
      appointmentOpk: appointmentOpk,
      roomType: roomType,
    };
    try {
      const result = await leaveRequest(endPoint, payload);
      if (result?.ok) {
        const hmsInstance = hmsInstanceRef.current;
        await hmsInstance.leave();
        // Removing HMSSDK instance
        hmsInstanceRef.current = null;
        navigation.navigate('InboxNavigator');
      }
    } catch (error) {
      console.log('Leave or Destroy Error: ', error);
    }
  };
  const getTrackSettings = () => {
    let audioSettings = new HMSAudioTrackSettings({
      initialState: HMSTrackSettingsInitState.MUTED,
    });

    let videoSettings = new HMSVideoTrackSettings({
      initialState: HMSTrackSettingsInitState.MUTED,
    });

    return new HMSTrackSettings({
      video: videoSettings,
      audio: audioSettings,
    });
  };

  const onJoinSuccess = (data: {room: {localPeer: any}}) => {
    const {localPeer} = data.room;
    setPeerTrackNodes(prevPeerTrackNodes =>
      updateNode({
        nodes: prevPeerTrackNodes,
        peer: localPeer,
        track:
          localPeer.videoTrack.type === undefined
            ? localPeer.audioTrack
            : localPeer.videoTrack,
        createNew: true,
      }),
    );
    setLoading(false);
    setJoinButtonLoading(false);
    setModalType('zoom');
  };

  const onPeerListener = ({peer, type}) => {
    if (type === HMSPeerUpdate.PEER_JOINED) {
      return;
    }

    if (type === HMSPeerUpdate.PEER_LEFT) {
      setPeerTrackNodes(prevPeerTrackNodes =>
        removeNodeWithPeerId(prevPeerTrackNodes, peer.peerID),
      );
      return;
    }

    if (peer.isLocal) {
      setPeerTrackNodes(prevPeerTrackNodes =>
        updateNodeWithPeer({nodes: prevPeerTrackNodes, peer, createNew: true}),
      );
      return;
    }

    if (
      type === HMSPeerUpdate.ROLE_CHANGED ||
      type === HMSPeerUpdate.METADATA_CHANGED ||
      type === HMSPeerUpdate.NAME_CHANGED ||
      type === HMSPeerUpdate.NETWORK_QUALITY_UPDATED
    ) {
      return;
    }
  };

  const onTrackListener = ({peer, track, type}) => {
    if (type === HMSTrackUpdate.TRACK_ADDED) {
      setPeerTrackNodes(prevPeerTrackNodes =>
        updateNode({
          nodes: prevPeerTrackNodes,
          peer,
          track,
          createNew: true,
        }),
      );

      return;
    }

    if (
      type === HMSTrackUpdate.TRACK_MUTED ||
      type === HMSTrackUpdate.TRACK_UNMUTED
    ) {
      // if (track.type === HMSTrackType.VIDEO) {
      setPeerTrackNodes(prevPeerTrackNodes =>
        updateNode({
          nodes: prevPeerTrackNodes,
          peer,
          track,
        }),
      );
      // } else {
      //   setPeerTrackNodes(prevPeerTrackNodes =>
      //     updateNodeWithPeer({
      //       nodes: prevPeerTrackNodes,
      //       peer,
      //     }),
      //   );
      // }
      return;
    }

    if (type === HMSTrackUpdate.TRACK_REMOVED) {
      return;
    }

    if (
      type === HMSTrackUpdate.TRACK_RESTORED ||
      type === HMSTrackUpdate.TRACK_DEGRADED
    ) {
      return;
    }
  };

  const onErrorListener = (error: {code: any; description: any}) => {
    setLoading(false);
    setJoinButtonLoading(false);

    console.log(`${error?.code} ${error?.description}`);
  };

  const onPreviewSuccess = (
    hmsInstance: HMSSDK,
    config: HMSConfig,
    data: {
      room: HMSRoom;
      previewTracks: HMSTrack[];
    },
  ) => {
    setHmsRoom(data.room);
    setPreviewTracks(data?.previewTracks);

    if (data?.previewTracks?.length > 0) {
      setModalType('preview');
      setLoading(false);
    } else {
      if (config) {
        hmsInstance?.join(config);
      } else {
        setJoinButtonLoading(false);
        setLoading(false);
      }
    }
  };

  const onJoinRoom = () => {
    if (hmsConfig) {
      const hmsInstance = hmsInstanceRef.current;
      hmsInstance?.join(new HMSConfig({authToken: token, username: userName}));
    } else {
      setJoinButtonLoading(false);
      setLoading(false);
    }
  };

  // Effect to handle HMSSDK initialization and Listeners Setup
  useEffect(() => {
    const joinRoom = async () => {
      // setLoading(true);

      const trackSettings = getTrackSettings();
      const hmsInstance = await HMSSDK.build({trackSettings});

      // Saving `hmsInstance` in ref
      hmsInstanceRef.current = hmsInstance;

      hmsInstance?.addEventListener(
        HMSUpdateListenerActions.ON_PREVIEW,
        onPreviewSuccess.bind(this, hmsInstance, hmsConfig),
      );
      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_JOIN,
        onJoinSuccess,
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_PEER_UPDATE,
        onPeerListener,
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_TRACK_UPDATE,
        onTrackListener,
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_ERROR,
        onErrorListener,
      );

      // hmsInstance.join(new HMSConfig({authToken: token, username: userName}));
      hmsInstance.preview(hmsConfig);
    };

    joinRoom();

    // return () => {
    //   // handleRoomLeave();
    //   joinRoom();
    // };
  }, []);

  return {
    loading,
    leaveRoom: handleRoomLeave,
    peerTrackNodes,
    hmsInstanceRef,
    leaveLoading,
    modalType,
    joinButtonLoading,
    setJoinButtonLoading,
    hmsRoom,
    previewTracks,
    onJoinRoom,
  };
};

export const checkPermissions = async (permissions: any[]) => {
  try {
    if (Platform.OS === 'ios') {
      return true;
    }
    const requiredPermissions = permissions.filter(
      (permission: {toString: () => any}) =>
        permission.toString() !== PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    );

    const results = await requestMultiple(requiredPermissions);

    let allPermissionsGranted = true;
    for (let permission in requiredPermissions) {
      if (!(results[requiredPermissions[permission]] === RESULTS.GRANTED)) {
        allPermissionsGranted = false;
      }
      console.log(
        `${requiredPermissions[permission]} : ${
          results[requiredPermissions[permission]]
        }`,
      );
    }

    // Bluetooth Connect Permission handling
    if (
      permissions.findIndex(
        (permission: {toString: () => any}) =>
          permission.toString() === PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      ) >= 0
    ) {
      const bleConnectResult = await request(
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      );
      console.log(
        `${PERMISSIONS.ANDROID.BLUETOOTH_CONNECT} : ${bleConnectResult}`,
      );
    }

    return allPermissionsGranted;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * returns `uniqueId` for a given `peer` and `track` combination
 */
export const getPeerTrackNodeId = (
  peer: {peerID: any},
  track: {source: any},
) => {
  return peer.peerID + (track?.source ?? HMSTrackSource.REGULAR);
};

/**
 * creates `PeerTrackNode` object for given `peer` and `track` combination
 */
export const createPeerTrackNode = (
  peer: any,
  track: {type: any} | undefined,
) => {
  return {
    id: getPeerTrackNodeId(peer, track),
    peer: peer,
    track: track,
  };
};

/**
 * Removes all nodes which has `peer` with `id` same as the given `peerID`.
 */
export const removeNodeWithPeerId = (nodes: any[], peerID: any) => {
  return nodes.filter(
    (node: {peer: {peerID: any}}) => node.peer.peerID !== peerID,
  );
};

export const updateNodeWithPeer = (data: {
  nodes: any;
  peer: any;
  createNew?: any;
}) => {
  const {nodes, peer, createNew = false} = data;

  const peerExists = nodes.some(
    (node: {peer: {peerID: any}}) => node.peer.peerID === peer.peerID,
  );

  if (peerExists) {
    return nodes.map((node: {peer: {peerID: any}}) => {
      if (node.peer.peerID === peer.peerID) {
        return {...node, peer};
      }
      return node;
    });
  }

  if (!createNew) {
    return nodes;
  }

  if (peer.isLocal) {
    return [createPeerTrackNode(peer), ...nodes];
  }

  return [...nodes, createPeerTrackNode(peer)];
};

/**
 * Removes all nodes which has `id` same as `uniqueId` generated from given `peer` and `track`.
 */
export const removeNode = (nodes: any[], peer: any, track: any) => {
  const uniqueId = getPeerTrackNodeId(peer, track);

  return nodes.filter((node: {id: any}) => node.id !== uniqueId);
};

export const updateNode = (data: {
  nodes: any;
  peer: any;
  track: any;
  createNew?: any;
}) => {
  const {nodes, peer, track, createNew = false} = data;

  const uniqueId = getPeerTrackNodeId(peer, track);

  const nodeExists = nodes.some((node: {id: any}) => node.id === uniqueId);

  if (nodeExists) {
    return nodes.map((node: {id: any}) => {
      if (node.id === uniqueId) {
        return {...node, peer, track};
      }
      return node;
    });
  }

  if (!createNew) {
    return nodes;
  }

  if (peer.isLocal) {
    return [createPeerTrackNode(peer, track), ...nodes];
  }

  return [...nodes, createPeerTrackNode(peer, track)];
};
