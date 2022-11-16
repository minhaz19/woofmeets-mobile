import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import {PlusRounded} from '../../../../../assets/svgs/SVG_LOGOS';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../constants/Colors';
import HeaderText from '../../../../common/text/HeaderText';
import ShortText from '../../../../common/text/ShortText';

const width = SCREEN_WIDTH;
interface Props {
  name?: string;
  type?: string;
  weight?: number;
  ageMonth?: number;
  ageYear?: number;
  gender?: string;
  profile_image?: string;

  dataList?: [
    {
      id: string;
    },
  ];
  onPress?: () => void;
}
const imageUri = 'https://i.ibb.co/NTN60dD/dogcat.png';
const MyPetList = ({
  name,
  type,
  ageYear,
  gender,
  profile_image,
  dataList,
  onPress,
}: Props) => {
  const {isDarkMode, colors} = useTheme();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !dataList
              ? Colors.none
              : colors.backgroundColor,
            borderColor: Colors.border,
          },
        ]}>
        {dataList ? (
          <View>
            <Image
              source={{uri: profile_image ? profile_image : imageUri}}
              style={{...styles.image, borderColor: colors.borderColor}}
              resizeMode="cover"
            />
            <View
              style={[
                styles.textContainer,
                {
                  backgroundColor: colors.backgroundColor,
                },
              ]}>
              <HeaderText
                text={name![0].toUpperCase() + name?.slice(1)}
                textStyle={styles.title}
              />
              <ShortText
                textStyle={styles.subTitle}
                text={
                  'Type - ' +
                  type![0].toUpperCase() +
                  type?.slice(1).toLowerCase()
                }
              />
              <ShortText
                textStyle={styles.description}
                text={`${ageYear + ' Year '} - ${
                  gender![0].toUpperCase() + gender?.slice(1).toLowerCase()
                }`}
              />
            </View>
          </View>
        ) : (
          <View style={styles.addPet}>
            <PlusRounded fill={Colors.light.lightText} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyPetList;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH >= 800 ? width / 3 - 40 : width / 2 - 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginVertical: 10,
  },

  image: {
    width: '100%',
    height: SCREEN_WIDTH < 390 ? SCREEN_HEIGHT / 6 : SCREEN_HEIGHT / 7.5,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 12,
    paddingTop: 10,
  },
  title: {fontSize: Text_Size.Text_0, fontWeight: '600'},
  subTitle: {fontSize: Text_Size.Text_8, fontWeight: '500', marginVertical: 2},
  description: {fontSize: Text_Size.Text_8},
  addPet: {
    flex: 1,
    paddingTop: '50%',
    paddingBottom: '50%',
    alignItems: 'center',
  },
});
