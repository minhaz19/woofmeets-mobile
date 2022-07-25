import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import Text_Size from '../../../../constants/textScaling';
import SwitchView from '../../../common/switch/SwitchView';
import DescriptionText from '../../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {colors} from '../../../../constants/theme/textTheme';
import ButtonCom from '../../../UI/ButtonCom';
import BottomSpacing from '../../../UI/BottomSpacing';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';

const Notification = () => {
  const {colors} = useTheme();
  const [isSendEmailInNewMessage, setIsSendEmailInNewMessage] = useState(true);
  const [isMarketingEmail, setIsMarketingEmail] = useState(true);
  const [isUpdatingCalendar, setIsUpdatingCalendar] = useState(true);
  const [isWoofmeetCards, setIsWoofmeetCards] = useState(true);
  const [isTextMessage, setIsTextMessage] = useState(true);
  const [isNewInquires, setIsNewInquires] = useState(true);
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [isNewBookingRequest, setNewBookingRequest] = useState(true);
  const [isBookingDeclined, setIsBookingDeclined] = useState(true);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(true);
  const [isMarketingTextMessages, setIsMarketingTextMessages] = useState(true);
  const data = [
    {
      id: 1,
      title: 'Send me an email when I get a new message or request.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isSendEmailInNewMessage}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsSendEmailInNewMessage(is);
          }}
        />
      ),
    },
    {
      id: 2,
      title: 'Receive marketing emails from Woofmeets.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isMarketingEmail}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsMarketingEmail(is);
          }}
        />
      ),
    },
    {
      id: 3,
      title: 'Mobile.',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore',
      toggle: false,
    },
    {
      id: 4,
      title: 'Remind me update my calendar',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isUpdatingCalendar}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsUpdatingCalendar(is);
          }}
        />
      ),
    },
    {
      id: 5,
      title: 'Remind me to create Woofmeets Cards',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isWoofmeetCards}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsWoofmeetCards(is);
          }}
        />
      ),
    },
    {
      id: 6,
      title: 'Send me a text message when I get a new message or request',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isTextMessage}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsTextMessage(is);
          }}
        />
      ),
    },
    {
      id: 7,
      title: 'New Inquires',
      description: 'Text me when I receive a anew message or request.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isNewInquires}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsNewInquires(is);
          }}
        />
      ),
    },
    {
      id: 8,
      title: 'New Message',
      description: 'Text me when I receive a anew message or request.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isNewMessage}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsNewMessage(is);
          }}
        />
      ),
    },
    {
      id: 9,
      title: 'New Booking Request',
      description: 'Text me when I receive a anew message or request.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isNewBookingRequest}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setNewBookingRequest(is);
          }}
        />
      ),
    },
    {
      id: 10,
      title: 'Booking Declined',
      description: 'Text me when I receive a anew message or request.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isBookingDeclined}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsBookingDeclined(is);
          }}
        />
      ),
    },
    {
      id: 11,
      title: 'Booking Confirmed',
      description: 'Text me when I receive a anew message or request.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isBookingConfirmed}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsBookingConfirmed(is);
          }}
        />
      ),
    },
    {
      id: 12,
      title: 'Receive marketing text messages from Woofmeets.',
      toggle: true,
      iconComponent: (
        <SwitchView
          isActive={isMarketingTextMessages}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsMarketingTextMessages(is);
          }}
        />
      ),
    },
  ];
  const termsAndCondition = [
    {
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore  ${(
        <TouchableOpacity>
          <Text>Privacy Statement</Text>
        </TouchableOpacity>
      )}  and  ${(<TouchableOpacity>Privacy Statement</TouchableOpacity>)}`,
    },
  ];
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <HeaderText text="Email" textStyle={styles.headerText} />
      <View>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <View
                style={[
                  styles.divider,
                  {backgroundColor: colors.descriptionText},
                ]}
              />
              <View style={styles.flexContainer}>
                <View style={styles.titleContainer}>
                  <HeaderText text={item.title} textStyle={styles.titleText} />
                  {item.description && (
                    <DescriptionText
                      text={item.description}
                      textStyle={styles.descriptionText}
                    />
                  )}
                </View>
                <View style={styles.toggleContainer}>
                  {item.iconComponent && item.iconComponent}
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <DescriptionText
        text={
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore '
        }
        textStyle={styles.descriptionText}
      />
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => {}}>
          <DescriptionText
            text={'Terms of Service'}
            textStyle={styles.termsText}
          />
        </TouchableOpacity>
        <DescriptionText text={'and'} textStyle={styles.termsText} />
        <TouchableOpacity onPress={() => {}}>
          <DescriptionText
            text={'Privacy Statement.'}
            textStyle={styles.termsText}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <DescriptionText text={'Deactivate Account'} textStyle={styles.input} />
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Save Setting'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
      <BottomSpacing />
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_2,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '3%' : '0%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
  },
  titleContainer: {
    width: '80%',
  },
  titleText: {
    lineHeight: 25,
    fontWeight: '500',
  },
  descriptionText: {
    lineHeight: 20,
    color: colors.descriptionText,
    paddingTop: SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '2%' : '0%',
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  toggleContainer: {},
  input: {
    paddingTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  footerContainer: {
    paddingTop:
      SCREEN_WIDTH <= 380 ? '10%' : SCREEN_WIDTH <= 600 ? '10%' : '4%',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  termsText: {
    lineHeight: 20,
    color: colors.descriptionText,
    paddingRight: 6,
  },
});
