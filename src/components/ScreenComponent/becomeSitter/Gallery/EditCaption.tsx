import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import AppFormField from '../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';

interface Props {
  captionImage: string;
}

const EditCaption = ({captionImage}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const handleRates = () => {};
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}>
        <HeaderText
          text={'Add a caption to your photo'}
          textStyle={styles.headerText}
        />
        <View style={styles.imageContainer}>
          <Image source={{uri: captionImage}} style={styles.image} />
        </View>
        <AppFormField
          name={'caption'}
          label={'Caption'}
          errors={errors}
          control={control}
        />
        <View style={styles.submitButton}>
          <HeaderText text={'Cancel'} textStyle={styles.cancelButton} />
          <SubmitButton title="Save Caption" onPress={handleRates} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditCaption;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_2,
    marginBottom: 6,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: '45%',
    width: '100%',
  },
  submitButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    color: Colors.light.blue,
    paddingRight: 6,
  },
});
