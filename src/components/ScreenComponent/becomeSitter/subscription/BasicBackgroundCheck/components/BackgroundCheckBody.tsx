import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {basicBGcheckData} from '../../../../../../utils/config/Data/basicBGcheckData';
import AppFormField from '../../../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import BottomSpacing from '../../../../../UI/BottomSpacing';
import SubmitButton from '../../../../../common/Form/SubmitButton';
import BgCheckImagePicker from './BgCheckImagePicker';
import DatePicker from 'react-native-date-picker';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
}
const BackgroundCheckBody = ({handleSubmit, loading}: Props) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {
    setValue,
    control,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.inputContainer}>
      <View>
        {basicBGcheckData.map((item, index) => {
          return (
            <View key={index}>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                placeholder={item.placeholder}
                textContentType={'none'}
                name={item.name}
                label={item.title}
                key={index}
                control={control}
                errors={errors}
                defaultValue={
                  item.name === 'dob' ? date.toLocaleDateString() : ''
                }
                editable={item.name === 'dob' ? false : true}
                onPressIn={() => item.name === 'dob' && setOpen(true)}
              />
              {item.name === 'dob' && (
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={_date => {
                    setOpen(false);
                    setDate(_date);
                    setValue(item.name, _date.toLocaleDateString());
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              )}
            </View>
          );
        })}
        <BgCheckImagePicker
          label="Upload your images"
          subTitle="Provide valide images to verify your background"
          name="imageGallery"
        />
        <SubmitButton title="Submit" onPress={handleSubmit} loading={loading} />
        <BottomSpacing />
      </View>
    </View>
  );
};

export default BackgroundCheckBody;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
  },
});
