import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import AddPetBody from '../../../components/ScreenComponent/Pet/AddPet/AddPetBody';
import {addPetValue} from '../../../utils/config/initalValues';
import {addPetValidationSchema} from '../../../utils/config/validationSchema';

const AddPet = () => {
  const handleSubmit = () => {};
  return (
    <ScrollView style={styles.container}>
      <Screen>
        <AddPetBody
          initialValues={addPetValue}
          validationSchema={addPetValidationSchema}
          handleSubmit={handleSubmit}
        />
      </Screen>
    </ScrollView>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {},
});
