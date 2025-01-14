import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import ShortText from '../../../common/text/ShortText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useAppSelector} from '../../../../store/store';
import changeTextLetter from '../../../common/changeTextLetter';
const img =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const ApntProviderProfileInfo = () => {
  const {colors} = useTheme();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  return (
    <View style={styles.topContainer}>
      <View
        style={[styles.imageContainer, {borderColor: colors.descriptionText}]}>
        <Image
          source={{
            uri: proposedServiceInfo.proivderImage?.image?.url
              ? proposedServiceInfo.proivderImage?.image?.url
              : img,
          }}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.nameContainer}>
        <View>
          <HeaderText
            text={`${
              proposedServiceInfo.providerName
                ? changeTextLetter(proposedServiceInfo.providerName)
                : 'No Name Provided'
            }`}
          />
          <View>
            <ShortText text={proposedServiceInfo.providerAddress} />
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

export default ApntProviderProfileInfo;
