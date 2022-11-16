import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../../components/common/Screen';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import AppForm from '../../../../components/common/Form/AppForm';
import {RouteProp} from '@react-navigation/native';
import {useAddPetUtils} from './utils/useAddPetUtils';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import AddPetCheckBody from '../../../../components/ScreenComponent/Pet/AddPetCheckComp/AddPetCheckBody';
import {addPetCheckValidationSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useCheckInfiValue} from './utils/useCheckInitInitValue';
interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: RouteProp<
    {params: {opk: string | null; homeData: any; onBoarding: boolean}},
    'params'
  >;
}
const AddPetCheckScreen = ({route, navigation}: Props) => {
  const {isDarkMode} = useTheme();
  const {opk, homeData, onBoarding} = route.params;
  const {handleSubmit} = useAddPetUtils(navigation, opk, homeData, onBoarding);

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
          initialValues={useCheckInfiValue(opk)}
          validationSchema={addPetCheckValidationSchema}>
          <AddPetCheckBody handleSubmit={handleSubmit} opk={opk} />
        </AppForm>
      </Screen>
    </>
  );
};

export default AddPetCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:
      SCREEN_WIDTH > 800 ? '10%' : Platform.OS === 'ios' ? 20 : 10,
  },
});
