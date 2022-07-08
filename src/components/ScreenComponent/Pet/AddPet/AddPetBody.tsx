import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';
import Text_Size from '../../../../constants/textScaling';
import SubmitButton from '../../../common/Form/SubmitButton';
import {addPetInputs} from '../../../../utils/config/Data/AddPetData';
import AddPetImage from './AddPetImage';
import AppSelect from '../../../common/Form/AppSelect';
import PhotoGallery from './PhotoGallery';
import AppCheckboxField from '../../../common/Form/AppCheckboxField';
import useHandleCheck from '../../../../utils/helpers/usehandleActiveCheck';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const AddPetBody = ({handleSubmit, initialValues, validationSchema}: Props) => {
  const {
    handleActiveCheck,
    active0,
    active1,
    active2,
    active3,
    active4,
    active5,
    active6,
    active7,
    active8,
    active9,
    active10,
    active11,
    active12,
  } = useHandleCheck();

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {/* Image Picker */}
        <View>
          <AddPetImage name="petImage" />
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.header}>{addPetInputs[0].header}</Text>
            <Text style={styles.topSubTitle}>{addPetInputs[0].subTitle}</Text>
            <Text style={styles.title}>{addPetInputs[0].title}</Text>
            <View style={styles.petType}>
              {addPetInputs[0].pet!.map((item, index) => (
                // <>
                <AppCheckboxField
                  title={item.type}
                  key={index}
                  typeKey={item.id}
                  square
                  active={active0[item.id]}
                  // onBlur={() => setFieldTouched(addPetInputs[0].name!)}
                  onPress={() =>
                    handleActiveCheck(addPetInputs[0].id!, item.id)
                  }
                  name={addPetInputs[0].name!}
                />
                // </>
              ))}
              {/* <ErrorMessage error={['petType']} visible={['petType']} /> */}
            </View>
          </View>
          <View style={styles.flatList}>
            <FlatList
              columnWrapperStyle={styles.flatList}
              data={addPetInputs[1].inputs}
              scrollEnabled={false}
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
                        flex={item.flex}
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
            {/* {addPetInputs[1].inputs!.map((item, index) => (
              <View key={index}>
                {!item.select && (
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
                )}
                {item.select && (
                  <View style={styles.selectContainer}>
                    <AppSelect label={item.title} name={item.name} />
                  </View>
                )}
              </View>
            ))} */}
          </View>
          <View>
            {addPetInputs[2].additionalDetails!.map((item, index) => (
              <View key={index} style={styles.radioContainer}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.additionalTypeContainer}>
                  {item.radio.map((type, key) => (
                    <View key={key} style={styles.additionalType}>
                      <AppCheckboxField
                        title={type.type}
                        radio
                        key={index}
                        typeKey={type.id}
                        active={
                          (item.id === 101 && active1[type.id]) ||
                          (item.id === 102 && active2[type.id]) ||
                          (item.id === 103 && active3[type.id]) ||
                          (item.id === 104 && active4[type.id]) ||
                          (item.id === 105 && active5[type.id]) ||
                          (item.id === 106 && active6[type.id]) ||
                          (item.id === 107 && active7[type.id])
                        }
                        onPress={() => handleActiveCheck(item.id, type.id)}
                        name={item.name}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={addPetInputs[3].placeholder}
              textContentType={'none'}
              name={addPetInputs[3].name!}
              label={addPetInputs[3].title!}
              multiline
              numberOfLines={addPetInputs[3].numberOfLines}
            />
          </View>
          <View>
            <View>
              <Text style={styles.header}>{addPetInputs[4].header}</Text>
              <Text style={styles.subTitle}>{addPetInputs[4].subTitle}</Text>
            </View>
            {addPetInputs[4].careInfo?.map((item, index) => (
              <View key={index} style={styles.radioContainer}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.additionalTypeContainer}>
                  {item.radio.map((type, key) => (
                    <View key={key} style={styles.additionalType}>
                      <AppCheckboxField
                        title={type.type}
                        radio
                        key={index}
                        typeKey={type.id}
                        active={
                          (item.id === 108 && active8[type.id]) ||
                          (item.id === 109 && active9[type.id]) ||
                          (item.id === 110 && active10[type.id]) ||
                          (item.id === 111 && active11[type.id])
                        }
                        onPress={() => handleActiveCheck(item.id, type.id)}
                        name={item.name}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={addPetInputs[5].placeholder}
              textContentType={'none'}
              name={addPetInputs[5].name!}
              label={addPetInputs[5].title!}
              multiline
              numberOfLines={addPetInputs[5].numberOfLines}
            />
          </View>
          <View>
            <Text style={styles.title}>{addPetInputs[6].title}</Text>
            <View style={styles.petType}>
              {addPetInputs[6].pet!.map((item, index) => (
                <AppCheckboxField
                  title={item.type}
                  key={index}
                  square
                  typeKey={item.id}
                  active={addPetInputs[6].id === 112 && active12[item.id]}
                  onPress={() => handleActiveCheck(112, item.id)}
                  name={addPetInputs[6].name!}
                />
              ))}
            </View>
          </View>
          <View>
            {addPetInputs[7].inputs!.map((item, index) => (
              <AppFormField
                key={index}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                placeholder={item.placeholder}
                textContentType={'none'}
                name={item.name}
                label={item.title}
                subTitle={item.subTitle}
                multiline={item.numberOfLines ? true : false}
                numberOfLines={item.numberOfLines! ? item.numberOfLines! : 0}
              />
            ))}
          </View>
          <View>
            <PhotoGallery
              label="Photo Gallery"
              subTitle="Show off your pet through image gallery"
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

export default AddPetBody;

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
});
