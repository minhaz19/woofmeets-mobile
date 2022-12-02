import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../../components/common/Screen';
import {addPetSubmitValidationSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import AppForm from '../../../../components/common/Form/AppForm';
import {RouteProp} from '@react-navigation/native';
import {useAddPetUtils} from './utils/useAddPetUtils';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AddPetSubmitBody from '../../../../components/ScreenComponent/Pet/AddPetSubmit/AddPetSubmitBody';
import {useSubmitInitValues} from './utils/useSubmitInitValue';
interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: RouteProp<
    {params: {opk: string | null; data: any; onBoarding: boolean}},
    'params'
  >;
}
const AddPetSubmit = ({route, navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {opk, data, onBoarding} = route.params;
  const {Ploading, handleSubmit} = useAddPetUtils(
    navigation,
    data,
    opk!,
    onBoarding,
  );
  return (
    <>
      <Screen
        style={[
          styles.container,
          {
            backgroundColor: Colors.background,
          },
        ]}>
        <AppForm
          initialValues={useSubmitInitValues(opk)}
          validationSchema={addPetSubmitValidationSchema}>
          <AddPetSubmitBody
            handleSubmit={handleSubmit}
            loading={Ploading}
            opk={opk}
          />
        </AppForm>
      </Screen>
    </>
  );
};

export default AddPetSubmit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH > 800 ? '10%' : Platform.OS === 'ios' ? 20 : 10,
  },
});
