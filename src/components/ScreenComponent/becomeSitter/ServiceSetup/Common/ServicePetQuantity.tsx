import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Controller} from 'react-hook-form';
import {MinusSvg, PlusSvg} from '../../../BoardingSetting/utils/BoardingSvg';
import HeaderText from '../../../../common/text/HeaderText';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {
  decrement,
  increment,
} from '../../../../../store/slices/onBoarding/setUpService/petPreference/PetPreferenceSlice';

interface Props {
  name: string;
  errors: any;
  control: any;
  setValue: any;
}

const ServicePetQuantity: FC<Props> = ({name, control, setValue, errors}) => {
  const dispatch = useAppDispatch();
  const {petPerDay} = useAppSelector((state: any) => state?.petPreference);
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  useEffect(() => {
    setValue(name, petPerDay);
  }, [petPerDay, name, setValue]);
  return (
    <>
      <View style={styles.flexContainer}>
        <Controller
          control={control}
          name={name}
          render={({field: {onBlur}}) => {
            return (
              <TouchableOpacity onPress={handleDecrement} onBlur={onBlur}>
                <MinusSvg height={18} width={18} />
              </TouchableOpacity>
            );
          }}
        />
        <HeaderText text={petPerDay} textStyle={styles.headerText} />
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

export default ServicePetQuantity;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  headerText: {
    fontWeight: '500',
    paddingHorizontal: 16,
  },
});
