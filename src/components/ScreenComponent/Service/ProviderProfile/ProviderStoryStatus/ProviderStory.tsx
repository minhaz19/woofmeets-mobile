/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Stories, {
  ICustomStoryView,
  IUserStory,
} from 'react-native-story-component';
import {Cross} from '../../../../../assets/svgs/SVG_LOGOS';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import {useAppSelector} from '../../../../../store/store';
import StoryContainer from './StoryContainer';

const ProviderStory = () => {
  const {gallery, profileInfo} = useAppSelector(state => state.providerProfile);
  const providerStories: any = [
    {
      id: 1,
      avatar: profileInfo?.avatar?.url,
      name: `${profileInfo?.firstName + ' ' + profileInfo?.lastName}`,
      stories: gallery?.map((item: any) => ({
        id: item.id,
        image: item.imageSrc?.url,
      })),
    },
  ];
  return (
    <View>
      <Stories
        data={providerStories}
        duration={5}
        onStart={(openedStory: IUserStory) => {}}
        onClose={(closedStory: IUserStory) => {}}
        customSwipeUpButton={() => (
          <View>
            <Text>Swipe</Text>
          </View>
        )}
        customCloseButton={() => <Cross width={15} height={15} />}
        customStoryList={(props: ICustomStoryView) => {
          return (
            <TouchableOpacity onPress={props.onStoryPress}>
              <StoryContainer image={gallery[0]?.imageSrc.url} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProviderStory;

const styles = StyleSheet.create({
  storyImage: {flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT, zIndex: -1},
  imageee: {
    width: '100%',
    height: 250,
  },
});
