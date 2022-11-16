/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React, {useRef} from 'react';
import StaticMap from '../map/NavigateMap';
import HeaderText from '../../../components/common/text/HeaderText';
import {RightArrow} from '../../../components/ScreenComponent/Inbox/utils/SvgComponent/SvgComponent';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import DescriptionText from '../../../components/common/text/DescriptionText';
import {useAppSelector} from '../../../store/store';
import ReportSingleCard from './ReportSingleCard';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import Colors from '../../../constants/Colors';

const ReportCard = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const {colors, isDarkMode} = useTheme();
  const {isPeeSelected, isPooSelected, isWaterSelected, isFoodSelected, photo} =
    useAppSelector((state: any) => state?.reportCard);
  const {pets} = useAppSelector((state: any) => state?.allPets);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {backgroundColor: Colors.iosBG},
      ]}>
      <View style={{height: 200}}>
        <StaticMap />
      </View>
      <View style={{padding: 15, backgroundColor: colors.backgroundColor}}>
        <View style={styles.flexContainer}>
          <View>
            <HeaderText
              text={'Total'}
              textStyle={{...styles.header, color: colors.lightText}}
            />
            <HeaderText
              text={'1.6mi/32mi'}
              textStyle={{...styles.headerBold}}
            />
          </View>
          <View style={styles.dateContainer}>
            <View>
              <HeaderText
                text={'May 13'}
                textStyle={{...styles.header, color: colors.lightText}}
              />
              <HeaderText text={'8.45 AM'} textStyle={{...styles.headerBold}} />
            </View>
            <View style={{paddingHorizontal: 8}}>
              <RightArrow height={20} width={24} />
            </View>
            <View>
              <HeaderText
                text={'May 13'}
                textStyle={{...styles.header, color: colors.lightText}}
              />
              <HeaderText text={'9.45 AM'} textStyle={{...styles.headerBold}} />
            </View>
          </View>
        </View>
        <DescriptionText
          text={
            'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
          }
          textStyle={{color: colors.placeholderTextColor}}
        />
      </View>
      <HeaderText
        text={'Activities'}
        textStyle={{marginHorizontal: 15, marginTop: 15, marginBottom: 10}}
      />
      {
        <View>
          {pets?.map(
            (item: {id: number; name: string; profile_image: {url: any}}) => (
              <ReportSingleCard
                key={item?.id}
                id={item?.id}
                title={item?.name}
                rowImage
                image={item?.profile_image?.url}
                isPeeSelected={isPeeSelected}
                isPooSelected={isPooSelected}
                isFoodSelected={isFoodSelected}
                isWaterSelected={isWaterSelected}
              />
            ),
          )}
        </View>
      }
      <HeaderText
        text={'Photos'}
        textStyle={{marginHorizontal: 15, marginBottom: 10}}
      />
      <View
        style={[
          styles.galleryContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <ScrollView
          horizontal
          ref={scrollRef}
          onContentSizeChange={() => scrollRef?.current?.scrollToEnd()}
          showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {photo?.map((item: any, index: number) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{uri: item}} style={styles.image} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <BottomSpacing />
    </ScrollView>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontWeight: '600',
  },
  headerBold: {
    fontWeight: '700',
  },
  galleryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 10,
  },
  image: {width: '100%', height: '100%'},
});
