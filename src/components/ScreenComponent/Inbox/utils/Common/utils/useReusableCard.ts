import {API_MSG} from '@env';
import {CancelToken} from 'apisauce';
import {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {socket} from '../../../../../../../App';
import apiClient from '../../../../../../api/client';
import {setBadge} from '../../../../../../store/slices/Appointment/Inbox/Misc/unreadBadge';
import {useAppDispatch, useAppSelector} from '../../../../../../store/store';

export const useReusbaleCard = (roomId: any) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.whoAmI);
  // const [roomId, setRoomId] = useState(null);
  const [counter, setCounter] = useState<any>([]);

  const [unRead, setFinalCounter] = useState(false);
  useEffect(() => {
    const source = CancelToken.source();
    const getPreviousMessages = async () => {
      if (roomId) {
        const slug = `/v1/messages/group/${roomId}`;
        const result: any = await apiClient.get(
          API_MSG + slug,
          {},
          {cancelToken: source.token},
        );
        if (result.ok) {
          result?.data?.data?.map((msg: any) => {
            if (
              msg?.group === roomId &&
              msg?.read === false &&
              msg?.sender !== user?.id
            ) {
              setCounter((prevC: any) => [...prevC, msg?._id]);
            }
          });
        }
      }
    };
    getPreviousMessages();
    return () => {
      source.cancel();
      // unsubscribe();
    };
  }, [roomId, user?.id]);
  useEffect(() => {
    const messageSound = new Sound('message.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        return;
      }
    });
    const trackMessages = (d: any) => {
      if (d?.group === roomId && d?.read === false && d?.sender !== user?.id) {
        setCounter((prevC: any) => [...prevC, d?._id]);
        messageSound.play();
      }
    };
    socket.on('message', trackMessages);
    return () => {
      socket.off('message', trackMessages);
      messageSound.release();
    };
  }, [roomId, user?.id]);
  // Filter the unique new message id.
  useEffect(() => {
    if (counter?.length > 0) {
      // const final = [...new Set(counter)];
      dispatch(setBadge(true));
      setFinalCounter(true);
    } else {
      dispatch(setBadge(false));
    }
  }, [counter, dispatch, setFinalCounter]);
  return {unRead};
};
