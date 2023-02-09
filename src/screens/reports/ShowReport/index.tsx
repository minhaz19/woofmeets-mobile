import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
// import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import HeaderText from '../../../components/common/text/HeaderText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../constants/textScaling';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../components/common/text/TitleText';
import Lottie from 'lottie-react-native';
import Colors from '../../../constants/Colors';
import {useAppSelector} from '../../../store/store';
import moment from 'moment-timezone';
import {CancelToken} from 'apisauce';
import BottomSpacing from '../../../components/UI/BottomSpacing';

const ShowAllReport = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
  route: any;
}) => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {colors} = useTheme();
  const appointmentOpk = props?.route?.params?.appointmentOpk;
  const [loading, setLoading] = useState(true);
  const [allReports, setAllReports] = useState([]);
  const {request} = useApi(methods._get);
  const endPoint = `/appointment/card/find-all/${appointmentOpk}`;

  const getAllReport = async (source: any) => {
    const result = await request(endPoint, {}, {cancelToken: source.token});

    if (result.ok) {
      setAllReports(result?.data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    const source = CancelToken.source(); // <-- 1st step
    getAllReport(source);
    return () => {
      source.cancel();
    };
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const source = CancelToken.source(); // <-- 1st step
    await getAllReport(source);
    setRefreshing(false);
  };
  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : (
    <>
      {allReports?.length === 0 ? (
        <View style={styles.report}>
          <View>
            <Lottie
              autoPlay
              loop
              source={require('../../../assets/report.json')}
              style={styles.loaderStyle}
            />

            <View style={[styles.rootContainer]}>
              <TitleText
                textStyle={styles.title}
                text={'No report found for the particular appointment'}
              />
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[styles.rootContainer]}>
          {allReports?.map((item: any) => {
            return (
              <AppTouchableOpacity
                key={item?.id}
                onPress={() =>
                  props.navigation.navigate('ReportCard', {
                    id: item?.id,
                    serviceTypeId: proposedServiceInfo?.serviceTypeId,
                    appointmentId: item?.appointmentDateId,
                  })
                }>
                <View
                  style={[
                    styles.container,
                    {backgroundColor: colors.backgroundColor},
                  ]}>
                  <View>
                    <HeaderText
                      text={proposedServiceInfo?.serviceName}
                      textStyle={styles.header}
                    />
                    {proposedServiceInfo?.serviceTypeId === 5 && (
                      <>
                        <DescriptionText
                          text={`Distance Travelled: ${
                            item?.distance === null ? 0 : item?.distance
                          }mi / ${(item?.distance * 1.60934).toFixed(2)}km`}
                          textStyle={{
                            marginVertical: 4,
                          }}
                        />
                        <DescriptionText
                          text={`Time: ${
                            item?.totalWalkTime === null
                              ? '0'
                              : item?.totalWalkTime
                          }`}
                        />
                      </>
                    )}

                    <DescriptionText
                      text={
                        'Generate Date: ' +
                        moment(item?.submitTime).format('MMMM Do YYYY')
                      }
                      textStyle={{
                        marginVertical: 4,
                      }}
                    />
                  </View>
                </View>
              </AppTouchableOpacity>
            );
          })}
          <BottomSpacing />
        </ScrollView>
      )}
    </>
  );
};

export default ShowAllReport;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  container: {
    marginVertical: 6,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    flex: 0,
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  loaderStyle: {width: '80%'},
  report: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Text_Size.Text_2,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
});
