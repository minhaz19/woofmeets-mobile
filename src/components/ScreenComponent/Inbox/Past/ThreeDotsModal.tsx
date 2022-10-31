/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_HEIGHT} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import IOSButton from '../../../UI/IOSButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  setIsReviewModal: (value: boolean) => void;
  setIsThreeDotsModal: (value: boolean) => void;
  setModalVisible: (arg1: boolean) => void;
  isReviewed: any;
}

const ThreeDotsModal: FC<Props> = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const modalData = [
    {
      id: 2,
      name: 'Report',
      icon: <Entypo name="documents" size={24} color={Colors.primary} />,
      screen: () => {
        navigation.navigate('ReportCardInitial');
      },
    },
    {
      id: 3,
      name: props.isReviewed.length > 0 ? 'Already reviewed' : 'Review',
      icon: (
        <MaterialIcons name="rate-review" size={24} color={Colors.primary} />
      ),
      screen: () => {
        props.isReviewed.length === 0 && props.setIsReviewModal(true);
        props.isReviewed.length === 0 && props.setIsThreeDotsModal(false);
      },
    },
    {
      id: 4,
      name: 'Zoom',
      icon: (
        <FontAwesome name="video-camera" size={24} color={Colors.primary} />
      ),
      screen: () => {},
    },
  ];
  return (
    <>
      <View>
        {modalData.map(item => {
          return (
            <AppTouchableOpacity
              key={item.id}
              onPress={item.screen}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              {item.icon}
              <HeaderText text={item.name} textStyle={styles.descriptionText} />
            </AppTouchableOpacity>
          );
        })}
      </View>
      <IOSButton
        containerStyle={styles.containerStyleSmall}
        onSelect={() => props.setIsThreeDotsModal(false)}
        textAlignment={{
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 100,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        titleStyle={{
          color: colors.lightText,
        }}
        title={'Close'}
      />
    </>
  );
};

export default ThreeDotsModal;

const styles = StyleSheet.create({
  descriptionText: {
    paddingLeft: 10,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    marginTop: '10%',
  },
});
