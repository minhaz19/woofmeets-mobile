import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import PhotoGallery from '../../ScreenComponent/Pet/AddPet/PhotoGallery';
import Text_Size from '../../../constants/textScaling';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
interface Props {
  label: string;
  subTitle: string;
  imageUris: [] | string[];
  onRemoveImage: (arg0: string) => void;
  onAddImage: (arg0: string) => void;
}

const PhotoGalleryList = ({
  label,
  subTitle,
  imageUris,
  onRemoveImage,
  onAddImage,
}: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <View>
      <TitleText textStyle={styles.label} text={label} />
      <DescriptionText textStyle={styles.subTitle} text={subTitle} />

      <ScrollView
        horizontal
        ref={scrollRef}
        onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {imageUris?.map(uri => (
            <View key={uri} style={styles.image}>
              <PhotoGallery
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <PhotoGallery onChangeImage={onAddImage} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PhotoGalleryList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
  },
});
