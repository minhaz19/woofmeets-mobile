import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';
import AppCheckbox from '../../../common/Form/AppCheckbox';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}
const AddPetBody = ({handleSubmit, initialValues, validationSchema}: Props) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isImageLoading, setIsImageLoading] = useState(false);
  // const [petImage, setPetImage] = useState();
  // const uploadImage = (e: any) => {
  //   console.log('upload', e);
  // };
  // console.log('pet iamge', petImage);
  const addPetInputs = [
    {
      title: 'What is pet your pet?',
      pet: [
        {
          type: 'Dog',
        },
        {
          type: 'Cat',
        },
        {
          type: 'Others',
        },
      ],
    },
    {
      inputs: [
        {title: 'Name', placeholder: 'Enter Pet Name', name: 'name'},
        {title: 'Weight (Ibs)', placeholder: 'Enter Weight', name: 'weight'},
        {
          title: 'Age (Yr)',
          placeholder: 'Enter Age in year',
          flex: 0.5,
          name: 'ageYr',
        },
        {title: 'Age (Mo)', placeholder: 'Enter ', name: 'name', flex: 0.5},
        {
          title: 'Select Gender',
          placeholder: 'Enter Pet Name',
          select: true,
          name: 'ageMo',
        },
        {
          title: 'Breeds',
          placeholder: 'Enter All Breeds that apply, if you are cat',
          name: 'breeds',
        },
      ],
    },
    {
      additionalDetails: [
        {
          title: 'Microchipped?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
          ],
        },
        {
          title: 'Spayed/Neutered?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
          ],
        },
        {
          title: 'House Trained?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
            {
              type: 'Unsure',
            },
          ],
        },
        {
          title: 'Friendly With Children?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
            {
              type: 'Unsure',
            },
            {
              type: 'Depends',
            },
          ],
        },
        {
          title: 'Friendly With Children?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
            {
              type: 'Unsure',
            },
            {
              type: 'Depends',
            },
          ],
        },
        {
          title: 'Friendly With Dogs?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
            {
              type: 'Unsure',
            },
            {
              type: 'Depends',
            },
          ],
        },
        {
          title: 'Friendly With Cats?',
          radio: [
            {
              type: 'Yes',
            },
            {
              type: 'No',
            },
            {
              type: 'Unsure',
            },
            {
              type: 'Depends',
            },
          ],
        },
      ],
    },
    {
      title: 'About Your Pet',
      placeholder: 'Add a description of your pet',
      name: 'petDescription',
      numberOfLines: 20,
    },
  ];
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {/* Image Picker */}
        {/* <ImageUploadModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setIsImageLoading={setIsImageLoading}
          uploadImage={uploadImage}
          setPetImage={setPetImage}
        /> */}
        <View style={styles.inputContainer}>
          {/* Pet Type */}
          <View>
            <Text>{addPetInputs[0].title}</Text>
            <View style={styles.petType}>
              {addPetInputs[0].pet.map((item, index) => (
                <AppCheckbox title={item.type} key={index} square />
              ))}
            </View>
          </View>
          <View>
            <FlatList
              columnWrapperStyle={styles.flatList}
              data={addPetInputs[1].inputs}
              horizontal={false}
              renderItem={({item}) => (
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
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
            {addPetInputs[2].additionalDetails?.map((item, index) => (
              <View style={styles.radioContainer}>
                <Text key={index}>{item.title}</Text>

                <View style={styles.additionalTypeContainer}>
                  {item.radio.map((type, key) => (
                    <View key={key} style={styles.additionalType}>
                      <AppCheckbox title={type.type} radio />
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
              name={addPetInputs[3].name}
              label={addPetInputs[3].title}
              multiline
              numberOfLines={addPetInputs[3].numberOfLines}
            />
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
    marginRight: 30,
  },
  radioContainer: {
    marginRight: 10,
  },
});
