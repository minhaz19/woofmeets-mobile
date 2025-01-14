/* eslint-disable react-hooks/exhaustive-deps */
import {View, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import HeaderText from '../../../components/common/text/HeaderText';
import BulletPoints from '../../../components/UI/Points/BulletPoints';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import CardQuotes from '../../../components/ScreenComponent/becomeSitter/Card/CardQuotes';
import HowItWorks from '../../../components/ScreenComponent/becomeSitter/works/HowItWorks';
import {bulletData1, bulletData3} from './data';
import {styles} from './styles';
import {getOnboardingProgress} from '../../../store/slices/onBoarding/initial';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getCurrentplan} from '../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {CancelToken} from 'apisauce';
import {getUserServices} from '../../../store/slices/profile/services';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const SitterInitialScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  useEffect(() => {
    const source = CancelToken.source();

    dispatch(getOnboardingProgress());
    dispatch(getCurrentplan(source));
    dispatch(getUserServices());
    return () => {
      source.cancel();
    };
  }, []);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const currentPlan = useAppSelector(state => state.currentPlan);
  const {userServices, userServicesLoading} = useAppSelector(
    state => state.services,
  );

  const handlePress = () => {
    setIsLoading(true);
    if (isLoggedIn) {
      if (currentPlan?.currentPlan?.subscriptionInfo?.status) {
        setIsLoading(false);
        props.navigation.navigate('Profile');
      } else {
        if (userServices) {
          setIsLoading(false);
          props.navigation.navigate('ServiceSetupFlow'); // props.navigation.navigate('SitterLandingPage');
          // props.navigation.navigate('OnboardingWebView');
        } else {
          setIsLoading(false);
          props.navigation.navigate('NewServiceSelection');
        }
      }
    } else {
      setIsLoading(false);
      props.navigation.navigate('SignUp');
    }
  };

  return (
    <>
      {userServicesLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.container,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <View
            style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
            <Image
              // source={{uri: 'https://source.unsplash.com/random/800x800/?img=1'}}
              source={require('../../../assets/image/onboarding/pet-with-owner.jpeg')}
              style={styles.image}
            />
          </View>
          {/* GET PAID */}
          <View style={styles.innerContainer}>
            <View style={styles.centerText}>
              <BigText text="Get paid to play with pets" />
            </View>
            <View style={styles.verticalPadding}>
              <TitleText
                textStyle={styles.titleStyleMedium}
                text="Woofmeets makes it easy and promotes you to the nation's largest network of pet owners. Earn money doing something you love."
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonCom
                loading={isLoading}
                title="Get Started"
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                onSelect={handlePress}
              />
            </View>
            {/* Flexibility */}
            <HeaderText
              textStyle={styles.titleStylePadding}
              text="Be Your Own Boss"
            />
            {/* Bullets */}
            {bulletData1.map(item => (
              <BulletPoints text={item.text} key={item.id} />
            ))}
          </View>
          <View style={styles.verticalPadding} />
          <View style={styles.verticalPadding} />
          {/* Image Quotes 1 */}
          <View
            style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
            <Image
              source={require('../../../assets/image/onboarding/testimonial-dogs.jpg')}
              // source={{uri: 'https://source.unsplash.com/random/800x800/?img=1'}}
              style={styles.image}
            />
          </View>
          <CardQuotes
            comment="Woofmeets makes it easy to earn. There's a holiday rate every month!"
            writter="Evelyn Rodriguez"
          />
          {/* Tools to success */}
          {/* <View style={styles.innerContainer}>
        <HeaderText
          textStyle={styles.titleStylePadding2}
          text="The tools to succeed"
        />
        {bulletData2.map(item => (
          <BulletPoints text={item.text} key={item.id} />
        ))}
      </View>
      <View style={styles.verticalPadding} /> */}
          {/* Image Quotes 2 */}
          {/* <View style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
        <Image
          source={{uri: 'https://source.unsplash.com/random/800x800/?img=1'}}
          style={styles.image}
        />
      </View>
      <CardQuotes
        comment="Thanks to the Woofmeets App, I know about mu business requests immediately and I'm quick to respond!"
        writter="Carol U., Atlanta GA"
      /> */}
          {/* How it works */}
          <View style={styles.innerContainer}>
            <HeaderText
              textStyle={styles.titleStylePadding2}
              text="How it Works"
            />
            <HowItWorks />
            <View style={styles.buttonContainer}>
              <ButtonCom
                loading={isLoading}
                title="Get Started"
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                onSelect={handlePress}
              />
            </View>
          </View>
          {/* Safety First */}
          <View style={styles.innerContainer}>
            <HeaderText
              textStyle={styles.titleStyle}
              text="What are Woofmeets requirement?"
            />
            {/* <TitleText
          textStyle={styles.titleStylePaddingMedium}
          text="We work tirelessly to ensure tails keep wagging and pet owner's minds are at ease."
        /> */}
            {bulletData3.map(item => (
              <BulletPoints text={item.text} key={item.id} />
            ))}
          </View>
          {/* Footer */}
          <View style={[styles.centerText, styles.innerContainer]}>
            <BigText
              textStyle={styles.titleStylePadding}
              text="Connect with pet owners once your profile is approved"
            />
          </View>
          <View style={[styles.buttonContainer, styles.innerContainer]}>
            <ButtonCom
              loading={isLoading}
              title="Start Creating Your Profile"
              textAlignment={btnStyles.textAlignment}
              containerStyle={btnStyles.containerStyleFullWidth}
              titleStyle={btnStyles.titleStyle}
              onSelect={handlePress}
            />
          </View>
          <BottomSpacing />
        </ScrollView>
      )}
    </>
  );
};

export default SitterInitialScreen;
