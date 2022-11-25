import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useAppSelector} from '../../../store/store';
import HeaderText from '../../../components/common/text/HeaderText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../constants/textScaling';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';

const ShowAllReport = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
}) => {
  const {colors} = useTheme();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const [allReports, setAllReports] = useState([]);
  const endPoint = `/appointment/card/find-all/${proposedServiceInfo?.appointmentOpk}`;
  const {request, loading} = useApi(methods._get);
  const getAllReport = async () => {
    const result = await request(endPoint);
    setAllReports(result?.data?.data);
  };

  useEffect(() => {
    getAllReport();
  }, []);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <View
        style={[
          styles.rootContainer,
          //   {backgroundColor: colors.backgroundColor},
        ]}>
        {allReports?.map((item: any) => {
          return (
            <AppTouchableOpacity
              onPress={() =>
                props.navigation.navigate('ReportCard', {id: item?.id})
              }>
              <View
                style={[
                  styles.container,
                  {backgroundColor: colors.backgroundColor},
                ]}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: item?.images[0]}} style={styles.image} />
                </View>
                <View>
                  <HeaderText
                    text={proposedServiceInfo?.serviceName}
                    textStyle={styles.header}
                  />
                  <DescriptionText text={'Demo description'} />
                </View>
              </View>
            </AppTouchableOpacity>
          );
        })}
      </View>
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
});
