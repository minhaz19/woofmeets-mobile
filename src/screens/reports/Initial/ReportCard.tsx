/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import StaticMap from '../map/NavigateMap';
import HeaderText from '../../../components/common/text/HeaderText';
import {RightArrow} from '../../../components/ScreenComponent/Inbox/utils/SvgComponent/SvgComponent';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import DescriptionText from '../../../components/common/text/DescriptionText';
import {useAppSelector} from '../../../store/store';
import ReportSingleCard from './ReportSingleCard';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import Colors from '../../../constants/Colors';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {RouteProp} from '@react-navigation/native';
import Text_Size from '../../../constants/textScaling';

interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: RouteProp<{params: {id: number}}, 'params'>;
}
const ReportCard = ({navigation, route}: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const {colors} = useTheme();
  const {id} = route.params;
  const [singleReportData, setSingleReportData] = useState({});
  const {request, loading} = useApi(methods._get);
  console.log(id);
  const handleSingleReport = async () => {
    const singleEndPoint = `/appointment/card/find/${id}`;
    const result = await request(singleEndPoint);
    console.log(result.data.data);
    if (result.ok) {
      setSingleReportData(result?.data?.data);
    }
  };

  useEffect(() => {
    handleSingleReport();
  }, []);
  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {backgroundColor: Colors.iosBG}]}>
        <View style={{height: 200}}>{/* <StaticMap /> */}</View>
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
                <HeaderText
                  text={'8.45 AM'}
                  textStyle={{...styles.headerBold}}
                />
              </View>
              <View style={{paddingHorizontal: 8}}>
                <RightArrow height={20} width={24} />
              </View>
              <View>
                <HeaderText
                  text={'May 13'}
                  textStyle={{...styles.header, color: colors.lightText}}
                />
                <HeaderText
                  text={'9.45 AM'}
                  textStyle={{...styles.headerBold}}
                />
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
            {singleReportData?.petsData?.map((item: any) => (
              <ReportSingleCard
                key={item?.petId}
                id={item?.petId}
                food={item?.food}
                poo={item?.poo}
                pee={item?.pee}
                water={item?.water}
                // title={item?.petName}
                // image={item?.image}
              />
            ))}
          </View>
        }
        <View
          style={[
            styles.textContainer,
            {backgroundColor: colors.backgroundColor},
          ]}>
          <HeaderText text={'Medication'} textStyle={styles.label} />
          <DescriptionText
            text={
              singleReportData?.medication
                ? singleReportData?.medication
                : 'No Medication in this report'
            }
            textStyle={{paddingBottom: 10}}
          />

          <HeaderText text={'Additional Notes'} textStyle={styles.label} />
          <DescriptionText
            text={
              singleReportData?.additionalNotes
                ? singleReportData?.additionalNotes
                : 'No notes in this report'
            }
          />
        </View>
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
              {singleReportData?.images?.map((item: any, index: number) => {
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
    </>
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
  textContainer: {
    marginBottom: 4,
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    textSize: Text_Size.Text_1,
  },
});
