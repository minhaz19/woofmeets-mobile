/* eslint-disable react-hooks/rules-of-hooks */
import {StyleSheet, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import TitleText from '../../../../common/text/TitleText';
import {careInfoChecks} from '../../../../../utils/config/Data/AddPetData';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../../constants/textScaling';
interface Props {
  active8: number | null;
  active9: number | null;
  active10: number | null;
  active11: number | null;
  handleActiveCheck: (arg: number, arg1: number) => void;
  errors: any;
  control: any;
  setValue: any;
}
const AdditionalCareInfoChecks = ({
  active8,
  active9,
  active10,
  active11,
  handleActiveCheck,
  errors,
  control,
  setValue,
}: Props) => {
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
            {item.radio.map((type, key) => (
              <AppCheckboxField
                title={type.type}
                radio
                key={key}
                active={
                  (type.id === active8 ? true : false) ||
                  (type.id === active9 ? true : false) ||
                  (type.id === active10 ? true : false) ||
                  (type.id === active11 ? true : false)
                }
                name={item.name}
                errors={errors}
                control={control}
                onPress={useCallback(() => {
                  handleActiveCheck(item.id, type.id);
                  setValue(item.name, type.id);
                }, [type.id])}
              />
            ))}
          </View>
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
    marginRight: 10,
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
