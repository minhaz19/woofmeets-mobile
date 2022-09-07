import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppButton from '../../../../common/AppButton';
import {AddPet} from '../../../../../assets/svgs/SVG_LOGOS';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';

interface Props {
  onPress: () => void;
}
const MyPetHome = ({onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <AddPet width={300} height={300} />

      <View style={styles.btnStyle}>
        <AppButton title="Add Pet" onPress={onPress} />
      </View>
    </View>
  );
};

export default MyPetHome;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnStyle: {marginTop: 20},
});
