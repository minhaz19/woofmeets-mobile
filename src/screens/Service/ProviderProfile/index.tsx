import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import ProviderHeader from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderHeader';
import ProviderFooter from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderFooter';
import ProviderTab from '../../../components/ScreenComponent/Service/ProviderProfile/ProvderTab';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import ProviderStory from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderStoryStatus/ProviderStory';

const ProviderProfile = () => {
  const {colors} = useTheme();
  const _renderHeader = () => (
    <ProviderStory image="https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" />
  );
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
