import {StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import AddPetBody from '../../../components/ScreenComponent/Pet/AddPet/AddPetBody';
import {addPetValue} from '../../../utils/config/initalValues';
import {addPetValidationSchema} from '../../../utils/config/validationSchema';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {setPetValue} from '../../../store/slices/addPet';
import AppForm from '../../../components/common/Form/AppForm';

const AddPet = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    dispatch(setPetValue(e));
  };
  const {isDarkMode} = useTheme();
  return (
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
        initialValues={addPetValue}
        validationSchema={addPetValidationSchema}>
        <AddPetBody handleSubmit={handleSubmit} />
      </AppForm>
    </Screen>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {flex: 1, paddingBottom: 0},
});
