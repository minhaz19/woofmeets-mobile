import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  hText: string;
}

const ServicePetType = ({hText}: Props) => {
  const colors = useTheme();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View>
      <Text>Pet Type (s)</Text>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      />
    </View>
  );
};

export default ServicePetType;

const styles = StyleSheet.create({});
