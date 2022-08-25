import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {UploadIcon} from '../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../components/common/text/DescriptionText';
import TitleText from '../../../components/common/text/TitleText';
import PhotoGalleryPlace from '../../../components/ScreenComponent/becomeSitter/Gallery/PhotoGalleryPlace';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ButtonCom from '../../../components/UI/ButtonCom';
import ImageUploadModal from '../../../components/UI/modal/ImageUploadModal';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

const Gallery = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [photo, setPhoto] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const {colors, isDarkMode} = useTheme();

  const handleAdd = (uri: string) => {
    setPhoto([...photo, uri]);
  };
  const handleRemove = (uri: string) => {
    setPhoto(photo.filter((imageUri: string) => imageUri !== uri));
  };
  const uploadImage = (_e: any) => {};
  const uploadImageUri = (uri: string) => {
    handleRemove(uri);
  };
  const renderRow = useCallback(({data, active}) => {
    return <Row data={data} active={active} />;
  }, []);
  return (
    <View
      style={[styles.rootContainer, {backgroundColor: colors.backgroundColor}]}>
      <View>
        <TitleText textStyle={styles.label} text={'Gallery Photos'} />
        <DescriptionText
          textStyle={styles.subTitle}
          text={
            'Add Photos of yourself with pets (including your own ) to show the care and attention you give to them . If possible, try to include photos of yourself walking or playing with pets. We suggest 5 - 10 of your best photos .'
          }
        />

        <ScrollView
          horizontal
          ref={scrollRef}
          onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.photoContainer}>
            {photo?.map(uri => (
              <View key={uri} style={styles.image}>
                <PhotoGalleryPlace
                  imageUri={uri}
                  onChangeImage={() => handleRemove(uri)}
                />
              </View>
            ))}
            <PhotoGalleryPlace />
          </View>
        </ScrollView>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={[
            styles.uploadContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.dark.lightDark
                : Colors.primaryLight,
            },
          ]}>
          <View style={styles.uploadInfo}>
            <UploadIcon />
            <DescriptionText text="Upload Pet Photos" textStyle={styles.text} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
        setPetImage={handleAdd}
        uploadImageUri={uploadImageUri}
      />
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Save & Continue'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  photoContainer: {
    flexDirection: 'row',
  },
  uploadContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    marginRight: 10,
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    lineHeight: Text_Size.Text_0 * 1.5,
    color: Colors.subText,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginLeft: 10,
  },
  uploadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderColor: 'gray',
  },
  footerContainer: {
    paddingTop:
      SCREEN_WIDTH <= 380 ? '10%' : SCREEN_WIDTH <= 600 ? '10%' : '4%',
  },
});

// import React, {useCallback, useEffect, useMemo, useRef} from 'react';
// import {
//   Animated,
//   Easing,
//   StyleSheet,
//   Text,
//   Image,
//   View,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import SortableList from 'react-native-sortable-list';

// const window = Dimensions.get('window');

// const data = {
//   0: {
//     image: 'https://placekitten.com/200/240',
//     text: 'Chloe',
//   },
//   1: {
//     image: 'https://placekitten.com/200/201',
//     text: 'Jasper',
//   },
//   2: {
//     image: 'https://placekitten.com/200/202',
//     text: 'Pepper',
//   },
//   3: {
//     image: 'https://placekitten.com/200/203',
//     text: 'Oscar',
//   },
//   4: {
//     image: 'https://placekitten.com/200/204',
//     text: 'Dusty',
//   },
//   5: {
//     image: 'https://placekitten.com/200/205',
//     text: 'Spooky',
//   },
//   6: {
//     image: 'https://placekitten.com/200/210',
//     text: 'Kiki',
//   },
//   7: {
//     image: 'https://placekitten.com/200/215',
//     text: 'Smokey',
//   },
//   8: {
//     image: 'https://placekitten.com/200/220',
//     text: 'Gizmo',
//   },
//   9: {
//     image: 'https://placekitten.com/220/239',
//     text: 'Kitty',
//   },
// };

// export default function Horizontal() {
//   const renderRow = useCallback(({data, active}) => {
//     return <Row data={data} active={active} />;
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>React Native Sortable List</Text>
//       <SortableList
//         horizontal
//         style={styles.list}
//         contentContainerStyle={styles.contentContainer}
//         data={data}
//         renderRow={renderRow}
//       />
//     </View>
//   );
// }

function Row(props) {
  const {active, data} = props;

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <Image source={{uri: data.image}} style={styles.image} />
      <Text style={styles.text}>{data.text}</Text>
    </Animated.View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eee',

//     ...Platform.select({
//       ios: {
//         paddingTop: 20,
//       },
//     }),
//   },

//   title: {
//     fontSize: 20,
//     paddingVertical: 20,
//     color: '#999999',
//   },

//   list: {
//     height: 210,
//     width: window.width,
//   },

//   contentContainer: {
//     ...Platform.select({
//       ios: {
//         paddingVertical: 30,
//       },

//       android: {
//         paddingVertical: 0,
//       },
//     }),
//   },

//   row: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//     width: 110,
//     height: 150,
//     marginHorizontal: 10,
//     borderRadius: 4,

//     ...Platform.select({
//       ios: {
//         shadowColor: 'rgba(0,0,0,0.2)',
//         shadowOpacity: 1,
//         shadowOffset: {height: 2, width: 2},
//         shadowRadius: 2,
//       },

//       android: {
//         elevation: 0,
//         marginHorizontal: 30,
//       },
//     }),
//   },

//   image: {
//     width: 50,
//     height: 50,
//     marginBottom: 15,
//     borderRadius: 25,
//   },

//   text: {
//     fontSize: 18,
//     color: '#222222',
//   },
// });



