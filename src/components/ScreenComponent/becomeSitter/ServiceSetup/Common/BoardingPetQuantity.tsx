import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {MinusSvg, PlusSvg} from '../utils/BoardingSvg';
import HeaderText from '../../../common/text/HeaderText';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import {Controller} from 'react-hook-form';

interface Props {
  name: string;
  errors: any;
  control: any;
  setValue: (arg1: string, arg2: any, arg3?: any) => void;
}

const BoardingPetQuantity: FC<Props> = ({name, control, setValue, errors}) => {
  const [countState, setCountState] = useState(1);
  const handleIncrement = () => {
    setCountState(countState + 1);
  };
  const handleDecrement = () => {
    if (countState > 1) {
      setCountState(countState - 1);
    }
  };
  useEffect(() => {
    setValue(name, countState);
  }, [countState, name, setValue]);

  return (
    <>
      <View style={styles.flexContainer}>
        <Controller
          control={control}
          name={name}
          render={({field: {onBlur}}) => (
            <TouchableOpacity onPress={handleDecrement} onBlur={onBlur}>
              <MinusSvg height={18} width={18} />
            </TouchableOpacity>
          )}
        />
        <HeaderText text={countState} textStyle={styles.headerText} />
        <Controller
          control={control}
          name={name}
          render={({field: {onBlur}}) => (
            <TouchableOpacity onPress={handleIncrement} onBlur={onBlur}>
              <PlusSvg height={18} width={18} />
            </TouchableOpacity>
          )}
        />
      </View>
      <ErrorMessage error={errors[name]?.message} />
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
