import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import TitleText from '../../../../common/text/TitleText';
import DescriptionText from '../../../../common/text/DescriptionText';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import {useApi} from '../../../../../utils/helpers/api/useApi';
import methods from '../../../../../api/methods';
import Text_Size from '../../../../../constants/textScaling';
import {useAppDispatch} from '../../../../../store/store';
import {getCurrentplan} from '../../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {getSubscription} from '../../../../../store/slices/payment/Subscriptions/SubscriptionPlans/subscriptionAction';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {confirmPayment} from '@stripe/stripe-react-native';
import {baseUrlV} from '../../../../../utils/helpers/httpRequest';
import {CancelToken} from 'apisauce';
const endpointBasicPayment = `${baseUrlV}/v2/subscriptions/pay-basic-verification-payment?`;
const subscriptionEndpoint = `${baseUrlV}/v1/subscriptions/subscribe?`;

interface Props {
  route: {
    params: {
      sequence: number | null;
      cardId: number | null;
    };
  };
  navigation: {
    navigate: (arg1: string, arg2?: any) => void;
    goBack: () => void;
  };
}

const BasicPayment = ({route, navigation}: Props) => {
  const uuid = Math.random().toString(36).substring(2, 36);
  const {sequence, cardId} = route.params;
  const {loading, request} = useApi(methods._idempt_post);
  const [idemLoading, setIdemLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    const result = await request(
      endpointBasicPayment + `cardId=${cardId}`,
      {},
      uuid,
    );

    if (result.ok) {
      if (result.ok && result?.data?.data?.requiresAction === true) {
        const clientScreet = result.data.data.clientSecret;
        const {paymentIntent, error: dsError}: any = await confirmPayment(
          clientScreet,
        );

        if (paymentIntent?.status === 'Succeeded') {
          const res = await request(
            `${subscriptionEndpoint}?priceId=${sequence}&cardId=${cardId}`,
            {},
            uuid,
          );
          setIdemLoading(false);

          if (res.ok) {
            dispatch(getCurrentplan());
            dispatch(getSubscription());
            navigation.navigate('SubscriptionScreen');
          }
        }
        dsError !== undefined && Alert.alert(dsError.localizedMessage);
      } else if (result.ok && result?.data.data.requiresAction === false) {
        const res = await request(
          `${subscriptionEndpoint}priceId=${sequence}&cardId=${cardId}`,
          {},
          uuid,
        );
        setIdemLoading(false);
        if (res.ok) {
          dispatch(getCurrentplan());
          dispatch(getSubscription());
          navigation.navigate('SubscriptionScreen');
        }
      }
    } else if (!result.ok && result.status === 400) {
      setIdemLoading(false);
      Alert.alert(
        'We are unable to proccess your payment request right now, Please reload the application and try again ',
      );
    } else if (!result.ok && result.status === 409) {
      setIdemLoading(false);
      Alert.alert(result?.data?.message);
    }
  };
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <AppTouchableOpacity
        style={styles.leftContainer}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons
          name="ios-chevron-back"
          size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
          style={styles.iconStyle}
          color={Colors.primary}
        />
      </AppTouchableOpacity>
      <AnimatedLottieView
        autoPlay
        loop
        source={require('../../../../../assets/basciPayment.json')}
        style={styles.lottie}
      />
      <TitleText
        textStyle={styles.titleText}
        text={'Verify Background Check'}
      />
      <DescriptionText
        textStyle={styles.des}
        text="We must manually verify your identification because you selected the basic subscription as your plan. To pass a background check, you must give $35."
      />
      <ButtonCom
        title="Pay $35"
        textAlignment={btnStyles.textAlignment}
        containerStyle={btnStyles.containerStyleFullWidth}
        titleStyle={btnStyles.titleStyle}
        onSelect={handleSubmit}
        loading={loading || idemLoading}
      />
    </View>
  );
};

export default BasicPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_5,
  },
  des: {
    marginVertical: 20,
    textAlign: 'center',
  },
  lottie: {width: '100%'},
  leftContainer: {
    position: 'absolute',
    left: '4%',
    top: '6%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 10},
});
