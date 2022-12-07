/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {isComming} from '../../../components/common/Dates/datesFunc';
import TitleText from '../../../components/common/text/TitleText';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {formatDate} from '../../../components/common/formatDate';
import Text_Size from '../../../constants/textScaling';

const cardEndpoint = '/appointment/card/all-dates/';
const checkReport = '/appointment/card/check/';
const ReportSlots = ({route, navigation}: any) => {
  const [allDates, setAllDates] = useState([]);
  const {opk} = route?.params;
  const {request: getRequest, loading} = useApi(methods._get);
  useEffect(() => {
    const callApi = async () => {
      const data = await getRequest(cardEndpoint + opk);
      const arr = data?.data?.data?.sort(function (x: any, y: any) {
        return new Date(x.date).getTime() - new Date(y.date).getTime();
      });
  
      if (arr?.length > 0) {
        setAllDates(arr);
      }
    };
    callApi();
  }, [opk]);
  const handleGenRep = async (item: any) => {
    if (isComming(item.localDate)) {
      Alert.alert(
        `You can not generate report before ${formatDate(
          item.localDate,
          'LLL d yyyy',
        )}`,
      );
    } else {
      const result = await getRequest(
        `${checkReport + item.appointmentId + '/' + item.id}`,
      );
      if (result.ok && !result.data.data.cardFound) {
        navigation.navigate('GenerateReport', {
          screen: 'InboxNavigator',
          reportInfo: item,
        });
      } else if (result.data.data.cardFound) {
        Alert.alert('You have already generated this appointment report');
      }
    }
  };

  return loading ? (
    <View
      style={{
        marginVertical: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TitleText
        text="Loading..."
        textStyle={{
          fontSize: Text_Size.Text_1,
          fontWeight: 'bold',
          color: Colors.primary,
          textAlign: 'center',
        }}
      />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <View>{/* <TitleText text={'Here '} /> */}</View>
      {allDates?.map((item: any, index: number) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <View>
            <TitleText
              textStyle={{}}
              text={formatDate(item.localDate, 'LLL d yyyy')}
            />
          </View>
          <View>
            <TitleText textStyle={{}} text={item.visitStartTimeString} />
          </View>
          <AppTouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isComming(item.localDate)
                ? Colors.gray
                : Colors.primary,
            }}
            onPress={() => handleGenRep(item)}>
            <TitleText
              textStyle={{
                fontWeight: 'bold',
                color: isComming(item.localDate)
                  ? Colors.gray
                  : Colors.primaryDif,
              }}
              text={'Generate Report'}
            />
          </AppTouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ReportSlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
