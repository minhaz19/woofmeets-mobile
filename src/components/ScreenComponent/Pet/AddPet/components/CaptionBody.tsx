import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import AppFormField from '../../../../common/Form/AppFormField';
interface Props {
  selectedImgInfo: any;
  name: string;
  control: any;
  errors: any;
}
const CaptionBody = ({selectedImgInfo, name, control, errors}: Props) => {
  return (
    <View>
      <Image
        source={{uri: selectedImgInfo?.uri}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.inputBody}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder={'Write caption'}
          name={name}
          label={'Enter your caption'}
          control={control}
          errors={errors}
          auth
        />
      </View>
    </View>
  );
};

export default CaptionBody;

const styles = StyleSheet.create({
  image: {
    flex: 0,
    width: '100%',
    height: 200,
  },
  inputBody: {
    padding: 10,
  },
});
