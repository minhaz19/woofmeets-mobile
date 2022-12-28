import {SetStateAction, useEffect} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../../api/methods';
import {getProviderProposal} from '../../../../../store/slices/Appointment/Proposal/getProviderProposal';
import {useAppDispatch} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

export const useHandleCoupon = (
  stableProposalPrcing: {subTotal: number; total: number},
  proposedServiceInfo: {billing: {couponId: any}[]; appointmentOpk: string},
  setCouponData: {
    (
      value: SetStateAction<{
        couponType: string;
        coupons: string,
        code: string;
        excludeSubTotal: string;
        withCouponTotal: string;
      }>,
    ): void;
    (arg0: {
      couponType: any;
      code: any;
      coupons: string,
      excludeSubTotal: string;
      withCouponTotal: any;
    }): void;
  },
  isCoupon: string,
  billingId: any,
) => {
  const dispatch = useAppDispatch();
  const getEndPoint = `/coupons/apply/${isCoupon}/billing/${billingId}`;
  const deleteEndPoint = `/coupons/remove/billing/${billingId}`;
  const getCouponDetailsEndPoint = `/coupons/details/${proposedServiceInfo?.billing[0]?.couponId}`;
  const {request, loading} = useApi(methods._get);
  const {request: deleteRequest} = useApi(methods._delete);
  const {request: getDetailsRequest, loading: detailsLoading} = useApi(
    methods._get,
  );

  //coupon details loading
  const getCouponDetails = async () => {
    const result = await getDetailsRequest(getCouponDetailsEndPoint);
    if (result?.ok) {
      if (result?.data?.data?.couponType === 'PERCENTAGE') {
        const excludeSubTotal =
        (stableProposalPrcing?.subTotal * result?.data?.data?.percentage) / 100;
      const withCouponSubTotal =
        stableProposalPrcing?.subTotal - excludeSubTotal;
      const withCouponTotal =
        withCouponSubTotal +
        (stableProposalPrcing?.total - stableProposalPrcing?.subTotal);
      setCouponData({
        couponType: result?.data?.data?.couponType,
        coupons: result?.data?.data?.percentage,
        code: result?.data?.data?.code,
        excludeSubTotal: excludeSubTotal.toFixed(2),
        withCouponTotal: withCouponTotal.toFixed(2),
      });
        dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      } else {
        const withCouponSubTotal =
          stableProposalPrcing?.subTotal - result?.data?.data?.amount;
        const withCouponTotal =
          withCouponSubTotal + (stableProposalPrcing?.total - stableProposalPrcing?.subTotal);
        setCouponData({
          couponType: result?.data?.data?.couponType,
          coupons: result?.data?.data?.amount,
          code: result?.data?.data?.code,
          excludeSubTotal: result?.data?.data?.amount.toFixed(2),
          withCouponTotal: withCouponTotal.toFixed(2),
        });
        dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      }
    }
  };

  useEffect(() => {
    if (proposedServiceInfo?.billing[0]?.couponId) {
      getCouponDetails();
    }
  }, []);

  // apply coupon code
  const handleApplyCoupon = async () => {
    const result = await request(getEndPoint);
    if (result.ok) {
      if (result?.data?.data?.coupon?.couponType === 'PERCENTAGE') {
        const excludeSubTotal =
          (result?.data?.data?.subtotal *
            result?.data?.data?.coupon?.percentage) /
          100;
        const withCouponSubTotal =
          result?.data?.data?.subtotal - excludeSubTotal;
        const withCouponTotal =
          withCouponSubTotal + result?.data?.data?.serviceCharge;
        setCouponData({
          couponType: result?.data?.data?.coupon?.couponType,
          coupons: result?.data?.data?.coupon?.percentage,
          code: result?.data?.data?.coupon?.code,
          excludeSubTotal: excludeSubTotal.toFixed(2),
          withCouponTotal: withCouponTotal.toFixed(2),
        });
        dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      } else {
        const withCouponSubTotal =
          result?.data?.data?.subtotal - result?.data?.data?.coupon?.amount;
        const withCouponTotal =
          withCouponSubTotal + result?.data?.data?.serviceCharge;
        setCouponData({
          couponType: result?.data?.data?.coupon?.couponType,
          coupons: result?.data?.data?.coupon?.amount,
          code: result?.data?.data?.coupon?.code,
          excludeSubTotal: result?.data?.data?.coupon?.amount.toFixed(2),
          withCouponTotal: withCouponTotal.toFixed(2),
        });
        dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      }
    } else {
      Alert.alert(result?.data?.message);
    }
  };

  //delete coupon code
  const handleDeleteCoupon = async () => {
    const result = await deleteRequest(deleteEndPoint);
    if (result?.ok) {
      dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      setCouponData({
        couponType: '',
        code: '',
        coupons: '',
        excludeSubTotal: '',
        withCouponTotal: '',
      });
    }
  };

  return {handleApplyCoupon, handleDeleteCoupon, detailsLoading, loading};
};
