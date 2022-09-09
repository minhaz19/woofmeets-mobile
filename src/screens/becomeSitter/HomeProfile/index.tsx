import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import HeaderText from '../../../components/common/text/HeaderText';
import Divider from '../../../components/UI/Divider';
import {QuestionIcon} from '../../../assets/svgs/SVG_LOGOS';
import BetweenCom from '../../../components/ScreenComponent/becomeSitter/profile/BetweenCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import Colors from '../../../constants/Colors';
import ModalBottomView from '../../../components/UI/modal/ModalBottomView';
import IOSButton from '../../../components/UI/IOSButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getUserServices} from '../../../store/slices/profile/services';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../assets/svgs/Services_SVG';

const HomeProfile = (props: {
  navigation: {navigate: (arg0: string, arg2: any) => void};
}) => {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isServiceModalVisible, setIsServiceModalVisible] =
    useState<boolean>(false);

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

  const userServices = useAppSelector(state => state.services.userServices);

  const dispatch = useAppDispatch();

  const [, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserServices());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sitter-home':
        return <BoardingIcon width={34} height={36} />;
      case 'sitter-traveling':
        return <HouseSittingIcon width={34} height={36} />;
      case 'homevists':
        return <DropInVisitIcon width={34} height={36} />;
      case 'walking':
        return <DogWalkingIcon width={34} height={36} />;
      case 'walking':
        return <DoggyDayCareIcon width={34} height={36} />;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ModalBottomView
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}>
        <HeaderText text={modalData[0].title} />
        <Divider />
        <DescriptionText text={modalData[0].text} />
        <IOSButton
          title={'Close'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={styles.titleStyle}
          onSelect={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </ModalBottomView>
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
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <DescriptionText
            text="Where are the rest of my services?"
            textStyle={{color: Colors.primary}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <HeaderText text="Your Services" />
      </View>
      {userServices &&
        userServices?.map(
          (item: {
            id: React.Key | null | undefined;
            serviceType: {name: any; icon: string; description: any};
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
                  name: item.serviceType.name,
                  image: getIcon(item.serviceType.icon),
                  description: `${item.serviceType.description} ${item.serviceType.description}`,
                  time: '3 mins',
                  icon: 'chevron-right',
                  screen: () => {
                    props.navigation.navigate('ServiceSetup', {
                      serviceData: {
                        serviceType: item.serviceType,
                        serviceTypeId: item.serviceTypeId,
                        providerServicesId: item.id,
                        icon: item.serviceType.icon,
                      },
                    });
                  },
                }}
              />
            </View>
          ),
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
  footerContainer: {
    paddingVertical: 20,
  },
  footerText: {
    paddingHorizontal: '10%',
    marginBottom: 60,
  },
  profileItemStyle: {
    paddingTop: 15,
  },
  serviceContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default HomeProfile;
