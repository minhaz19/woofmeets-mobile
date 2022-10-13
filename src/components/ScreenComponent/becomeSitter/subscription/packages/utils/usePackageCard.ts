import {useNavigation} from '@react-navigation/native';
import {ApiResponse} from 'apisauce';
import {useState} from 'react';
import methods from '../../../../../../api/methods';
import {getCurrentplan} from '../../../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {useAppDispatch} from '../../../../../../store/store';
import {useApi} from '../../../../../../utils/helpers/api/useApi';

const endpoint = '/subscriptions/check-basic-verification-payment';
const subscriptionEndpoint = '/subscriptions/subscribe/';
const defaultCardEndpoint = '/stripe-payment-method/default-card-info';
export const usePackageCard = (props: any) => {
  const navigation = useNavigation<any>();
  const [ssLoading, setSSLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sequence = props.item.sequence;
  const dispatch = useAppDispatch();
  const {loading: pLoading, request} = useApi(methods._post);
  const {request: cardRequest} = useApi(methods._get);
  const handleSubmit = async () => {
    if (sequence === 1) {
      setSSLoading(true);
      const result: ApiResponse<any> = await methods._get(endpoint);
      const cardResponse = await cardRequest(defaultCardEndpoint);
      if (result.ok && cardResponse.ok) {
        if (
          result.data.data.needPayment === true &&
          cardResponse.status === 200
        ) {
          navigation.navigate('PaymentMethod', {
            sequence: sequence,
          });

          setSSLoading(false);
        } else if (result.data.data.needPayment === false) {
          const cardId = cardResponse.data.data.id;
          const subscriptionResult = await request(
            `${subscriptionEndpoint}?priceId=${sequence}&cardId=${cardId}`,
          );
          subscriptionResult.ok &&
            (await dispatch(getCurrentplan()),
            // @ts-ignore
            navigation.navigate('SubscriptionScreen'));
          setSSLoading(false);
        }
      } else {
        if (result.status === 400) {
          // @ts-ignore
          navigation.navigate('PaymentMethod', {sequence: sequence});
          setSSLoading(false);
        }
      }
    } else {
      navigation.navigate('PaymentMethod', {sequence: sequence});
      setSSLoading(false);
    }
    setIsModalVisible(!isModalVisible);
    setSSLoading(false);
  };
  return {
    handleSubmit,
    ssLoading,
    pLoading,
    isModalVisible,
    setIsModalVisible,
  };
};
