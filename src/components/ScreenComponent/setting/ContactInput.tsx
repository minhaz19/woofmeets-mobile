import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppFormField from '../../common/Form/AppFormField';
import SubmitButton from '../../common/Form/SubmitButton';
import AppForm from '../../common/Form/AppForm';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const ContactInput = ({
  handleSubmit,
  initialValues,
  validationSchema,
}: Props) => {
  const contactInput = [
    {
      title: 'Emergency Contact Name',
      placeholder: 'Enter Emergency Contact Name',
      name: 'emergencyContactName',
    },
    {
      title: 'Email',
      placeholder: 'Enter Email',
      name: 'email',
    },
    {
      title: 'Phone number',
      placeholder: 'Enter Phone number',
      name: 'emergencyPhone',
    },
  ];
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <View style={styles.inputContainer}>
          <View>
            <View style={styles.nameContainer}>
              <HeaderText
                text="Add your phone number"
                textStyle={styles.textStyle}
              />
            </View>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={'Enter Phone number'}
              textContentType={'none'}
              name={'phone'}
              label={'Phone'}
              textInputStyle={styles.textInputStyle}
            />
            <View style={styles.nameContainer}>
              <HeaderText
                text="Add Emergency Contact"
                textStyle={styles.textStyle}
              />
            </View>
            {contactInput.map((item, index) => {
              return (
                <View key={index}>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'default'}
                    placeholder={item.placeholder}
                    textContentType={'none'}
                    name={item.name}
                    label={item.title}
                    textInputStyle={styles.textInputStyle}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.footerContainer}>
            <SubmitButton title="Save" />
          </View>
        </View>
      </AppForm>
    </View>
  );
};

export default ContactInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  inputContainer: {marginHorizontal: 20},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingVertical: '6%',
  },
});
