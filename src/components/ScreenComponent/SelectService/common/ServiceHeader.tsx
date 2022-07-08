/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';

interface Props {
  hText: string;
  dText: string;
}

const ServiceHeader: FC<Props> = ({hText, dText}) => {
  const colors = useTheme();
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, {color: colors.colors.headerText}]}>
        {hText}
      </Text>
      <Text style={[styles.desText, {color: colors.colors.descriptionText}]}>
        {dText}
      </Text>
    </View>
  );
};

export default ServiceHeader;

const styles = StyleSheet.create({
  headerContainer: {},
  headerText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  desText: {
    fontSize: Text_Size.Text_0,
    marginTop: 5,
  },
});
