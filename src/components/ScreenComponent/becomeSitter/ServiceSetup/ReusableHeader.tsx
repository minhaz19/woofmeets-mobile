import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';

interface props {
  itemId?: string;
  image?: any;
  description: string;
  name: string;
}

const ReusableHeader = ({name, description}: props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <HeaderText text={name} textStyle={styles.headerText} />
      <DescriptionText
        text={description}
        textStyle={{color: colors.descriptionText}}
      />
    </View>
  );
};

export default ReusableHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerText: {
    paddingBottom: 2,
    fontSize: Text_Size.Text_3,
  },
});
