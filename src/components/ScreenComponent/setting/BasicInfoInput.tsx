import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import AppFormField from '../../common/Form/AppFormField';
import AppSelect from '../../common/Form/AppSelect';
import SubmitButton from '../../common/Form/SubmitButton';
import AppForm from '../../common/Form/AppForm';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';
import ProfileHeader from '../profile/ProfileHeader';
import BottomSpacing from '../../UI/BottomSpacing';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const BasicInfoInput = ({
  handleSubmit,
  initialValues,
  validationSchema,
}: Props) => {
  const locationInput = [
    {
      title: 'Address Line 1',
      placeholder: 'Enter Address Line 1',
      name: 'addressLineOne',
    },
    {
      title: 'Address Line 2',
      placeholder: 'Enter Address Line 2',
      name: 'addressLineTwo',
    },
    {
      title: 'City',
      placeholder: 'Enter City',
      name: 'city',
    },
    {
      title: 'State or Province',
      placeholder: 'Enter State or Province ',
      name: 'state',
    },
    {
      title: 'Zip/ Postal/ Postcode',
      placeholder: 'Enter Zip/ Postal/ Postcode',
      name: 'postalCode',
    },
    {
      title: 'Country',
      placeholder: 'Enter Country',
      select: true,
      name: 'country',
    },
  ];
  const basicInfoInput = [
    {
      title: 'Name',
      placeholder: 'Enter name',
      name: 'name',
    },
    {
      title: 'Email',
      placeholder: 'Enter Email',
      name: 'email',
    },
    {
      title: 'Date of Birth',
      placeholder: 'Enter Date of Birth',
      name: 'dob',
    },
  ];

  const renderHeader = () => {
    return (
      <View style={styles.inputContainer}>
        <ProfileHeader />
        <View style={styles.nameContainer}>
          <HeaderText
            text="Location Information"
            textStyle={styles.textStyle}
          />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.nameContainer}>
            <HeaderText text="Basic Information" textStyle={styles.textStyle} />
          </View>
          <FlatList
            columnWrapperStyle={styles.flatList}
            data={basicInfoInput}
            horizontal={false}
            renderItem={({item}) => {
              return (
                <>
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'default'}
                    placeholder={item.placeholder}
                    textContentType={'none'}
                    name={item.name}
                    label={item.title}
                  />
                </>
              );
            }}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.nameContainer}>
          <HeaderText text="Change Password" textStyle={styles.textStyle} />
        </View>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'default'}
          icon={'lock'}
          secureTextEntry
          placeholder={'Enter Password'}
          textContentType={'none'}
          name={'password'}
          label={'Password'}
        />
        <View style={styles.footerContainer}>
          <SubmitButton title="Save" />
        </View>
        <BottomSpacing />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <FlatList
            columnWrapperStyle={styles.flatList}
            data={locationInput}
            horizontal={false}
            // showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <>
                  {!item.select && (
                    <View style={styles.inputContainer}>
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
                  )}
                  {item.select && (
                    <View style={styles.selectContainer}>
                      <AppSelect label={item.title} name={item.name} />
                    </View>
                  )}
                </>
              );
            }}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
          />
        </AppForm>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BasicInfoInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '1%',
  },
  inputContainer: {marginHorizontal: '5%', width: '90%'},
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  selectContainer: {width: '90%', marginHorizontal: '5%'},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: SCREEN_WIDTH <= 800 ? '5%' : '3%',
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
