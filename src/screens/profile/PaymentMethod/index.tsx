/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
// import {StyleSheet} from 'react-native';
// import Text_Size from '../../constants/textScaling';
// import Colors from '../../constants/Colors';
// import {SCREEN_WIDTH} from '../../constants/WindowSize';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getCards} from '../../../store/slices/payment/PaymentCards/getCardsAction';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import AddCardForm from '../../../components/ScreenComponent/profile/PaymentMethod/AddCardForm';
import AllCards from '../../../components/ScreenComponent/profile/PaymentMethod/AllCards';
const CreditAndDebitCard = () => {
  const dispatch = useAppDispatch();
  const {loading, cards} = useAppSelector(state => state.cards);
  console.log('cards', cards);
  useEffect(() => {
    dispatch(getCards());
  }, []);
  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      {cards ? (
        <>
          <AllCards cards={cards} />
        </>
      ) : (
        <AddCardForm />
      )}
    </>
  );
};

export default CreditAndDebitCard;

// const styles = StyleSheet.create({
//   rootContainer: {
//     paddingTop: 20,
//     flex: 1,
//   },
//   label: {
//     fontSize: Text_Size.Text_1,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   inputContainer: {
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: Text_Size.Text_2,
//     paddingBottom:
//       SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
//   },
//   shortText: {
//     fontSize: Text_Size.Text_0,
//     color: Colors.subText,
//     paddingBottom:
//       SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
//   },
// });
