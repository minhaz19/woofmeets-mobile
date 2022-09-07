import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import AppFormField from '../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  captionImage: {
    id: string;
    caption: string;
    uri: string;
  };
  setIsModalVisible: (arg1: boolean) => void;
}

const EditCaption = ({captionImage, setIsModalVisible}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const {colors} = useTheme();
  const {request, loading} = useApi(methods._put);
  const handleEdit = async (e: any) => {
    const formatCaption = {caption: e.caption};
    const editEndPoint = `/gallery/photo/update/${captionImage.id}`;
    const result = await request(editEndPoint, formatCaption);
    if (result.data.data) {
      setIsModalVisible(false);
    }
  };
  return (
    <View
      style={[styles.rootContainer, {backgroundColor: colors.backgroundColor}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}>
        <HeaderText
          text={'Add a caption to your photo'}
          textStyle={styles.headerText}
        />
        <View style={styles.imageContainer}>
          <Image source={{uri: captionImage.uri}} style={styles.image} />
        </View>
        <AppFormField
          name={'caption'}
          label={'Caption'}
          errors={errors}
          control={control}
        />
        <View style={styles.submitButton}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <HeaderText text={'Cancel'} textStyle={styles.cancelButton} />
          </TouchableOpacity>
          <SubmitButton
            title="Save Caption"
            onPress={handleEdit}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditCaption;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  headerText: {
    fontSize: Text_Size.Text_2,
    marginBottom: 6,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
  },
  submitButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    color: Colors.light.blue,
    paddingRight: 10,
    textDecorationLine: 'underline',
  },
});
