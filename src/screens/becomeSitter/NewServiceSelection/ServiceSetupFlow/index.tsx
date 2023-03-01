/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useServiceSetUpFlow} from '../utils/serviceSetupFlowUtils';
import Colors from '../../../../constants/Colors';
import AllServiceSetup from '../../../../components/ScreenComponent/becomeSitter/serviceSelection/AllServiceSetup';
import SitterSubmitButton from '../../../../components/ScreenComponent/becomeSitter/serviceSelection/SitterSubmitButton';
import ProfileSetup from './ProfileSetup';
import {setIsSelectedSection} from '../../../../store/slices/onBoarding/initialSetUp/serviceSetupFlowSlice';
import ShortText from '../../../../components/common/text/ShortText';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
const layoutButton = [
  {
    id: 1,
    name: 'Service Setup',
    icon: '',
    slug: 'serviceSetup',
  },
  {
    id: 2,
    name: 'Profile Setup',
    icon: '',
    slug: 'profileSetup',
  },
  {
    id: 3,
    name: 'Submit Profile',
    icon: '',
    slug: 'submitProfile',
  },
];

const ServiceSetupFlow = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const {availability, basicInfo} = useAppSelector(
    state => state.newOnboarding,
  );
  const {isSelectedSection, userServicesLoading, userServices} =
    useServiceSetUpFlow();
  const [active, setActive] = useState(0);

  const servcieStatus = availability?.id;
  const profileStatus = basicInfo?.latitude;
  useEffect(() => {
    if (isSelectedSection === 'serviceSetup') {
      setActive(0);
    } else if (isSelectedSection === 'profileSetup') {
      setActive(1);
    } else {
      setActive(2);
    }
  }, [isSelectedSection]);

  return (
    <>
      {userServicesLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <View
          style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
          <View style={styles.buttonStyle}>
            {layoutButton?.map((item, index: any) => {
              return (
                <View key={index}>
                  <View>
                    <Pressable
                      onPress={() => {
                        dispatch(setIsSelectedSection(item?.slug));
                        setActive(index);
                        navigation.setParams({id: index + 1});
                      }}
                      key={index.toString()}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                        backgroundColor:
                          (index === 0 && servcieStatus) ||
                          (index === 1 && profileStatus)
                            ? Colors.background
                            : active === index
                            ? Colors.primary
                            : Colors.iosBG,
                        borderWidth: 6,
                        borderColor:
                          (index === 0 && servcieStatus) ||
                          (index === 1 && profileStatus)
                            ? Colors.green
                            : active === index
                            ? Colors.primary
                            : Colors.gray,
                        zIndex: 9999,
                        // flexDirection: 'row',
                        // flex: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {((index === 0 && servcieStatus) ||
                        (index === 1 && profileStatus)) &&
                      active !== index ? (
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon
                            name="checkcircle"
                            size={20}
                            color={Colors.green}
                          />
                        </View>
                      ) : (
                        <ShortText
                          text={index + 1}
                          textStyle={{
                            fontWeight: '900',
                            color:
                              (index === 0 && servcieStatus) ||
                              (index === 1 && profileStatus)
                                ? Colors.green
                                : active === index
                                ? Colors.background
                                : Colors.text,
                          }}
                        />
                      )}
                    </Pressable>
                  </View>
                  {index === 2 ? null : (
                    <View
                      style={{
                        width: SCREEN_WIDTH / 2 - 20,
                        top: '50%',
                        position: 'absolute',
                        flex: 0,
                        zIndex: -10,
                        height: 4,
                        left: 10,
                        backgroundColor:
                          (index === 0 && servcieStatus) ||
                          (index === 1 && profileStatus)
                            ? Colors.green
                            : Colors.gray,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <View>
            {isSelectedSection === 'serviceSetup' ? (
              <AllServiceSetup userServices={userServices} />
            ) : isSelectedSection === 'profileSetup' ? (
              <ProfileSetup />
            ) : (
              <SitterSubmitButton />
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default ServiceSetupFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    flexDirection: 'row',
    flex: 0,
    paddingHorizontal: 20,
    alignItems: 'center',

    position: 'relative',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  singleButtonStyle: {
    borderWidth: 1,
    paddingVertical: 8,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
