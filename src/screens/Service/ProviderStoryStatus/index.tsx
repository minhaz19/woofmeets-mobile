import {View} from 'react-native';
import React from 'react';
import ProviderStory from '../../../components/ScreenComponent/Service/ProviderStoryStatus/ProviderStory';
interface Props {
  route: {params: {name: number; image: string}};
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}

const ProviderStoryStatus = ({route, navigation}: Props) => {
  return (
    <View>
      <ProviderStory route={route} navigation={navigation} />
    </View>
  );
};

export default ProviderStoryStatus;
