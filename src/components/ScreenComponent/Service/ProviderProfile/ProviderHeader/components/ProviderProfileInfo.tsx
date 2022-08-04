import {StyleSheet, View} from 'react-native';
import React from 'react';
import ImageContainer from '../../../AllProvider/ImageContainer';
import ProviderInfo from '../../../AllProvider/ProviderInfo';

const ProviderProfileInfo = () => {
  return (
    <View style={styles.container}>
      <ImageContainer
        image="https://images.unsplash.com/photo-1559416847-9e26f5889a20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
        rounded
      />
      <View style={styles.infoContainer}>
        <ProviderInfo
          name="Snoop Dogg"
          nature="Caring and attentive animal lover"
          rating={5}
          distance={'1.5 miles away'}
        />
      </View>
    </View>
  );
};

export default ProviderProfileInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    alignSelf: 'center',
  },
});
