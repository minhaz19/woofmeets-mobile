/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppCheckbox from './AppCheckbox';
import ErrorMessage from './ErrorMessage';
import {useRHFContext} from '../../../utils/helpers/Form/useRHFContext';
interface Props {
  title: string;
  typeKey: number;
  active: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
  onPress: () => void;
}
const AppCheckboxField = ({
  title,
  typeKey,
  active,
  square,
  name,
  radio,
  onPress,
}: Props) => {
  const {setValue, errors, onBlur} = useRHFContext(name);
  const handleValues = () => {
    setValue(name, typeKey, {shouldValidate: true});
    onPress();
  };
  console.log('calling form checkbox');
  return (
    <View style={styles.container}>
      <View style={{marginBottom: errors[name] ? 25 : 0}}>
        <AppCheckbox
          title={title}
          key={typeKey}
          square={square}
          radio={radio}
          active={active}
          onPress={handleValues}
          onBlur={onBlur}
        />
      </View>
      {typeKey === 1 && (
        <View style={styles.errorContainer}>
          <ErrorMessage error={errors[name]?.message} />
        </View>
      )}
    </View>
  );
};
const areEqual = (prevProps: any, nextProps: any) => {
  const a = JSON.stringify(prevProps);
  const b = JSON.stringify(nextProps);
  return a === b; // props are equal
};
export default memo(AppCheckboxField, areEqual);
const styles = StyleSheet.create({
  container: {position: 'relative'},
  errorContainer: {
    marginVertical: 20,
    position: 'absolute',
    flex: 0,
    width: 200,
    left: 0,
    top: 15,
  },
});
