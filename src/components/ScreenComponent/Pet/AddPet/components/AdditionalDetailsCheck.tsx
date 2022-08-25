import {StyleSheet, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {additionalDetailChecks} from '../../../../../utils/config/Data/AddPetData';
import TitleText from '../../../../common/text/TitleText';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../../constants/textScaling';

interface Props {
  active1: number | null;
  active2: number | null;
  active3: number | null;
  active4: number | null;
  active5: number | null;
  active6: number | null;
  active7: number | null;
  handleActiveCheck: (arg: number, arg1: number) => void;
  errors: any;
  control: any;
  setValue: any;
}
const AdditionalDetailsCheck = ({
  active1,
  active2,
  active3,
  active4,
  active5,
  active6,
  active7,
  handleActiveCheck,
  errors,
  control,
  setValue,
}: Props) => {

  return (
    <View>
      {additionalDetailChecks.map((item, index) => (
        <View key={index} style={styles.radioContainer}>
          <TitleText textStyle={styles.title} text={item.title} />

          <View style={styles.additionalTypeContainer}>
            {item.radio.map((type, key) => (
              <AppCheckboxField
                title={type.type}
                radio
                key={key}
                active={
                  (type.id === active1 ? true : false) ||
                  (type.id === active2 ? true : false) ||
                  (type.id === active3 ? true : false) ||
                  (type.id === active4 ? true : false) ||
                  (type.id === active5 ? true : false) ||
                  (type.id === active6 ? true : false) ||
                  (type.id === active7 ? true : false)
                }
                errors={errors}
                control={control}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                onPress={useCallback(() => {
                  handleActiveCheck(item.id, type.id);
                  setValue(item.name, type.id);
                }, [type.id])}
                name={item.name}
              />
            ))}
          </View>
        </View>
      ))}
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
    marginRight: 10,
  },
});
