import {
  GestureResponderEvent,
  StyleSheet,
  Text,
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
    screenName: ((event: GestureResponderEvent) => void) | undefined;
    opacity: NumberProp | undefined;
    title: string;
    details?: string;
  };
}

const PreferenceItem: FC<PreferenceItemProps> = ({data}) => {
  const {colors} = useTheme();
  return (
    <>
      <TouchableOpacity onPress={data.screenName}>
        <View style={styles.container}>
          <HeaderText text={data.title} />
          {data.details && <DescriptionText text={data.details} />}
        </View>
      </TouchableOpacity>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
    </>
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
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
});
