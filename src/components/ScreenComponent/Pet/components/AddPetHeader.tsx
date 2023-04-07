import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderText from '../../../common/text/HeaderText';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import Text_Size from '../../../../constants/textScaling';

const AddPetHeader = () => {
  return (
    <View style={styles.container}>
      <HeaderText textStyle={styles.headerText} text="Create Your Profile" />
      <TitleText textStyle={styles.titleText} text="Your Pets" />
      <DescriptionText text="Share more about your pets" />
      <DescriptionText text="Show pet parents you'll love their pets like they do by uploading welcoming and professional photos of yourself. The more photos the better! We recommend five to ten. Here's some guidelines for appropriate photos." />
    </View>
  );
};

export default AddPetHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: Text_Size.Text_3,
  },
  titleText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  shortText: {
    marginBottom: 10,
  },
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  petType: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});
