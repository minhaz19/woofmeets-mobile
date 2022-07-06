import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';
import AppCheckbox from '../../../common/Form/AppCheckbox';
import Text_Size from '../../../../constants/textScaling';
import SubmitButton from '../../../common/Form/SubmitButton';
import {addPetInputs} from '../../../../utils/config/Data/AddPetData';
import AddPetImage from './AddPetImage';
import AppSelect from '../../../common/Form/AppSelect';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const AddPetBody = ({handleSubmit, initialValues, validationSchema}: Props) => {
  const [active0, setActive0] = useState<any | {}>({});
  const [active1, setActive1] = useState<any | {}>({});
  const [active2, setActive2] = useState<any | {}>({});
  const [active3, setActive3] = useState<any | {}>({});
  const [active4, setActive4] = useState<any | {}>({});
  const [active5, setActive5] = useState<any | {}>({});
  const [active6, setActive6] = useState<any | {}>({});
  const [active7, setActive7] = useState<any | {}>({});
  const [active8, setActive8] = useState<any | {}>({});
  const [active9, setActive9] = useState<any | {}>({});
  const [active10, setActive10] = useState<any | {}>({});
  const [active11, setActive11] = useState<any | {}>({});
  const [active12, setActive12] = useState<any | {}>({});

  const handleActiveCheck = (parentId: number, key: number) => {
    parentId === 100 && setActive0({[key]: true});
    parentId === 101 && setActive1({[key]: true});
    parentId === 102 && setActive2({[key]: true});
    parentId === 103 && setActive3({[key]: true});
    parentId === 104 && setActive4({[key]: true});
    parentId === 105 && setActive5({[key]: true});
    parentId === 106 && setActive6({[key]: true});
    parentId === 107 && setActive7({[key]: true});
    parentId === 108 && setActive8({[key]: true});
    parentId === 109 && setActive9({[key]: true});
    parentId === 110 && setActive10({[key]: true});
    parentId === 111 && setActive11({[key]: true});
    parentId === 112 && setActive12({[key]: true});
  };

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {/* Image Picker */}
        <View>
          <AddPetImage />
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text>{addPetInputs[0].title}</Text>
            <View style={styles.petType}>
              {addPetInputs[0].pet!.map((item, index) => (
                <AppCheckbox
                  title={item.type}
                  key={index}
                  square
                  // @ts-ignore
                  // active={index === fitleredIndex ? true : false}
                  active={active0[item.id]}
                  onPress={() =>
                    handleActiveCheck(addPetInputs[0].id!, item.id)
                  }
                />
              ))}
            </View>
          </View>
          <View>
            <FlatList
              columnWrapperStyle={styles.flatList}
              data={addPetInputs[1].inputs}
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
          </View>
          <View>
            {addPetInputs[2].additionalDetails!.map((item, index) => (
              <View style={styles.radioContainer}>
                <Text key={index}>{item.title}</Text>

                <View style={styles.additionalTypeContainer}>
                  {item.radio.map((type, key) => (
                    <View key={key} style={styles.additionalType}>
                      <AppCheckbox
                        title={type.type}
                        radio
                        // @ts-ignore
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
                <Text>{item.title}</Text>

                <View style={styles.additionalTypeContainer}>
                  {item.radio.map((type, key) => (
                    <View key={key} style={styles.additionalType}>
                      <AppCheckbox
                        title={type.type}
                        radio
                        active={
                          (item.id === 108 && active8[type.id]) ||
                          (item.id === 109 && active9[type.id]) ||
                          (item.id === 110 && active10[type.id]) ||
                          (item.id === 111 && active11[type.id])
                        }
                        // active={key === fitleredIndex2 ? true : false}
                        onPress={() => handleActiveCheck(item.id, type.id)}
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
            <Text>{addPetInputs[6].title}</Text>
            <View style={styles.petType}>
              {addPetInputs[6].pet!.map((item, index) => (
                <AppCheckbox
                  title={item.type}
                  key={index}
                  square
                  active={addPetInputs[6].id === 112 && active12[item.id]}
                  // active={key === fitleredIndex2 ? true : false}
                  onPress={() => handleActiveCheck(112, item.id)}
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
