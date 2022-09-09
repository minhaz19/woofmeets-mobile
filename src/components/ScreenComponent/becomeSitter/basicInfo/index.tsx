import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import DescriptionText from '../../../common/text/DescriptionText';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import ImageUploadModal from '../../../UI/modal/ImageUploadModal';
import {useFormContext} from 'react-hook-form';

interface Props {
  handleSubmit: (value: any) => void;

  onPress?: () => void;
}
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
];

const BasicInfoSitterInput = ({handleSubmit}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const uploadImage = () => {};
  const [petImage, setPetImage] = useState();
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const renderHeader = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.nameContainer}>
          <HeaderText text="Add your address" textStyle={styles.textStyle} />
          <DescriptionText text="Your address is only shown to your client when their pet stays in your home." />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.inputContainer}>
        <ImageUploadModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setIsImageLoading={setIsImageLoading}
          uploadImage={uploadImage}
          setPetImage={setPetImage}
        />
        <View>
          <View style={styles.nameContainer}>
            <HeaderText
              text="Your Email Address"
              textStyle={styles.textStyle}
            />
          </View>
        </View>
        <View style={styles.textPhotoContainer}>
          <View style={styles.photoDescription}>
            <HeaderText text="Profile Photo" textStyle={styles.textStyle} />
            <TitleText text="This is the first photo pet owners will see . We recommend using a well _ lit, clear photo of your face ( without sunglass )." />
          </View>
          <Image
            source={{
              uri: petImage ? petImage : 'https://picsum.photos/200/300',
            }}
            style={styles.imageStyle}
          />
        </View>
        {isImageLoading ? (
          <ActivityIndicator style={styles.uploadButtonContainer} />
        ) : (
          <TouchableOpacity
            style={styles.uploadButtonContainer}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}>
            <HeaderText text="Upload" textStyle={styles.textStylePrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.textEmailContainer}>
          <TitleText text="Email - tanvir@algosolver.com" />
          <TitleText
            text=" (change)"
            textStyle={styles.textStylePrimaryUnderline}
          />
        </View>
        <View style={styles.nameContainer2}>
          <HeaderText text="Age Verification" textStyle={styles.textStyle2} />
          <TitleText text="We won't share or display this on your profile ." />
        </View>
        <View style={styles.footerContainer}>
          <SubmitButton title="Save" onPress={handleSubmit} />
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          columnWrapperStyle={styles.flatList}
          data={locationInput}
          horizontal={false}
          // showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <>
                {
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
                      errors={errors}
                      control={control}
                    />
                  </View>
                }
              </>
            );
          }}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
        {/* </AppForm> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BasicInfoSitterInput;

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
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  nameContainer2: {
    paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  textStyle2: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  footerContainer: {
    paddingVertical: '10%',
  },
  textEmailContainer: {
    flexDirection: 'row',
  },
  textPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoDescription: {
    width: '60%',
  },
  textStylePrimaryUnderline: {
    color: Colors.primary,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  textStylePrimary: {
    color: Colors.primary,
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 80 : SCREEN_WIDTH <= 600 ? 100 : 120,
    width: SCREEN_WIDTH <= 380 ? 80 : SCREEN_WIDTH <= 600 ? 100 : 120,
  },
  uploadButtonContainer: {
    height:
      SCREEN_HEIGHT > 400 && SCREEN_HEIGHT <= 800
        ? SCREEN_HEIGHT * 0.06
        : SCREEN_HEIGHT <= 400
        ? SCREEN_HEIGHT * 0.04
        : 45,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderRadius: 50,
    marginVertical: 10,
  },
});
