/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import TitleText from '../../../../common/text/TitleText';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../../constants/textScaling';
import DescriptionText from '../../../../common/text/DescriptionText';
import MiddleModal from '../../../../UI/modal/MiddleModal';
import HeaderText from '../../../../common/text/HeaderText';
import BulletPoints from '../../../../UI/Points/BulletPoints';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import {useNavigation} from '@react-navigation/native';
import methods from '../../../../../api/methods';
import {getCurrentplan} from '../../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {useAppDispatch} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';
import {ApiResponse} from 'apisauce';

const endpoint = '/subscriptions/check-basic-verification-payment';
const subscriptionEndpoint = '/subscriptions/subscribe/';
const defaultCardEndpoint = '/stripe-payment-method/default-card-info';
const PackageCard = (props: {
  onPressEvent: (arg0: any) => void;
  item: {
    sequence: any;
    id: React.Key | null | undefined;
    title: {} | null | undefined;
    price: any;
    details: {description: string; id: number}[];
    description: string | number;
  };
  sequence: any;
  navigation: any;
}) => {
  const {colors, isDarkMode} = useTheme();
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
      if (result.ok) {
        if (
          result.data.data.needPayment === true &&
          cardResponse.status === 200
        ) {
          // @ts-ignore
          navigation.navigate('BasicPayment', {
            sequence: sequence,
            cardId: cardResponse.data.data.id,
          });
          setSSLoading(false);
        } else if (result.data.data.needPayment === false) {
          const subscriptionResult = await request(
            `${subscriptionEndpoint}?priceId=${sequence}&cardId=${cardResponse.data.data.id}`,
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
  return (
    <>
      <TouchableOpacity
        onPress={() => props.onPressEvent(props.item.sequence)}
        key={props.item.id}>
        <MiddleModal
          isModalVisible={isModalVisible}
          setIsModalVisible={() => {
            setIsModalVisible(!isModalVisible);
          }}
          onBlur={() => null}>
          <Image
            source={require('../../../../../assets/image/subscription/subscription.png')}
            style={styles.imageStyle}
          />
          <View style={styles.headerContainer}>
            <BigText
              text={props.item.title}
              textStyle={styles.textHeaderStyle}
            />
            <View style={styles.divider} />
            <HeaderText
              text={`Everything in ${props.item.title}`}
              textStyle={styles.textEveryStyle}
            />
            <View style={styles.textPortion2}>
              <BigText
                text={`$${props.item.price}`}
                textStyle={styles.headerText}
              />
              <View style={styles.textPortion3}>
                <DescriptionText
                  text="/month"
                  textStyle={styles.textHeaderStyle}
                />
              </View>
            </View>
          </View>
          <View style={styles.modalContainer}>
            {props.item.details?.map(
              (item: {description: string; id: number}) => (
                <BulletPoints text={item.description} key={item.id} />
              ),
            )}
            <View style={styles.footerContainer}>
              <ButtonCom
                title="Choose Plan"
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                onSelect={handleSubmit}
                loading={pLoading || ssLoading}
              />
            </View>
          </View>
        </MiddleModal>
        <View
          key={props.item.id}
          style={{
            ...styles.contentStyle,
            backgroundColor: colors.backgroundColor,
            borderWidth: 2,
            borderColor:
              props.sequence === props.item.sequence
                ? Colors.primary
                : colors.borderColor,
          }}>
          <View style={styles.textPortion}>
            <BigText text={props.item.title} textStyle={styles.biggerText} />
            <TouchableOpacity
              style={styles.detailsWrap}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <View
                style={[
                  styles.detailsContainer,
                  {
                    backgroundColor: isDarkMode
                      ? colors.lightBackgroundColor
                      : colors.primaryLight,
                  },
                ]}>
                <DescriptionText
                  text="Details"
                  textStyle={styles.detailsText}
                />
              </View>
            </TouchableOpacity>
            <TitleText text={props.item.description} />
          </View>
          <View style={styles.textPortion2}>
            <BigText
              text={`$${props.item.price}`}
              textStyle={styles.biggerText}
            />
            <View style={styles.textPortion3}>
              <DescriptionText text="(per month)" />
            </View>
          </View>
          {props.sequence === props.item.sequence && (
            <View style={styles.rightSelection} />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    borderColor: Colors.subText,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSelection: {
    height: 12,
    width: 12,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 3,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  biggerText: {
    fontSize: Text_Size.Text_2,
  },
  headerText: {
    fontSize: Text_Size.Text_4,
    color: Colors.background,
  },
  textPortion: {
    justifyContent: 'center',
    width: '70%',
  },
  textPortion2: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textPortion3: {
    paddingBottom: 4,
  },
  detailsContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 4,
  },
  detailsWrap: {
    flexDirection: 'row',
  },
  detailsText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingHorizontal: '20%',
    paddingBottom: 40,
    paddingTop: 40,
  },
  modalContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: 14,
  },
  textHeaderStyle: {
    paddingBottom: 10,
    color: Colors.background,
  },
  divider: {
    width: SCREEN_WIDTH,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  textEveryStyle: {
    paddingBottom: 12,
    color: Colors.background,
  },
  imageStyle: {
    width: '100%',
    marginTop: 0,
  },
});

export default PackageCard;
