import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import ProviderHeader from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderHeader';
import ProviderFooter from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderFooter';
import ProviderTab from '../../../components/ScreenComponent/Service/ProviderProfile/ProvderTab';
import StoryContainer from '../../../components/ScreenComponent/Service/ProviderProfile/StoryContainer';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

const ProviderProfile = () => {
  const {colors} = useTheme();
  const _renderHeader = () => <StoryContainer />;
  const _renderFooter = () => (
    <View
      style={[
        styles.infoContianer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ProviderHeader />
      <ProviderTab />
      <ProviderFooter />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => <View />}
        ListHeaderComponent={_renderHeader}
        ListFooterComponent={_renderFooter}
      />
    </View>
  );
};

export default ProviderProfile;

const styles = StyleSheet.create({
  container: {flex: 1},
  infoContianer: {
    paddingVertical: 10,
    paddingHorizontal:
      SCREEN_WIDTH > 800 ? '20%' : Platform.OS === 'ios' ? 20 : 30,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -20,
  },
});
