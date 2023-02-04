/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Modal, Platform} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import ActivityHeader from '../../../components/ScreenComponent/activity/ActivityHeader';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BottomHalfModal from '../../../components/UI/modal/BottomHalfModal';
import Details from '../../../components/ScreenComponent/Inbox/Details/Details';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getProviderProposal} from '../../../store/slices/Appointment/Proposal/getProviderProposal';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {getAllPets} from '../../../store/slices/pet/allPets/allPetsAction';
import ThreeDotsModal from '../../../components/ScreenComponent/Inbox/Past/ThreeDotsModal';
import Review from '../../../components/ScreenComponent/Inbox/Past/Review';
import styles from './styles';
import Messages from '../message/Messages';
import {getAppointmentCard} from '../../../store/slices/Appointment/AppointmentCard/getAppointmentCard';
import {socket} from '../../../../App';
import {apiMsg} from '../../../api/client';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {API_MSG} from '@env';
import storage from '../../../utils/helpers/auth/storage';
const ActivityScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
  route: {
    params: {
      appointmentOpk: string;
      messageGroupId?: string;
      AppointmentTab?: boolean;
      showReview?: boolean | false;
      pendingReview?: boolean | undefined;
    };
  };
}) => {
  const dispatch = useAppDispatch();
  const {
    appointmentOpk,
    messageGroupId: roomId,
    AppointmentTab,
    showReview,
    pendingReview,
  } = props?.route?.params;
  const {loading: petLoading} = useAppSelector(state => state.allPets);
  const {loading, proposal, proposedServiceInfo} = useAppSelector(
    state => state.proposal,
  );

  const {loading: providerLoading} = useAppSelector(
    state => state.providerProfile,
  );
  const {user} = useAppSelector(state => state.whoAmI);

  const reviewGiven = proposedServiceInfo?.review?.filter(
    (item: any) => item?.reviewedById === user?.id,
  );
  const {colors} = useTheme();
  const [isDetailsModal, setIsDetailsModal] = useState(false);
  const [isThreeDotsModal, setIsThreeDotsModal] = useState(false);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [hasModalShown, setHasModalShown] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [msgLoading, setMsgLoadng] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visitId, setVisitId] = useState(null);
  const {request} = useApi(methods._get);
  const readMessages = async () => {
    const authToken = await storage.getToken();
    await request(
      `${API_MSG}/v1/messages/users/${user.id}/groups/${roomId}/read-messages`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
  };
  const getPreviousMessages = async () => {
    if (roomId) {
      setMsgLoadng(true);
      const slug = `/v1/messages/group/${roomId}`;
      const result: any = await apiMsg.get(slug);
      if (result.ok) {
        setMessages(result?.data?.data?.reverse());
        setMsgLoadng(false);
      }
      if (!result.ok) {
        setMsgLoadng(false);
      }
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    getPreviousMessages();
    dispatch(getProviderProposal(appointmentOpk));
    dispatch(getAppointmentCard(appointmentOpk));
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(getProviderProposal(appointmentOpk));
    dispatch(getAllPets());
    dispatch(getAppointmentCard(appointmentOpk));
    getPreviousMessages();
    readMessages();
    // setIsReviewModal(true);
    const trackMessages = (data: any) => {
      if (data?.group === roomId) {
        setMessages((prevMess: any) => [...prevMess, data]);
      }
    };
    socket.on('message', trackMessages);
    return () => {
      socket.off('message', trackMessages);
    };
  }, []);

  // useEffect(() => {
  //   const trackMessages = (data: any) => {
  //     if (data?.group === roomId) {
  //       setMessages((prevMess: any) => [...prevMess, data]);
  //     }
  //   };
  //   socket.on('message', trackMessages);
  //   return () => {
  //     socket.off('message', trackMessages);
  //   };
  // }, [roomId]);
  useEffect(() => {
    if (showReview) {
      setIsReviewModal(true);
    } else if (
      !pendingReview &&
      !hasModalShown &&
      reviewGiven?.length === 0 &&
      proposedServiceInfo?.status === 'COMPLETED'
    ) {
      setIsReviewModal(true);
      // setHasModalShown(true);
    } else {
      setIsReviewModal(false);
      // setHasModalShown(true);
    }
    return () => {
      setHasModalShown(false);
    };
  }, [showReview, proposedServiceInfo]);
  // }, [showReview, proposedServiceInfo]);
  return loading || petLoading || providerLoading ? (
    <AppActivityIndicator visible={loading || petLoading || providerLoading} />
  ) : (
    <>
      <View
        style={{
          ...styles.rootContainer,
          backgroundColor: colors.backgroundColor,
        }}>
        <SafeAreaView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <>
              <ActivityHeader
                setIsDetailsModal={setIsDetailsModal}
                setIsThreeDotsModal={setIsThreeDotsModal}
                opk={appointmentOpk}
                setVisitId={setVisitId}
                proposedServiceInfo={proposedServiceInfo}
                AppointmentTab={AppointmentTab}
              />

              <Messages
                refreshing={refreshing}
                onRefresh={onRefresh}
                messages={messages}
                setMessages={setMessages}
                loading={msgLoading}
                roomId={roomId}
                opk={appointmentOpk}
              />
            </>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
      <BottomHalfModal
        isModalVisible={isDetailsModal}
        setIsModalVisible={setIsDetailsModal}>
        <Details
          setIsDetailsModal={setIsDetailsModal}
          setModalVisible={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </BottomHalfModal>
      <BottomHalfModal
        isModalVisible={isThreeDotsModal}
        setIsModalVisible={setIsThreeDotsModal}>
        <ThreeDotsModal
          setIsThreeDotsModal={setIsThreeDotsModal}
          setIsReviewModal={setIsReviewModal}
          isReviewed={reviewGiven}
          appointmentId={visitId}
          opk={appointmentOpk}
          setModalVisible={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </BottomHalfModal>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        // isModalVisible={isReviewModal}

        visible={isReviewModal}>
        <View
          style={{
            padding: 20,
          }}>
          <Review
            setIsReviewModal={setIsReviewModal}
            setHasModalShown={setHasModalShown}
            appointmentId={proposal?.appointment?.id}
            setModalVisible={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>
      </Modal>
      {/* <BottomHalfModal
        // isModalVisible={isReviewModal}
        isModalVisible={isReviewModal}
        setIsModalVisible={setIsReviewModal}>
        <Review
          setIsReviewModal={setIsReviewModal}
          appointmentId={proposal?.appointment?.id}
          setModalVisible={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </BottomHalfModal> */}
    </>
  );
};

export default ActivityScreen;
