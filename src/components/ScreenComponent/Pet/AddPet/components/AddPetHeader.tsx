import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import HeaderText from '../../../../common/text/HeaderText';
import TitleText from '../../../../common/text/TitleText';
import ShortText from '../../../../common/text/ShortText';
import DescriptionText from '../../../../common/text/DescriptionText';
import Text_Size from '../../../../../constants/textScaling';
import AppCheckbox from '../../../../common/Form/AppCheckbox';
const havePets = {
  title: 'Do you have pets?',
  id: 109,
  name: 'havePets',
  radio: [
    {id: 1, type: 'Yes'},
    {id: 2, type: 'No'},
  ],
};
interface Props {
  havePet: number;
  setHavePet: (arg: number) => void;
}
const AddPetHeader = ({havePet, setHavePet}: Props) => {
  return (
    <View style={styles.container}>
      <HeaderText textStyle={styles.headerText} text="Create Your Profile" />
      <TitleText textStyle={styles.titleText} text="Your Pets" />
      <DescriptionText
        textStyle={styles.shortText}
        text="Share more about your pets"
      />
      <ShortText
        textStyle={styles.shortText}
        text="Show pet parents you'll love their pets like they do by uploading welcoming and professional photos of yourself. The more photos the better! We recommend five to ten. Here's some guidelines for appropriate photos."
      />
      <View>
        <View>
          <TitleText textStyle={styles.title} text={havePets.title!} />
          <View style={styles.petType}>
            {havePets.radio.map(
              useCallback(
                (item: any, index: number) => (
                  <AppCheckbox
                    key={index}
                    title={item.type}
                    radio={true}
                    active={havePet === index ? true : false}
                    onPress={() => setHavePet(index)}
                    onBlur={() => console.log()}
                  />
                ),
                [havePet, setHavePet],
              ),
            )}
          </View>
        </View>
      </View>
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
    fontWeight: 'bold',
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
