/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_HEIGHT} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {CallSvg} from '../../../../screens/settings/Profile/utils/ProfileSvg';
import IOSButton from '../../../UI/IOSButton';

interface Props {
  setIsReviewModal: (value: boolean) => void;
  setIsThreeDotsModal: (value: boolean) => void;
  setModalVisible: (arg1: boolean) => void;
}

const ThreeDotsModal: FC<Props> = props => {
  const {colors} = useTheme();
  const modalData = [
    {
      id: 1,
      name: 'Call Meer',
      icon: <CallSvg height={20} width={20} />,
      screen: () => {},
    },
    {
      id: 2,
      name: 'Report',
      icon: <CallSvg height={20} width={20} />,
      screen: () => {},
    },
    {
      id: 3,
      name: 'Review',
      icon: <CallSvg height={20} width={20} />,
      screen: () => {
        props.setIsReviewModal(true);
        props.setIsThreeDotsModal(false);
      },
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
