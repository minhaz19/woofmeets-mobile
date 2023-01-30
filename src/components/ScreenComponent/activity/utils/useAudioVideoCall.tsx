import {useNavigation} from '@react-navigation/native';
import {PERMISSIONS} from 'react-native-permissions';
import methods from '../../../../api/methods';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {checkPermissions} from '../../conference/Room';

export const useAudioVideoCall = (opk: string, _user: any) => {
  const navigation = useNavigation<any>();
  const endPoint = 'conference/join-room';
  const {request, loading} = useApi(methods._post);
  const handleJoinRoom = async (roomType: string) => {
    const result = await request(endPoint, {
      appointmentOpk: opk,
      roomType: roomType,
    });
    if (result?.ok) {
      // const permissionsGranted = await checkPermissions([
      //   PERMISSIONS.ANDROID.CAMERA,
      //   PERMISSIONS.ANDROID.RECORD_AUDIO,
      //   PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      // ]);

      // if (permissionsGranted) {
      navigation.navigate('Room', {
        token: result?.data?.data,
        roomType: roomType === 'VIDEO' ? 'VIDEO' : 'AUDIO',
        userName: _user?.firstName + ' ' + _user?.lastName,
        userId: _user.id,
        appointmentOpk: opk,
        image: _user?.image.url,
      });
    }
    // else {
    //   console.log('Permission Not Granted!');
    // }
    // }
  };
  const handleAudioCall = () => {
    handleJoinRoom('AUDIO');
  };

  const handleVideoCall = () => {
    handleJoinRoom('VIDEO');
  };

  return {handleAudioCall, handleVideoCall, audioVideoLoading: loading};
};
