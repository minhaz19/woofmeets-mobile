import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import AppFormField from '../../common/Form/AppFormField';
import AppSelect from '../../common/Form/AppSelect';
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
                text="Location Information"
                textStyle={styles.textStyle}
              />
            </View>
            <FlatList
              columnWrapperStyle={styles.flatList}
              data={locationInput}
              horizontal={false}
              renderItem={({item}) => {
                return (
                  <>
                    {!item.select && (
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
            />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <HeaderText
                text="Basic Information"
                textStyle={styles.textStyle}
              />
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
                      flex={item.flex}
                    />
                  </>
                );
              }}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
            <SubmitButton title="Add Pet" />
          </View>
        </View>
      </AppForm>
    </View>
  );
};

export default BasicInfoInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  topHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  topSubTitle: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 14,
  },
  inputContainer: {marginHorizontal: 20},
  petType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  additionalTypeContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'flex-start',
  },
  additionalType: {
    marginRight: 20,
  },
  radioContainer: {
    marginRight: 10,
  },
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    marginVertical: 10,
  },
  selectContainer: {width: '100%'},
  textInputStyle: {
  }
});
