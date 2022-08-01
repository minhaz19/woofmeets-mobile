import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const BoardingSettingInfo: FC<Props> = ({
  handleSubmit,
  initialValues,
  validationSchema,
  onPress,
}) => {
  const RatesInput = [
    {
      title: 'What you want clients to pay per service:',
      placeholder: 'Enter Base Rate',
      name: 'baseRate',
    },
  ];
  return (
    <View>
      <Text>BoardingSettingInfo</Text>
    </View>
  );
};

export default BoardingSettingInfo;

const styles = StyleSheet.create({});
