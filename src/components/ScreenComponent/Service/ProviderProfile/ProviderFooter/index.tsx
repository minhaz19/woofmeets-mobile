import {StyleSheet, View} from 'react-native';
import React from 'react';
import BottomSpacing from '../../../../UI/BottomSpacing';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';

const ProviderFooter = () => {
  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      <ButtonCom
        title={'Hire Sitter'}
        textAlignment={btnStyles.textAlignment}
        containerStyle={btnStyles.containerStyleFullWidth}
        titleStyle={btnStyles.titleStyle}
        onSelect={handleSubmit}
      />
      <BottomSpacing />
    </View>
  );
};

export default ProviderFooter;

const styles = StyleSheet.create({
  container: {},
});
