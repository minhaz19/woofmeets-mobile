/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import {Cross} from '../../../assets/svgs/SVG_LOGOS';
import {useNavigation} from '@react-navigation/native';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';

interface Props {
  children: any;
}

const SliderScreenParent = ({children}: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={[
          styles.rootContainer,
          {
            backgroundColor: Colors.primary,
          },
        ]}>
        <AppTouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.crossContainer}>
          <View>
            <Cross height={16} width={16} fill={Colors.light.background} />
          </View>
        </AppTouchableOpacity>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
     </SafeAreaView>
  );
};

export default SliderScreenParent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  crossContainer: {
    right: 20,
    top: Platform.OS === 'ios' ? 30 : 30,
    position: 'absolute',
    flex: 2,
    // backgroundColor: Colors.light.background,
    padding: 10,
  },
  childrenContainer: {
    margin: '5%',
  },
});
