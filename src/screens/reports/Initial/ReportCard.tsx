/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import StaticMap from '../map/NavigateMap';
import HeaderText from '../../../components/common/text/HeaderText';
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
// import {useAppSelector} from '../../../store/store';
import {formatDate} from '../../../components/common/formatDate';
import storage from '../../../utils/helpers/auth/storage';

interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
  route: any;
}
const ReportCard = ({route}: Props) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const {colors} = useTheme();
  const {id, serviceTypeId, appointmentId} = route?.params;
  const [singleReportData, setSingleReportData] = useState<any>({});
  const {request, loading} = useApi(methods._get);
  const {request: getMap, loading: mapLoading} = useApi(methods._get);
  // const [mapData, setMapData] = useState([]);

  const handleSingleReport = async () => {
    const singleEndPoint = `/appointment/card/find/${id}`;
    const result = await request(singleEndPoint);
    if (result.ok) {
      setSingleReportData(result?.data?.data);
    }
  };
  // const callGet = async () => {
  //   const authToken = await storage.getToken();
  //   const response = await getMap(
  //     msgUrl + `/v1/locations/visit/${appointmentId}`,
  //     {
  //       headers: {
  //         Authorization: authToken,
  //       },
  //     },
  //   );
  //   response.ok && setMapData(response?.data?.data);
  // };
  // useEffect(() => {
  //   serviceTypeId === 5 && appointmentId !== null && callGet();
  // }, [appointmentId]);
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
            {/* {appointmentId !== null && mapData.length > 0 && (
              <View style={{height: 300}}>
                <StaticMap mapData={mapData} />
              </View>
            )} */}
            <View
              style={{
                padding: 15,
                marginTop: 15,
                backgroundColor: colors.backgroundColor,
              }}>
              <View style={styles.flexContainer}>
                <View>
                  <HeaderText
                    text={'Total'}
                    textStyle={{...styles.header, color: colors.lightText}}
                  />
                  <HeaderText
                    text={`${
                      singleReportData?.distance === null
                        ? 0
                        : singleReportData?.distance
                    }mi / ${(singleReportData?.distance * 1.60934).toFixed(
                      2,
                    )}km`}
                    textStyle={{...styles.headerBold}}
                  />
                </View>
                <View style={styles.dateContainer}>
                  <View>
                    <HeaderText
                      text={'Time'}
                      textStyle={{...styles.header, color: colors.lightText}}
                    />
                    <HeaderText
                      text={`Time: ${
                        singleReportData?.totalWalkTime === null
                          ? '0'
                          : singleReportData?.totalWalkTime
                      }`}
                      textStyle={{...styles.headerBold}}
                    />
                  </View>
                </View>
              </View>
            </View>
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
              <DescriptionText
                text="N/A"
                textStyle={{marginHorizontal: 15, marginBottom: 10}}
              />
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

          <HeaderText text={'Additional'} textStyle={styles.label} />
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
    fontSize: Text_Size.Text_1,
  },
});
