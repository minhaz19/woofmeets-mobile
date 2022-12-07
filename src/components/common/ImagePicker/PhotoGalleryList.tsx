import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import PhotoGallery from '../../ScreenComponent/Pet/components/PhotoGallery';
import Text_Size from '../../../constants/textScaling';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
interface Props {
  label: string;
  subTitle?: string;
  imageUris: [] | string[];
  onRemoveImage: (arg0: string) => void;
  onAddImage: (arg0: string) => void;
  handlePress: (arg: string) => void;
  marginTop?: boolean;
  deleteShow?: boolean;
}

const PhotoGalleryList = ({
  label,
  subTitle,
  imageUris,
  onRemoveImage,
  onAddImage,
  handlePress,
  marginTop,
  deleteShow,
}: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <View>
      <TitleText textStyle={styles.label} text={label} />
      {subTitle && (
        <DescriptionText textStyle={styles.subTitle} text={subTitle} />
      )}
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
                handlePress={() => handlePress(uri)}
                onChangeImage={() => onRemoveImage(uri)}
                marginTop={marginTop}
                deleteShow={deleteShow}
              />
            </View>
          ))}
          <PhotoGallery onChangeImage={onAddImage} marginTop={marginTop} />
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
    position: 'relative',
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
  },
});
