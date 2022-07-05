import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import AddPetBody from '../../../components/ScreenComponent/Pet/AddPet/AddPetBody';
import {addPetValue} from '../../../utils/config/initalValues';
import {addPetValidationSchema} from '../../../utils/config/validationSchema';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const AddPet = () => {
  const handleSubmit = () => {};
  const {isDarkMode} = useTheme();
  return (
    <Screen
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
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
  container: {flex: 1},
});
