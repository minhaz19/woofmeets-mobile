import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import HeaderText from '../../common/text/HeaderText';
import ShortText from '../../common/text/ShortText';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const ProfileInfo = () => {
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
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    width: SCREEN_WIDTH <= 380 ? 44 : SCREEN_WIDTH <= 600 ? 60 : 68,
    borderRadius: 50,
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

export default ProfileInfo;
