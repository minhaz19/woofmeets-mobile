import {StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import TitleText from '../../../../common/text/TitleText';
import {careInfoChecks} from '../../../../../utils/config/Data/AddPetData';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../../constants/textScaling';
import AppFormField from '../../../../common/Form/AppFormField';
interface Props {
  errors: any;
  control: any;
  setValue: any;
  getValues: any;
}
const AdditionalCareInfoChecks = ({
  errors,
  control,
  setValue,
  getValues,
}: Props) => {
  const [, setRender] = useState({});
  const data = getValues();
  return (
    <View>
      <View>
        <TitleText textStyle={styles.header} text={careInfoChecks.header!} />
        <TitleText
          textStyle={styles.subTitle}
          text={careInfoChecks.subTitle!}
        />
      </View>
      {careInfoChecks.careInfo?.map((item, index) => (
        <View key={index} style={styles.radioContainer}>
          <TitleText textStyle={styles.title} text={item.title} />

          <View style={styles.additionalTypeContainer}>
            {item.radio.map((type, i) => (
              <AppCheckboxField
                title={type.type}
                radio
                key={i}
                typeValue={type.value}
                name={item.name}
                errors={errors}
                control={control}
                onPress={() => {
                  setValue(item.name, type.value, {shouldValidate: true});
                  setRender(Math.random());
                }}
              />
            ))}
          </View>
          {item.input && data[item.name] === 'Custom' && (
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={item.input.placeholder}
              textContentType={'none'}
              name={item.input.name!}
              label={item.input.title!}
              multiline
              numberOfLines={item.input.numberOfLines}
              errors={errors}
              control={control}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default memo(AdditionalCareInfoChecks);

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
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    marginVertical: 10,
  },
});
