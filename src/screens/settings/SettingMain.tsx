import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import GlobalStyles from '../../../GlobalStyles';

const SettingMain = () => {
  return (
    <View style={GlobalStyles.droidSafeArea}>
      <SafeAreaView>
        <Text>SettingMain</Text>
      </SafeAreaView>
    </View>
  );
};

export default SettingMain;
