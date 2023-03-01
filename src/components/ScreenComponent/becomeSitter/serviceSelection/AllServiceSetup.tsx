/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import BetweenCom from '../profile/BetweenCom';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import ServiceReusableModal from '../ServiceSetup/Common/ServiceReusableModal';
import ModalBottomView from '../../../UI/modal/ModalBottomView';
import HeaderText from '../../../common/text/HeaderText';
import Divider from '../../../UI/Divider';
import DescriptionText from '../../../common/text/DescriptionText';
import IOSButton from '../../../UI/IOSButton';
import BigText from '../../../common/text/BigText';
import {QuestionIcon} from '../../../../assets/svgs/SVG_LOGOS';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import SingleServiceSetUp from './SingleServiceSetUp';
import {useAppDispatch} from '../../../../store/store';
import {setServiceSetup} from '../../../../store/slices/onBoarding/setUpService/serviceSetup/serviceSetUpSlice';

interface props {
  userServices: any;
}
const modalData = [
  {
    id: 1,
    title: 'How does approval work?',
    text: "Woofmeets selects a single service for you to complete during sign up. Once approved, youy can deactivate any services you no longer wish to offer or add additional service at any time. \n\nOnce you've completed the required sign - up steps , your profile will be auto- submitted and reviewed to ensure accuracy and quality. agna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
  },
  {
    id: 2,
    title: 'How does approval work?',
    text: "Woofmeets selects a single service for you to complete during sign up. Once approved, youy can deactivate any services you no longer wish to offer or add additional service at any time. \n\nOnce you've completed the required sign - up steps , your profile will be auto- submitted and reviewed to ensure accuracy and quality. agna aliquyam erat, sed diam voluptua. \n\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
  },
];
const AllServiceSetup = ({userServices}: props) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isServiceModalVisible, setIsServiceModalVisible] =
    useState<boolean>(false);
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const getIcon = (iconId: string) => {
    switch (iconId) {
      case 'sitter-home':
        return (
          <FontAwesome5Icon
            name="briefcase"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'sitter-traveling':
        return (
          <FontAwesome5Icon
            name="home"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'homevists':
        return (
          <FontAwesome5Icon
            name="house-user"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'walking':
        return (
          <MaterialCommunityIcons
            name="dog-service"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
      case 'daycare':
        return (
          <FontAwesome5Icon
            name="paw"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 32}
            color={Colors.primary}
          />
        );
    }
  };
  if (isServiceSelected) {
    return <SingleServiceSetUp />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{width: '100%', height: '100%'}}>
      <View style={{paddingHorizontal: 20}}>
        <ServiceReusableModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          question="Where are the rest of my services?"
          description="You may notice during the signup process that you can only see one of the services you decided to offer clients. This is normal. We will run a background check on you once you’ve set up your profile. Assuming we accept you to join the Woofmeets team, you’ll be able to come back to your dashboard and set up the rest of your services."
        />
        <ModalBottomView
          isModalVisible={isServiceModalVisible}
          setIsModalVisible={setIsServiceModalVisible}>
          <HeaderText text={modalData[0].title} />
          <Divider />
          <DescriptionText text={modalData[0].text} />
          <IOSButton
            title={'Close'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={styles.titleStyle}
            onSelect={() => {
              setIsServiceModalVisible(!isServiceModalVisible);
            }}
          />
        </ModalBottomView>
        <BigText text="Set Up Services" />
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <QuestionIcon fill={Colors.primary} />
          </View>
          <AppTouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <DescriptionText
              text="Where are the rest of my services?"
              textStyle={{color: Colors.primary}}
            />
          </AppTouchableOpacity>
        </View>
        <View>
          <HeaderText text="Your Services" />
        </View>
        {userServices &&
          userServices?.map(
            (item: {
              AvailableDay: any;
              id: React.Key | null | undefined;
              serviceType: {
                name: any;
                icon: string;
                description: any;
                slug: string;
              };
              serviceTypeId: React.Key | null | undefined;
              providerServicesId: React.Key | null | undefined;
            }) => (
              <View
                key={item.id}
                style={{
                  ...styles.serviceContainer,
                  borderColor: colors.borderColor,
                }}>
                <BetweenCom
                  data={{
                    name: item?.serviceType?.name,
                    image: getIcon(item?.serviceType?.icon),
                    description: `${item?.serviceType?.description}`,
                    // time: '3 mins',
                    icon: 'chevron-right',
                    screen: () => {
                      dispatch(setServiceSetup(item));
                      setIsServiceSelected(true);
                    },
                  }}
                />
              </View>
            ),
          )}
      </View>
    </ScrollView>
  );
};

export default AllServiceSetup;

const styles = StyleSheet.create({
  serviceContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: 24,
  },
  textStyle: {
    paddingLeft: 5,
  },
  titleStyle: {
    color: Colors.alert,
    fontWeight: '600',
  },
  iconContainer: {
    paddingRight: 10,
  },
});
