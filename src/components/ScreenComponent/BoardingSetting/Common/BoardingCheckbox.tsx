import {View} from 'react-native';
import React, {memo} from 'react';
import {Controller} from 'react-hook-form';
import AppCheckbox from '../../../common/Form/AppCheckbox';
interface Props {
  title: string;
  typeKey: any;
  active: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
  onPress?: () => void;
  activePetHosting?: any;
  control: any;
  setValue?: (name: string, value: any, shouldValidate?: boolean) => void;
  handleValues?: () => void;
  handleActiveMultipleCheck?: (arg1: number, arg2: any) => void;
}
const BoardingCheckbox = ({
  title,
  typeKey,
  active,
  square,
  name,
  radio,
  onPress,
  control,
  setValue,
  handleValues,
}: Props) => {
  // const handleValues = () => {
  //   console.log('typeKey', typeKey);
  //   // onPress();
  //   setValue(name, typeKey, {shouldValidate: true});
  // };
  return (
    <View>
      <Controller
        control={control}
        render={({field: {onBlur}}) => (
          <AppCheckbox
            title={title}
            key={typeKey}
            square={square}
            radio={radio}
            active={active}
            onPress={handleValues}
            onBlur={onBlur}
          />
        )}
        name={name}
      />
    </View>
  );
};
// const areEqual = (prevProps: any, nextProps: any) => {
//   return (
//     prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty
//   );
// };
export default memo(BoardingCheckbox);
