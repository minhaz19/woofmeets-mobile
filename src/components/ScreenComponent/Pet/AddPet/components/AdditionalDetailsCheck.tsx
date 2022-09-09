import {StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import {additionalDetailChecks} from '../../../../../utils/config/Data/AddPetData';
import TitleText from '../../../../common/text/TitleText';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../../constants/textScaling';
import AppFormField from '../../../../common/Form/AppFormField';

interface Props {
  errors: any;
  control: any;
  setValue: any;
  getValues?: any;
}
const AdditionalDetailsCheck = ({
  errors,
  control,
  setValue,
  getValues,
}: Props) => {
  const [, setRender] = useState({});
  const data = getValues();
  return (
    <View>
      {additionalDetailChecks.map((item, index) => {
        return (
          <View key={index} style={styles.radioContainer}>
            <TitleText textStyle={styles.title} text={item.title} />

            <View style={styles.additionalTypeContainer}>
              {item.radio.map((type, key) => (
                <AppCheckboxField
                  title={type.type}
                  radio
                  key={key}
                  typeValue={type.value}
                  errors={errors}
                  control={control}
                  onPress={() => {
                    setValue(item.name, type.value);
                    setRender(Math.random());
                  }}
                  name={item.name}
                />
              ))}
            </View>
            {data[item.name] === 'DEPENDS' && (
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                placeholder={item?.input?.placeholder}
                textContentType={'none'}
                name={item.input?.name!}
                label={item.input?.title!}
                multiline
                numberOfLines={item.input?.numberOfLines}
                errors={errors}
                control={control}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default memo(AdditionalDetailsCheck);

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  additionalTypeContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  radioContainer: {
    // marginRight: 10,
  },
});
