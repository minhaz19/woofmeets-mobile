/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {ReactElement} from 'react';
import Colors from '../../../../../../../../constants/Colors';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';
import ShortText from '../../../../../../../common/text/ShortText';
import {SvgProps} from 'react-native-svg';
import Text_Size from '../../../../../../../../constants/textScaling';
interface Props {
  item: {
    id: number;
    Icon: (props: SvgProps) => ReactElement<any, any>;
    weight: string;
    weightType: string;
  };
}
const PetWeightType = ({item}: Props) => {
  const {isDarkMode} = useTheme();
  return (
    <TouchableOpacity style={styles.petTypeTextContainer}>
      <item.Icon fill={Colors.black} />
      <ShortText
        textStyle={{
          fontSize: Text_Size.Text_0,
          fontWeight: '600',
          color: isDarkMode ? Colors.background : Colors.black,
        }}
        text={item.weight}
      />
      <ShortText text={item.weightType} />
    </TouchableOpacity>
  );
};

export default PetWeightType;

const styles = StyleSheet.create({
  petTypeTextContainer: {marginVertical: 20, alignItems: 'center'},
});
