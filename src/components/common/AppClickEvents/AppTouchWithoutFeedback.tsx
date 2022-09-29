import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
interface Props {
  props: any;
  children: React.ReactNode;
}
const AppTouchableHighlight = ({props, children}: Props) => {
  return (
    <Pressable {...props} style={() => [styles.button]}>
      {children}
    </Pressable>
  );
};

export default AppTouchableHighlight;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    backgroundColor: '#a4c936',
    borderRadius: 8,
  },
});
