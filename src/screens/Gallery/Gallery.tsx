/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppImagePicker from '../../components/common/ImagePicker/AppImagePicker';
import PhotoGalleryList from '../../components/common/ImagePicker/PhotoGalleryList';
import {MARGIN} from '../../components/ScreenComponent/Gallery/Config';
import SortableList from '../../components/ScreenComponent/Gallery/SortableList';
import Tile from '../../components/ScreenComponent/Gallery/Tile';
import {useTheme} from '../../constants/theme/hooks/useTheme';

const tiles = [
  {
    id: 'google',
    uri: 'https://google.com',
  },

  {
    id: 'expo',
    uri: 'https://expo.io',
  },
  {
    id: 'facebook',
    uri: 'https://facebook.com',
  },
  {
    id: 'reanimated',
    uri: 'https://docs.swmansion.com/react-native-reanimated/',
  },
  {
    id: 'github',
    uri: 'https://github.com',
  },
  {
    id: 'rnnavigation',
    uri: 'https://reactnavigation.org/',
  },
  {
    id: 'youtube',
    uri: 'https://youtube.com',
  },
  {
    id: 'twitter',
    uri: 'https://twitter.com',
  },
];

const Gallery = () => {
  const [photo, setPhoto] = useState<string[]>([]);
  const {colors} = useTheme();
  const handleAdd = (uri: string) => {
    setPhoto([...photo, uri]);
  };
  const handleRemove = (uri: string) => {
    setPhoto(photo.filter((imageUri: string) => imageUri !== uri));
  };
  return (
    // <SafeAreaView
    //   style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: MARGIN }}
    // >
    //   <SortableList
    //     editing={true}
    //     onDragEnd={(positions: any) =>
    //       console.log(JSON.stringify(positions, null, 2))
    //     }
    //   >
    //     {[...tiles, ...tiles].map((tile, index) => (
    //       <Tile
    //         onLongPress={() => true}
    //         key={tile.id + '-' + index}
    //         id={tile.id + '-' + index}
    //         uri={tile.uri}
    //       />
    //     ))}
    //   </SortableList>
    // </SafeAreaView>
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      {/* <View>
        <AppImagePicker
          label="Photo Gallery"
          subTitle="Show off your pet through image gallery"
          name="photoGallery"
        />
      </View> */}
      <PhotoGalleryList
        label={'Photo Gallery'}
        subTitle={'Show off your pet through image gallery'}
        imageUris={photo}
        onRemoveImage={handleRemove}
        onAddImage={handleAdd}
      />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
