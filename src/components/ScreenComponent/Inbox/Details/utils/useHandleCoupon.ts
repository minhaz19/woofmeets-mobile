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
        percentage: string;
        code: string;
        withCouponSubTotal: string;
        withCouponTotal: string;
      }>,
    ): void;
    (arg0: {
      percentage: any;
      code: any;
      withCouponSubTotal: string;
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
      const excludeSubTotal =
        (stableProposalPrcing?.subTotal * result?.data?.data?.percentage) / 100;
      const withCouponSubTotal =
        stableProposalPrcing?.subTotal - excludeSubTotal;
      const withCouponTotal =
        withCouponSubTotal +
        (stableProposalPrcing?.total - stableProposalPrcing?.subTotal);
      setCouponData({
        percentage: result?.data?.data?.percentage,
        code: result?.data?.data?.code,
        withCouponSubTotal: withCouponSubTotal.toFixed(2),
        withCouponTotal: withCouponTotal.toFixed(2),
      });
    }
  };

  useEffect(() => {
    if (proposedServiceInfo?.billing[0]?.couponId) {
      getCouponDetails();
    }
  }, [proposedServiceInfo?.billing[0]?.couponId]);

  // apply coupon code
  const handleApplyCoupon = async () => {
    const result = await request(getEndPoint);
    if (result.ok) {
      const excludeSubTotal =
        (result?.data?.data?.subtotal *
          result?.data?.data?.coupon?.percentage) /
        100;
      const withCouponSubTotal = result?.data?.data?.subtotal - excludeSubTotal;
      const withCouponTotal =
        withCouponSubTotal + result?.data?.data?.serviceCharge;
      setCouponData({
        percentage: result?.data?.data?.coupon?.percentage,
        code: result?.data?.data?.coupon?.code,
        withCouponSubTotal: withCouponSubTotal.toFixed(2),
        withCouponTotal: withCouponTotal.toFixed(2),
      });
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
        percentage: '',
        code: '',
        withCouponSubTotal: '',
        withCouponTotal: '',
      });
    }
  };

  return {handleApplyCoupon, handleDeleteCoupon, detailsLoading, loading};
};
