import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import Colors from '../../../../constants/Colors';
import Card from '../../../UI/Card';

interface Props {
  title: string;
  name: string;
  typeKey: number;
  onPress: () => void;
  active: boolean;
  selectDays: any;
}

const BoardingDay: FC<Props> = ({
  title,
  name,
  typeKey,
  onPress,
  active,
  selectDays,
}) => {
  const {colors} = useTheme();
  const {setFieldValue, errors, touched, setFieldTouched,values} =
    useFormikContext<FormikValues>();
 
  // const filteredDays = selectDays
  //         ?.filter((item: any) => {
  //           return item.checked;
  //         })
  //         .map((item: any) => {
  //           return item.id;
  //         });
  // // console.log('filteredValue', filteredDays);
  // console.log('values', values);

  // useEffect(() => {
  //   setFieldValue(name, filteredDays);
  // }, [filteredDays, setFieldValue, name]);

  return (
    <View style={styles.rootContainer}>
      <Card style={styles.cardSetting}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onPress();
          }}
          onBlur={() => setFieldTouched(name)}>
          <View
            style={[
              styles.container,
              active
                ? {
                    borderColor: Colors.primary,
                    backgroundColor: colors.backgroundColor,
                  }
                : {
                    backgroundColor: colors.backgroundColor,
                    borderColor: Colors.gray,
                  },
            ]}>
            <Text style={[styles.text, {color: colors.descriptionText}]}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
      {/* {typeKey === 29 && ( */}
      <View style={styles.errorContainer}>
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
      {/* )} */}
    </View>
  );
};

export default BoardingDay;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
  cardSetting: {
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    elevation: Platform.OS === 'android' ? 8 : 1,
  },
  rootContainer: {
    position: 'relative',
  },
  errorContainer: {
    marginVertical: 20,
    position: 'absolute',
    flex: 0,
    width: 200,
    left: 0,
    top: 15,
  },
});
