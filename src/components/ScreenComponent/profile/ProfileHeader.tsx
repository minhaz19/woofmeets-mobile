import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import HeaderText from '../../common/text/HeaderText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const ProfileHeader = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.topContainer}>
      <View
        style={[styles.imageContainer, {borderColor: colors.descriptionText}]}>
        <Image
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
          style={styles.imageStyle}
        />
        <View
          style={[styles.addContainer, {borderColor: colors.backgroundColor}]}>
          <Ionicons
            name="md-add"
            size={SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 18 : 20}
            color={Colors.light.background}
          />
        </View>
      </View>
      <View style={styles.nameContainer}>
        <HeaderText text="John Askelad" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nameContainer: {
    padding: 10,
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    width: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    borderRadius: 50,
  },
  addContainer: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    height: 24,
    width: 24,
    bottom: 0,
    right: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default ProfileHeader;
