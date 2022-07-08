import {View, SafeAreaView, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import SettingItem from '../../components/ScreenComponent/Auth/setting/SettingItem';
import {
  CallIcon,
  Payment2Icon,
  PetsIcon,
  Profile2Icon,
} from '../../assets/Setting_SVG';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import Colors from '../../constants/Colors';
import ShortText from '../../components/common/text/ShortText';
import Text_Size from '../../constants/textScaling';
import {useTheme} from '../../constants/theme/hooks/useTheme';

const MyAccount = (props: {navigation: {navigate: (arg0: string) => any}}) => {
  const {colors} = useTheme();
  const supportData = [
    {
      id: 1,
      title: 'Basic Info',
      icon: Profile2Icon,
      screenName: () => props.navigation.navigate('BasicInfo'),
      details: 'Name, Gender, Age, Photo, Password',
      opacity: 1,
    },
    {
      id: 2,
      title: 'Contact',
      icon: CallIcon,
      screenName: () => props.navigation.navigate('ContactScreen'),
      details: 'Number, Email, Location',
      opacity: 1,
    },
    {
      id: 3,
      title: 'Payment method',
      icon: Payment2Icon,
      screenName: () => {},
      details: 'Add payment, Card',
      opacity: 1,
    },
    {
      id: 4,
      title: 'Your Pets',
      icon: PetsIcon,
      screenName: () => {},
      details: 'Edit, pet, add new pet',
      opacity: 1,
    },
  ];

  return (
    <ScrollView
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <SafeAreaView>
        <View style={styles.topContainer}>
          <View
            style={[
              styles.imageContainer,
              {borderColor: colors.descriptionText},
            ]}>
            <Image
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.nameContainer}>
            <View>
              <HeaderText text="John Askelad" />
              <View>
                <ShortText text="Hey there! I am ………." />
              </View>
            </View>
          </View>
        </View>

        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
        {supportData?.map(item => (
          <SettingItem
            data={item}
            key={item.id}
            descriptionStyle={{
              color: colors.lightText,
              fontSize: Text_Size.Text_8,
            }}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  titleContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginBottom: '2%',
  },
  boxContainer: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    marginBottom: '2%',
    borderWidth: 1,
    borderColor: Colors.subText,
    padding: '2%',
  },
  boxTextContainer: {
    flexDirection: 'row',
    paddingBottom: '0.8%',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    height: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    width: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    borderRadius: 30,
    borderWidth: 1,
  },
  nameContainer: {
    padding: 10,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    width: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    borderRadius: 50,
  },
});

export default MyAccount;
