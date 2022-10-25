import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import DescriptionText from '../../components/common/text/DescriptionText';
import { useTheme } from '../../constants/theme/hooks/useTheme';
import ShortText from '../../components/common/text/ShortText';
import IOSButton from '../../components/UI/IOSButton';
import { InviteFriendsIcon } from '../../assets/svgs/Misc_LOGOS';

const InviteFriends = () => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]} >
      <View style={styles.SvgContainer}>
        <InviteFriendsIcon />
      </View>
      <View style={styles.textContainer}>
        <HeaderText text="Everybody wins" textStyle={styles.headerText} />
        <DescriptionText
          text="Invite a friend to Woofmeets and they'll get $20 toward their first booking. Once they book, you'll get a $20 credit!"
          textStyle={{
            ...styles.textStyle,
            color: colors.descriptionText,
          }}
        />
        <ShortText
          text="People you invite must use your invite link to sign up."
          textStyle={{
            ...styles.textStyle,
            color: colors.descriptionText,
          }}
        />
        <IOSButton
            containerStyle={styles.containerStyleSmall}
            onSelect={() => {}}
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
            title={'Share or copy invite link'}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    SvgContainer: {
      alignItems: 'center',
      paddingTop: '10%',
    },
    textContainer: {
      width: '90%',
      paddingLeft: '5%',
      paddingTop: '10%',
    },
    headerText: {
      lineHeight: 20,
    },
    textStyle: {
      lineHeight: 20,
      marginTop:
        SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
    },
    containerStyleSmall: {
      height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
      marginLeft: 0,
      marginRight: 0,
      justifyContent: 'center',
      marginTop: '15%',
    },
  });

export default InviteFriends;
