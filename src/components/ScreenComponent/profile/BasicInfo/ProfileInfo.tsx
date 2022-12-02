import {View, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import ShortText from '../../../common/text/ShortText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import changeTextLetter from '../../../common/changeTextLetter';
import {getUserProfileInfo} from '../../../../store/slices/userProfile/userProfileAction';
const img =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const ProfileInfo = () => {
  const {colors} = useTheme();
  const {userInfo} = useAppSelector(state => state.userProfile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserProfileInfo());
  }, []);
  return (
    <View style={styles.topContainer}>
      <View
        style={[styles.imageContainer, {borderColor: colors.descriptionText}]}>
        <Image
          source={{
            uri: userInfo?.image?.url ? userInfo?.image?.url : img,
          }}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.nameContainer}>
        <View>
          <HeaderText
            text={`${
              userInfo?.firstName
                ? changeTextLetter(userInfo?.firstName) +
                  ' ' +
                  changeTextLetter(userInfo?.lastName)
                : 'loading...'
            }`}
          />
          {userInfo?.provider?.providerDetails?.about && (
            <View>
              <ShortText
                text={
                  userInfo?.provider?.providerDetails?.about.slice(0, 25) +
                  (userInfo?.provider?.providerDetails?.about.length > 25
                    ? '...'
                    : '')
                }
              />
            </View>
          )}
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
