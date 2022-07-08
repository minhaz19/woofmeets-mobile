/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import AddPetBody from '../../../components/ScreenComponent/Pet/AddPet/AddPetBody';
import {addPetValue} from '../../../utils/config/initalValues';
import {addPetValidationSchema} from '../../../utils/config/validationSchema';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {setPetValue} from '../../../store/slices/addPet';

const AddPet = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    console.log('values', e);
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
      <ScrollView style={{flex: 1}}>
        <AddPetBody
          initialValues={addPetValue}
          validationSchema={addPetValidationSchema}
          handleSubmit={handleSubmit}
        />
      </ScrollView>
    </Screen>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {flex: 1, paddingBottom: 60},
});
