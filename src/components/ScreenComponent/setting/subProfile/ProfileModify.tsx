import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  CallSvg,
  FileTextSvg,
  ImageStackSvg,
  PetSvg,
} from '../../../../screens/settings/Profile/utils/ProfileSvg';
import HeaderText from '../../../common/text/HeaderText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {ProfileIcon} from '../../../../assets/svgs/Setting_SVG';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';

const modifyProfileData = [
  {
    id: 1,
    name: 'Basic Info',
    icon: <ProfileIcon height={20} width={20} />,
  },
  {
    id: 2,
    name: 'Phone Number',
    icon: <CallSvg height={20} width={20} />,
  },
  {
    id: 3,
    name: 'Details',
    icon: <FileTextSvg height={20} width={20} />,
  },
  {
    id: 4,
    name: 'Gallery',
    icon: <ImageStackSvg height={20} width={20} />,
  },
  {
    id: 5,
    name: 'Your Pets',
    icon: <PetSvg height={20} width={20} />,
  },
];

const ProfileModify = () => {
  const {colors} = useTheme();
  return (
    <View
        style={[
          styles.rootContainer,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
      {modifyProfileData.map(
        (item: {id: number; icon: JSX.Element; name: string}) => {
          return (
            <TouchableOpacity key={item.id}>
              <View style={styles.flexContainer}>
                <View>{item.icon}</View>
                <HeaderText text={item.name} textStyle={styles.headerText} />
              </View>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default ProfileModify;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '5%' : '6%',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  headerText: {
    paddingLeft: 10,
  },
});
