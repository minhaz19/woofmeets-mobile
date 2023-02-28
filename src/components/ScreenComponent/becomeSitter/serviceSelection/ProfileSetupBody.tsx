import {View, StyleSheet} from 'react-native';
import React from 'react';
import BasicInfoInput from '../../setting/BasicInfoInput';
import ContactInput from '../../setting/ContactInput';
import SitterDetailsInput from '../details/SitterDetailsInput';
import BottomSpacing from '../../../UI/BottomSpacing';
import SubmitButton from '../../../common/Form/SubmitButton';
interface Props {
  handleSubmit: (arg: any) => void;
  isLoading: boolean;
}
const ProfileSetupBody = ({handleSubmit, isLoading}: Props) => {
  return (
    <View style={styles.container}>
      <BasicInfoInput profileSetup={true} />
      <ContactInput profileSetup={true} />
      <View style={styles.footerContainer}>
        <SitterDetailsInput profileSetup={true} attributes={undefined} />
        <View style={{marginTop: 20}} />
        <SubmitButton
          title="Save and Continue"
          onPress={handleSubmit}
          loading={isLoading}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default ProfileSetupBody;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  footerContainer: {
    paddingVertical: '6%',
  },
});
