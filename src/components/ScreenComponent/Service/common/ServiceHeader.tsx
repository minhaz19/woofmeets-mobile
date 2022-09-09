/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';

interface Props {
  hText: string;
  dText: string;
}

const ServiceHeader: FC<Props> = ({hText, dText}) => {
  const colors = useTheme();
  return (
    <View style={styles.headerContainer}>
      <HeaderText text={hText} />
      <DescriptionText text={dText} textStyle={styles.desText} />
    </View>
  );
};

export default ServiceHeader;

const styles = StyleSheet.create({
  headerContainer: {marginTop: 30},
  headerText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  desText: {
    fontSize: Text_Size.Text_0,
    marginTop: 10,
  },
});
