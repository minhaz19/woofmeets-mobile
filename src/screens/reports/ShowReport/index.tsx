import {StyleSheet, Image, View} from 'react-native';
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
import {formatDate} from '../../../components/common/formatDate';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const ShowAllReport = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
  route: any;
}) => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {colors} = useTheme();
  const appointmentOpk = props?.route?.params?.appointmentOpk;
  const [allReports, setAllReports] = useState([]);
  const {request, loading} = useApi(methods._get);
  const endPoint = `/appointment/card/find-all/${appointmentOpk}`;

  const getAllReport = async () => {
    const result = await request(endPoint);
    result.ok && setAllReports(result?.data?.data);
  };
  useEffect(() => {
    getAllReport();
  }, []);
  return (
    <>
      {loading ? (
        <AppActivityIndicator visible={loading} /> // <AppActivityIndicator visible={loading} />
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

                <View
                  style={[
                    styles.rootContainer,
                    //   {backgroundColor: colors.backgroundColor},
                  ]}>
                  <TitleText
                    textStyle={styles.title}
                    text={'No report found for the particular appointment'}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.rootContainer,
                //   {backgroundColor: colors.backgroundColor},
              ]}>
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
                      <View style={styles.imageContainer}>
                        <Image
                          source={{uri: item?.images[0]}}
                          style={styles.image}
                        />
                      </View>
                      <View>
                        <HeaderText
                          text={proposedServiceInfo?.serviceName}
                          textStyle={styles.header}
                        />
                        <DescriptionText
                          text={
                            'Generate Report at: ' +
                            formatDate(item?.submitTime, 'iii LLL d hh:mm aa ')
                          }
                        />
                      </View>
                    </View>
                  </AppTouchableOpacity>
                );
              })}
            </View>
          )}
        </>
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
    padding: 8,
    flexDirection: 'row',
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
});
