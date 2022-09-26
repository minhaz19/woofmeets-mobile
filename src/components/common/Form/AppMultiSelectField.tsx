import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../text/TitleText';
import {Controller} from 'react-hook-form';
import AppMultiSelect from './AppMultiSelect';
import ErrorMessage from './ErrorMessage';
import Text_Size from '../../../constants/textScaling';
interface Props {
  name: string;
  control: any;
  setValue: any;
  data: any;
  title: string;
  placeholder: string;
  search?: boolean;
}
const AppMultiSelectField = ({
  title,
  name,
  control,
  setValue,
  data,
  placeholder,
  search,
}: Props) => {
  return (
    <View>
      <View>
        <TitleText text={title} textStyle={styles.text} />
      </View>

      <Controller
        control={control}
        render={({field: {value}, fieldState: {error}}) => {
          return (
            <>
              <AppMultiSelect
                value={value?.map((item: any) => item.id)}
                data={data}
                search={search}
                placeholder={placeholder}
                onChange={selectedItem => {
                  const modBreeds = selectedItem?.map((item: number) => {
                    return {id: item};
                  });
                  setValue(name, modBreeds, {
                    shouldValidate: error?.message ? true : false,
                  });
                }}
              />
              <View style={styles.errorContainer}>
                <ErrorMessage error={error?.message} />
              </View>
            </>
          );
        }}
        name={name}
      />
    </View>
  );
};

export default AppMultiSelectField;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
  },
  errorContainer: {
    marginTop: -3,
    marginBottom: 4,
  },
});
