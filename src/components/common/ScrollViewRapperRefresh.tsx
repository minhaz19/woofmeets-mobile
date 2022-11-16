import {
    StyleSheet,
    ViewStyle,
    useColorScheme,
    RefreshControl,
  } from 'react-native';
  import React from 'react';
  import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../constants/theme/hooks/useTheme';
  
  const ScrollViewRapperRefresh = (props: {
    onRefresh: (() => void) | undefined;
    refreshing: any;
    style?: ViewStyle;
    children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
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
        extraHeight={200}
        extraScrollHeight={200}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={props?.refreshing}
            onRefresh={props?.onRefresh}
          />
        }>
        {props.children}
      </KeyboardAwareScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
  export default ScrollViewRapperRefresh;
  