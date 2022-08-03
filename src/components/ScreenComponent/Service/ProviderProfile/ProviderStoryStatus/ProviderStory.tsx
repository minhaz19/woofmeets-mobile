/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Stories, {
  ICustomStoryView,
  IUserStory,
} from 'react-native-story-component';
import {Cross} from '../../../../../assets/svgs/SVG_LOGOS';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import {ProviderStories} from '../../../../../utils/config/Data/ProviderProfileDatas';
import StoryContainer from './StoryContainer';

interface Props {
  image: string;
}

const ProviderStory = ({image}: Props) => {
  return (
    <View>
      <Stories
        data={ProviderStories}
        duration={5}
        onStart={(openedStory: IUserStory) => {
          console.log(openedStory);
        }}
        onClose={(closedStory: IUserStory) => {
          console.log(closedStory);
        }}
        customSwipeUpButton={() => (
          <View>
            <Text>Swipe</Text>
          </View>
        )}
        customCloseButton={() => <Cross width={15} height={15} />}
        customStoryList={(props: ICustomStoryView) => {
          return (
            <TouchableOpacity onPress={props.onStoryPress}>
              <StoryContainer />
            </TouchableOpacity>
          );
        }}
        // customStoryImage={props => {
        //   return (
        //     <TouchableOpacity>
        //       <Image
        //         source={{
        //           uri: props.image,
        //         }}
        //         resizeMode="cover"
        //         style={styles.storyImage}
        //       />
        //     </TouchableOpacity>
        //   );
        // }}
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
