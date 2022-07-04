import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}
const AddPetBody = ({handleSubmit, initialValues, validationSchema}: Props) => {
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <View>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'default'}
            placeholder={'Enter your email'}
            textContentType={'none'}
            name={'email'}
            label={'Email/Phone Number'}
            multiline
            numberOfLines={10}
          />
        </View>
      </AppForm>
    </View>
  );
};

export default AddPetBody;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  otpContainer: {
    marginTop: 20,
  },
  resendBtn: {
    marginTop: 30,
  },
  switchContainer: {
    marginVertical: 20,
  },
});
