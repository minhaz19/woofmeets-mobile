import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {MinusSvg, PlusSvg} from './utils/BoardingSvg';
import HeaderText from '../text/HeaderText';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from '../Form/ErrorMessage';

interface Props {
  name: string;
}

const BoardingPetQuantity: FC<Props> = ({name}) => {
  const [countState, setCountState] = useState(1);
  const {setFieldValue, errors, touched, setFieldTouched} =
    useFormikContext<FormikValues>();
  const handleIncrement = () => {
    setCountState(countState + 1);
  };
  const handleDecrement = () => {
    if (countState > 1) {
      setCountState(countState - 1);
    }
  };
  useEffect(() => {
    setFieldValue(name, countState);
  }, [countState, name, setFieldValue]);

  return (
    <>
      <View style={styles.flexContainer}>
        <TouchableOpacity
          onPress={handleDecrement}
          onBlur={() => setFieldTouched(name)}>
          <MinusSvg height={18} width={18} />
        </TouchableOpacity>
        <HeaderText text={countState} textStyle={styles.headerText} />
        <TouchableOpacity
          onPress={handleIncrement}
          onBlur={() => setFieldTouched(name)}>
          <PlusSvg height={18} width={18} />
        </TouchableOpacity>
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default BoardingPetQuantity;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});
