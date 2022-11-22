/* eslint-disable react-native/no-inline-styles */
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';
import Colors from '../../../../../constants/Colors';
import DescriptionText from '../../../../common/text/DescriptionText';
import MiddleModal from '../../../../UI/modal/MiddleModal';
import HeaderText from '../../../../common/text/HeaderText';
import BigText from '../../../../common/text/BigText';
import BulletPoints from '../../../../UI/Points/BulletPoints';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import AnimatedLottieView from 'lottie-react-native';
import BottomSpacing from '../../../../UI/BottomSpacing';
import methods from '../../../../../api/methods';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../../../store/store';
import {getCurrentplan} from '../../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {getSubscription} from '../../../../../store/slices/payment/Subscriptions/SubscriptionPlans/subscriptionAction';
import Ion from 'react-native-vector-icons/Ionicons';
import AppButton from '../../../../common/AppButton';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
const endpoint = '/subscriptions/cancel-subscription?subscriptionId=';
const Welcome = (props: any) => {
  const {colors} = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const opk = props?.opk;
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    // if (true) {
    // } else {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to unsubscribe this plan',
      [
        {
          text: 'No',
          onPress: () => {
            setIsModalVisible(false);
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            setLoading(true);
            const result = await methods._delete(
              endpoint + props.currentPlan.subscriptionInfo.id,
            );
            result.ok &&
              (dispatch(getCurrentplan()),
              dispatch(getSubscription()),
              navigation.navigate('SubscriptionScreen'));
            setLoading(false);
          },
        },
      ],
    );
    // }
  };
  const hanldeUpgrade = () => {
    if (props.subscriptionId === 1) {
      navigation.navigate('UpgradePlan');
    } else {
      Alert.alert(
        `You are currently using ${
          props.item.membershipPlan.name
        } plan in order to ${
          props.subscriptionId === 3 ? 'switch' : 'upgrade'
        } your plan you have to cancel your current plan!`,
      );
    }
  };
  useEffect(() => {
    let runTime = setTimeout(() => setShow(false), 3000);

    return () => {
      clearTimeout(runTime);
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      {props.headerBack && (
        <AppTouchableOpacity onPress={() => navigation.goBack()}>
          <Ion
            name="ios-chevron-back"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            style={styles.iconStyle}
            color={Colors.primary}
          />
        </AppTouchableOpacity>
      )}
      <AnimatedLottieView
        autoPlay
        loop={false}
        source={require('../../../../../assets/congratesSvg.json')}
        style={styles.loaderStyle}
      />
      {show && (
        <AnimatedLottieView
          autoPlay
          loop={false}
          source={require('../../../../../assets/congratesFlower.json')}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      )}
      <View>
        <TitleText
          textStyle={{
            color: Colors.primary,
            fontWeight: 'bold',
            fontSize: Text_Size.Text_7,
            textAlign: 'center',
          }}
          text={'Congratulations'}
        />
        <DescriptionText
          textStyle={{textAlign: 'center', marginVertical: 20}}
          text={`You have currenly activated the ${props.item?.membershipPlan?.displayName} plan for next one month. Now you can access all the feature that includes on ${props.item?.membershipPlan?.displayName} Plan. Check out the features down below.`}
        />
      </View>

      <View>
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
              text={`Everything in ${props.item?.membershipPlan?.displayName}`}
              textStyle={styles.textEveryStyle}
            />
            <View style={styles.textPortion2}>
              <BigText
                text={`$${props.item.rate}`}
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
            {props.item?.membershipPlan?.features?.map(
              (item: string, index: number) => (
                <BulletPoints text={item} key={index} />
              ),
            )}
            <View style={styles.footerContainer}>
              {opk === 'current_plan' ? (
                <ButtonCom
                  title="Cancel Plan"
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={btnStyles.containerStyleFullWidth}
                  titleStyle={btnStyles.titleStyle}
                  onSelect={handleSubmit}
                  loading={loading}
                />
              ) : (
                <ButtonCom
                  title="Go Home"
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={btnStyles.containerStyleFullWidth}
                  titleStyle={btnStyles.titleStyle}
                  onSelect={() => navigation.navigate('BottomTabNavigator')}
                  loading={loading}
                />
              )}
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
            <BigText
              text={props.item.membershipPlan.details}
              textStyle={styles.biggerText}
            />
            <TouchableOpacity
              style={styles.detailsWrap}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <View
                style={[
                  styles.detailsContainer,
                  {
                    backgroundColor: colors.primaryLight,
                  },
                ]}>
                <DescriptionText
                  text="Details"
                  textStyle={styles.detailsText}
                />
              </View>
            </TouchableOpacity>
            <TitleText text={props.item.membershipPlan.features[0]} />
          </View>
          <View style={styles.textPortion2}>
            <BigText
              text={`$${props.item.rate}`}
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
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.border,
          borderRadius: 6,
          backgroundColor: Colors.primaryLight,
          padding: 10,
          marginTop: 20,
          marginBottom: 40,
        }}>
        <TitleText
          textStyle={{textAlign: 'justify', fontWeight: 'bold'}}
          text={
            'Note: You can cancel and swap our subscription plans anytime that you want. But noted you will not get back the paid subscription fee once you purchase a plan. Once you cancel a existing plan you have to purchase a new plan in order to access all provider features in woofmeet.'
          }
        />
      </View>
      <View>
        {/* */}
        {opk === 'current_plan' ? (
          <>
            <ButtonCom
              title={
                props.subscriptionId === 3 ? 'Switch Plan' : 'Upgrade Plan'
              }
              textAlignment={btnStyles.textAlignment}
              containerStyle={btnStyles.containerStyleFullWidth}
              titleStyle={btnStyles.titleStyle}
              onSelect={hanldeUpgrade}
              loading={false}
            />

            {props.subscriptionId === 1 ? (
              <ButtonCom
                title="Go Home"
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                onSelect={() => navigation.navigate('BottomTabNavigator')}
                loading={loading}
              />
            ) : (
              <>
                <ButtonCom
                  title="Cancel Plan"
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={btnStyles.containerStyleFullWidth}
                  titleStyle={btnStyles.titleStyle}
                  onSelect={handleSubmit}
                  loading={loading}
                />
                <AppButton
                  title="Go Back"
                  onPress={() => navigation.goBack()}
                />
              </>
            )}
          </>
        ) : (
          <ButtonCom
            title={props.subscriptionId === 3 ? 'Switch Plan' : 'Upgrade Plan'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={hanldeUpgrade}
            loading={loading}
          />
        )}
        {opk !== 'current_plan' && (
          <ButtonCom
            title="Go Home"
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => navigation.navigate('BottomTabNavigator')}
            loading={loading}
          />
        )}
      </View>
      <BottomSpacing />
    </View>
  );
};

export default Welcome;

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
  iconStyle: {paddingRight: 10},
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
  loaderStyle: {width: '80%', alignSelf: 'center'},
});
