import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import Colors from '../../../../constants/Colors';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import TitleText from '../../../common/text/TitleText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';

interface Props {
  captionImage: {
    id: string;
    caption: string;
    uri: string;
  };
  setIsModalVisible: (arg1: boolean) => void;
}

const EditCaption = ({captionImage, setIsModalVisible}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useFormContext();
  const {request, loading} = useApi(methods._put);
  const handleEdit = async (e: any) => {
    const formatCaption = {caption: e.caption};
    const editEndPoint = `/gallery/photo/update/${captionImage.id}`;
    const result = await request(editEndPoint, formatCaption);
    if (result.data?.data) {
      setIsModalVisible(false);
    }
  };
  return (
    <>
      <View style={styles.CaptionBody}>
        <View>
          <Image
            source={{uri: captionImage?.uri}}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.inputBody}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name={'caption'}
              label={'Enter your caption'}
              placeholder="write a caption"
              control={control}
              errors={errors}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.cancelBtn,
            {backgroundColor: Colors.primary},
          ]}
          onPress={() => setIsModalVisible(false)}>
          <TitleText text="Cancel" textStyle={styles.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveBtn,
            {backgroundColor: Colors.primary},
          ]}
          onPress={handleSubmit(handleEdit)}>
          <TitleText
            text={loading ? 'Loading...' : 'Save'}
            textStyle={styles.text}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditCaption;

const styles = StyleSheet.create({
  btnContainer: {flexDirection: 'row'},
  cancelBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.borderColor,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.borderColor,
  },
  text: {color: 'white', textAlign: 'center'},
  CaptionBody: {width: '100%'},
  image: {
    flex: 0,
    width: '100%',
    height: 200,
  },
  inputBody: {
    padding: SCREEN_WIDTH > 800 ? 20 : 10,
  },
});
