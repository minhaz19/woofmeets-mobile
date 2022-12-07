/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import StaticMap from '../map/NavigateMap';
import HeaderText from '../../../components/common/text/HeaderText';
import {RightArrow} from '../../../components/ScreenComponent/Inbox/utils/SvgComponent/SvgComponent';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import DescriptionText from '../../../components/common/text/DescriptionText';
import ReportSingleCard from './ReportSingleCard';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import Colors from '../../../constants/Colors';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

import Text_Size from '../../../constants/textScaling';
import {msgUrl} from '../../../utils/helpers/httpRequest';
import {useAppSelector} from '../../../store/store';
import {formatDate} from '../../../components/common/formatDate';

interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: any;
}
const ReportCard = ({navigation, route}: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const {colors} = useTheme();
  const {id, serviceTypeId, appointmentId} = route?.params;
  const [singleReportData, setSingleReportData] = useState({});
  const {request, loading} = useApi(methods._get);
  const {request: getMap, loading: mapLoading} = useApi(methods._get);
  const [mapData, setMapData] = useState(null);

  const handleSingleReport = async () => {
    const singleEndPoint = `/appointment/card/find/${id}`;
    const result = await request(singleEndPoint);

    if (result.ok) {
      setSingleReportData(result?.data?.data);
    }
  };
  const callGet = async () => {
    const response = await getMap(
      msgUrl + `/v1/locations/visit/${appointmentId}`,
    );
    response.ok && setMapData(response?.data?.data);
  };
  useEffect(() => {
    serviceTypeId === 5 && appointmentId !== null && callGet();
  }, [appointmentId]);
  useEffect(() => {
    handleSingleReport();
  }, []);

  return (
    <>
      {(loading || mapLoading) && (
        <AppActivityIndicator visible={loading || mapLoading} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {backgroundColor: Colors.iosBG}]}>
        {serviceTypeId === 5 && (
          <>
            {appointmentId !== null && (
              <View style={{height: 300}}>
                <StaticMap mapData={mapData} />
              </View>
            )}
            {/* <View
              style={{padding: 15, backgroundColor: colors.backgroundColor}}>
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
            </View> */}
          </>
        )}

        {singleReportData?.submitTime && (
          <HeaderText
            textStyle={{marginHorizontal: 15, marginTop: 15}}
            text={
              'Generate Report at: ' +
              formatDate(singleReportData?.submitTime, 'iii LLL d hh:mm a')
            }
          />
        )}
        <HeaderText
          text={'Activities'}
          textStyle={{marginHorizontal: 15, marginTop: 15, marginBottom: 10}}
        />
        {
          <View>
            {singleReportData?.petsData?.length > 0 ? (
              singleReportData?.petsData?.map((item: any) => (
                <ReportSingleCard
                  key={item?.petId}
                  id={item?.petId}
                  food={item?.food}
                  poo={item?.poo}
                  pee={item?.pee}
                  water={item?.water}
                  title={item?.petName}
                  image={item?.image}
                />
              ))
            ) : (
              <DescriptionText text="N/A" />
            )}
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
                : 'No additional notes in this report'
            }
          />
        </View>
        {singleReportData?.images?.length > 0 && (
          <>
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
          </>
        )}
        <BottomSpacing />
        <BottomSpacing />
        {/* <BottomSpacing /> */}
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
