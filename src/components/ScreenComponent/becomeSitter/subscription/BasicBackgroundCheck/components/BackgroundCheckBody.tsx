import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {basicBGcheckData} from '../../../../../../utils/config/Data/basicBGcheckData';
import AppFormField from '../../../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import BottomSpacing from '../../../../../UI/BottomSpacing';
import SubmitButton from '../../../../../common/Form/SubmitButton';
import BgCheckImagePicker from './BgCheckImagePicker';
import DatePicker from 'react-native-date-picker';
import TitleText from '../../../../../common/text/TitleText';
import Text_Size from '../../../../../../constants/textScaling';
import Colors from '../../../../../../constants/Colors';
import {useTheme} from '../../../../../../constants/theme/hooks/useTheme';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
}
const BackgroundCheckBody = ({handleSubmit, loading}: Props) => {
  const {isDarkMode} = useTheme();
  const [date, setDate] = useState<null | Date>(null);
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
              {item.name === 'dob' ? (
                <>
                  <TitleText textStyle={styles.label} text={item.title} />

                  <TouchableOpacity
                    style={[
                      styles.container,
                      {
                        borderColor: isDarkMode ? Colors.gray : Colors.border,
                      },
                    ]}
                    onPress={() => item.name === 'dob' && setOpen(true)}>
                    <TitleText
                      textStyle={{
                        color: date ? Colors.text : Colors.gray,
                      }}
                      text={
                        date !== null
                          ? new Date(date).toLocaleDateString()
                          : 'Date of birth'
                      }
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={new Date()}
                    onConfirm={_date => {
                      setOpen(false);
                      setDate(_date);
                      setValue(item.name, _date.toLocaleDateString());
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </>
              ) : (
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
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
