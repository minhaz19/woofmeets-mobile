import {StyleSheet, View} from 'react-native';
import React from 'react';
import BottomSpacing from '../../../../UI/BottomSpacing';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../../../store/store';

const ProviderFooter = () => {
  const navigation = useNavigation<any>();
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const handleSubmit = () => {
    if (isLoggedIn) {
      navigation.navigate('Appointment', {appointmentType: 'create'});
    } else {
      navigation.navigate('SignUp');
    }
  };
  return (
    <View style={styles.container}>
      <ButtonCom
        title={'Hire This Sitter'}
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
  container: {
    marginTop: 20,
  },
});
