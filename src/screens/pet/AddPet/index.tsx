import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import AddPetBody from '../../../components/ScreenComponent/Pet/AddPet/AddPetBody';
import {addPetValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import AppForm from '../../../components/common/Form/AppForm';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useAddPetInitValues} from '../../../utils/config/initalValues/useAddPetInitValue';
import {RouteProp} from '@react-navigation/native';
import {useAddPetUtils} from './utils/useAddPetUtils';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: RouteProp<{params: {opk: string | null}}, 'params'>;
}
const AddPet = ({route, navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {opk} = route.params;
  const {loading, Ploading, handleSubmit} = useAddPetUtils(navigation, opk!);
  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <Screen
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.background,
          },
        ]}>
        <AppForm
          initialValues={useAddPetInitValues(opk)}
          validationSchema={addPetValidationSchema}>
          <AddPetBody
            handleSubmit={handleSubmit}
            loading={Ploading}
            opk={opk}
          />
        </AppForm>
      </Screen>
    </>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH > 800 ? '10%' : Platform.OS === 'ios' ? 20 : 10,
  },
});
