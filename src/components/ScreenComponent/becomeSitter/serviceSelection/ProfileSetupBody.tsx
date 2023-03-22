import {View, StyleSheet} from 'react-native';
import React from 'react';
import BasicInfoInput from '../../setting/BasicInfoInput';
import ContactInput from '../../setting/ContactInput';
import SitterDetailsInput from '../details/SitterDetailsInput';
import BottomSpacing from '../../../UI/BottomSpacing';
import SubmitButton from '../../../common/Form/SubmitButton';
import Divider from '../../../UI/Divider';
interface Props {
  handleSubmit: (arg: any) => void;
  isLoading: boolean;
}
const ProfileSetupBody = ({handleSubmit, isLoading}: Props) => {
  return (
    <View style={styles.container}>
      <BasicInfoInput profileSetup={true} />
      <ContactInput profileSetup={true} />
      <SitterDetailsInput profileSetup={true} attributes={undefined} />
      <Divider />
      <SubmitButton
        title="Save and Continue"
        onPress={handleSubmit}
        loading={isLoading}
      />
      <BottomSpacing />
    </View>
  );
};

export default ProfileSetupBody;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
});
