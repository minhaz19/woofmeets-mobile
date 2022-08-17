import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {MinusSvg, PlusSvg} from '../utils/BoardingSvg';
import HeaderText from '../../../common/text/HeaderText';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';

interface Props {
  name: string;
}

const BoardingPetQuantity: FC<Props> = ({name}) => {
  const [countState, setCountState] = useState(1);
  const {setValue, errors, onBlur} = useRHFContext(name);
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
        <TouchableOpacity onPress={handleDecrement} onBlur={onBlur}>
          <MinusSvg height={18} width={18} />
        </TouchableOpacity>
        <HeaderText text={countState} textStyle={styles.headerText} />
        <TouchableOpacity onPress={handleIncrement} onBlur={onBlur}>
          <PlusSvg height={18} width={18} />
        </TouchableOpacity>
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
