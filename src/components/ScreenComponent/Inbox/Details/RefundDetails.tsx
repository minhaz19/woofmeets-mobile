/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import Ion from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../UI/BottomSpacing';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getProposalPricing} from '../../../../store/slices/Appointment/Details/getProposalPricing';
import RefundPricing from './RefundPricing';

interface Props {
  setIsPayment?: (value: boolean) => void;
  setIsDetailsModal?: (value: boolean) => void;
  setModalVisible?: (arg1: boolean) => void;
}

const RefundDetails: FC<Props> = props => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  useEffect(() => {
    dispatch(getProposalPricing(proposedServiceInfo?.appointmentOpk));
  }, []);

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            props?.setIsDetailsModal
              ? props.setIsDetailsModal(false)
              : props.setIsPayment && props.setIsPayment(false);
          }}>
          <Ion
            name="ios-chevron-back"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            style={styles.iconStyle}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <HeaderText text={'Details'} textStyle={styles.textHeader} />
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <RefundPricing screen={''} />
      <BottomSpacing />
    </View>
  );
};

export default RefundDetails;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 20},
  textHeader: {
    fontSize: Text_Size.Text_2,
  },
  priceTextHeader: {
    fontSize: Text_Size.Text_2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  _textHeader: {
    fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 20 : 22,
    lineHeight: 20,
    marginBottom: 6,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '1%' : SCREEN_WIDTH <= 600 ? '2%' : '3%',
  },
  priceText: {
    fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 20 : 22,
    color: Colors.primary,
  },
  descriptionText: {},
  mapContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '4%' : '5%',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
