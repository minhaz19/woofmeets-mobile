/* eslint-disable react-native/no-inline-styles */
import {
  GestureResponderEvent,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {NumberProp} from 'react-native-svg';

interface PreferenceItemProps {
  data: {
    id?: number;
    screenName: ((event: GestureResponderEvent) => void) | undefined;
    opacity: NumberProp | undefined;
    title: string;
    details?: string;
    switchButton?: boolean;
    changeNotificationSettings: (val: boolean) => void | undefined;
    switchValue?: boolean;
  };
}

const PreferenceItem: FC<PreferenceItemProps> = ({data}) => {
  const {colors} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.backgroundColor,
  };

  return (
    <View
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
        borderBottomWidth: 1,
        borderTopWidth: data.id === 1 ? 1 : 0,
        borderColor: colors.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <TouchableOpacity onPress={data.screenName}>
          <View style={styles.container}>
            <HeaderText text={data.title} />
            {data.details && <DescriptionText text={data.details} />}
          </View>
        </TouchableOpacity>
        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
      </View>
      {data?.switchButton && <Switch onValueChange={(val) => data.changeNotificationSettings(val)} value={data.switchValue} />}
    </View>
  );
};

export default PreferenceItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '5%' : '7%',
    paddingVertical: '2%',
  },
  divider: {
    // height: 1,
    // opacity: 0.3,
    // marginVertical:
    //   SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '1%',
  },
});
