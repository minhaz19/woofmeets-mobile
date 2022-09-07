import React from 'react';
import {FlatList} from 'react-native';
interface Props {
  children: React.ReactNode;
  showsVerticalScrollIndicator: boolean;
  style: any;
}
const AppScrollView = ({
  children,
  showsVerticalScrollIndicator,
  style,
}: Props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={style}
      data={[]}
      keyExtractor={() => 'key'}
      renderItem={null}
      ListEmptyComponent={<>{children}</>}
    />
  );
};
export default AppScrollView;
