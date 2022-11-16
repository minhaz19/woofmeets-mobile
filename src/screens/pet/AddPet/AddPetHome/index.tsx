import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../../components/common/Screen';
import {addPetHomeValidationSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import AppForm from '../../../../components/common/Form/AppForm';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useHomeInitValues} from './utils/useHomeInitValue';
import {RouteProp} from '@react-navigation/native';
import {useAddPetUtils} from './utils/useAddPetUtils';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AddPetHomeBody from '../../../../components/ScreenComponent/Pet/AddPetHome/AddPetHomeBody';
interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: RouteProp<
    {params: {opk: string | null; onBoarding: boolean}},
    'params'
  >;
}
const AddPetHome = ({route, navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {opk, onBoarding} = route.params;
  const {loading, handleSubmit} = useAddPetUtils(navigation, opk, onBoarding);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <Screen
        style={[
          styles.container,
          {
            backgroundColor: Colors.background,
          },
        ]}>
        <AppForm
          initialValues={useHomeInitValues(opk)}
          validationSchema={addPetHomeValidationSchema}>
          <AddPetHomeBody handleSubmit={handleSubmit} opk={opk} />
        </AppForm>
      </Screen>
    </>
  );
};

export default AddPetHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH > 800 ? '10%' : Platform.OS === 'ios' ? 20 : 10,
  },
});
