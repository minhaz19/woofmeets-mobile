import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import ActivityHeader from '../../../components/ScreenComponent/activity/ActivityHeader';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BottomHalfModal from '../../../components/UI/modal/BottomHalfModal';
import Details from '../../../components/ScreenComponent/Inbox/Draft/Past/Details';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getProviderProposal} from '../../../store/slices/Appointment/Proposal/getProviderProposal';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {getAllPets} from '../../../store/slices/pet/allPets/allPetsAction';
import ThreeDotsModal from '../../../components/ScreenComponent/Inbox/Past/ThreeDotsModal';
import Review from '../../../components/ScreenComponent/Inbox/Past/Review';
import {getWhoAmI} from '../../../store/slices/common/whoAmI/whoAmIAction';
import styles from './styles';
import Messages from '../message/Messages';

const ActivityScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
  route: {params: {appointmentOpk: string}};
}) => {
  const dispatch = useAppDispatch();
  const {loading, proposal} = useAppSelector(state => state.proposal);
  // console.log('proposal', proposal?.appointment?.messageGroupId);
  const {loading: petLoading} = useAppSelector(state => state.allPets);
  const {appointmentOpk} = props.route.params;

  useEffect(() => {
    dispatch(getProviderProposal(appointmentOpk));
    dispatch(getAllPets());
    dispatch(getWhoAmI());
  }, []);

  const {colors} = useTheme();
  const [isDetailsModal, setIsDetailsModal] = useState(false);
  const [isThreeDotsModal, setIsThreeDotsModal] = useState(false);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProviderProposal(appointmentOpk));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);
  console.log('proposal', proposal);
  return (
    <>
      {(loading || petLoading) && <AppActivityIndicator visible={true} />}
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
              />
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
                  setModalVisible={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </BottomHalfModal>
              <BottomHalfModal
                isModalVisible={isReviewModal}
                setIsModalVisible={setIsReviewModal}>
                <Review
                  setIsReviewModal={setIsReviewModal}
                  appointmentId={proposal.appointment.id}
                  setModalVisible={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </BottomHalfModal>
              <Messages
                roomId={proposal?.appointment?.messageGroupId}
                opk={appointmentOpk}
              />
            </>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default ActivityScreen;
