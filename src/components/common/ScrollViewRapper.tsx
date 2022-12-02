import {
    StyleSheet,
    ViewStyle,
    useColorScheme,
  } from 'react-native';
  import React from 'react';
  import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../constants/theme/hooks/useTheme';
  
  const ScrollViewRapper = (props: {
    style?: ViewStyle;
    children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
    extraHeight?: number;
    extraScrollHeight?: number;
  }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const {colors} = useTheme();
    const backgroundStyle = {backgroundColor: Colors.light.inputBackground}
    return (
      <KeyboardAwareScrollView
        style={[
          styles.container,
          backgroundStyle,
          props?.style,
          {backgroundColor: colors.backgroundColor},
        ]}
        extraHeight={props?.extraHeight ? props.extraHeight : 80}
        extraScrollHeight={props?.extraScrollHeight ? props.extraScrollHeight : 180}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}>
        {props.children}
      </KeyboardAwareScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
  export default ScrollViewRapper;
  