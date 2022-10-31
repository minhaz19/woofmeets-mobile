import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import HeaderText from '../../../components/common/text/HeaderText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import DescriptionText from '../../../components/common/text/DescriptionText';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ReusableServices from '../../../components/ScreenComponent/becomeSitter/serviceSelection/ReusableServices';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {
  getServiceTypes,
  getUserServices,
} from '../../../store/slices/profile/services';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../api/client';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {setSitterData} from '../../../store/slices/onBoarding/initial';
import jwtDecode from 'jwt-decode';
import authStorage from '../../../utils/helpers/auth/storage';
import {useNavigation} from '@react-navigation/native';
import ServiceReusableModal from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/Common/ServiceReusableModal';
interface Props {
  item: any;
}

const ServiceSelection = () => {
  const {colors} = useTheme();
  const [sequence, setSequence] = useState<number>(0);
  const [isloading, setLoading] = useState<boolean>(false);
  const {serviceTypes, loading, userServices} = useAppSelector(
    state => state.services,
  );
  const oldUser = useAppSelector(state => state.initial.oldUser);

  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<any>('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getServiceTypes());
    if (oldUser) {
      dispatch(setSitterData({pass: 0}));
    }
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (userServices) {
      dispatch(setSitterData({pass: 0}));
    }
  }, [userServices]);

  const navigation = useNavigation();

  const [token, setToken] = useState<any>();
  const getDecodedToken = async () => {
    const tok: any = await authStorage.getToken();
    if (tok) {
      const decode: any = await jwtDecode(tok);
      setToken(decode);
      return decode;
    }
  };

  useEffect(() => {
    getDecodedToken();
  }, []);

  const onPressEvent = (id: number) => {
    setSequence(id);
  };

  const onServicePostHandle = async () => {
    setLoading(true);
    try {
      const response: ApiResponse<any> = await apiClient.post(
        `/provider-services/${sequence}`,
      );
      setError(response.data.message);
      if (!response.ok) {
        setLoading(false);
        throw new Error(response.data.message);
      }
      if (response.ok) {
        setLoading(false);
        if (token && token.provider) {
          dispatch(getUserServices());
          navigation.goBack();
        } else {
          dispatch(setSitterData({pass: 0}));
        }
      }
      // return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
      }
      setLoading(false);
    }
  };

  const RenderItem: FC<Props> = ({item}) => (
    <ReusableServices
      data={item}
      noShadow
      onPressEvent={onPressEvent}
      sequence={sequence}
    />
  );
  const renderHeader = () => {
    return (
      <View style={styles.innerViewContainer}>
        <ServiceReusableModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          question="Which services should I choose?"
          description={`Which Services Should I Choose?
          You should select any services that you feel you would be able to comfortably provide for Woofmeets customers and their pets. Some examples might be walks, feedings, cleaning litter boxes, etc. Remember, if you don’t feel up to providing a particular pet service for any reason, you should not offer it to our clients.
          Able to Host Pets in Your Home?
          We recommend choosing Boarding and Doggy Day Care for the best chance at top earnings.Many of our clients are looking for individuals who can either board their pets or cater to their needs during the days when they are at work.
          Is It Possible to Modify the Services I’ve Chosen to Provide?
          You can always modify the services you’ve chosen to provide for clients after we’ve accepted you to become a part of the Woofmeets team. If you no longer want to offer particular services, you can do that. If you feel you’re ready to start offering services that you didn’t when you originally signed up, that’s fine too. Remember, you’re potentially setting yourself up to make the most money as a pet care provider if you offer a diverse range of options for your clients.`}
        />
        <HeaderText text="Service Selection" />
        <TouchableOpacity style={styles.viewQuestionStyle} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="error" size={14} color={Colors.primary} />
          <ShortText
            textStyle={{...styles.shortText, color: Colors.primary}}
            text="Which services should I choose?"
          />
        </TouchableOpacity>
        <DescriptionText
          textStyle={styles.descriptionStyle}
          text="1. Select at least one service you’re interested in. You can always add more later."
        />
        <DescriptionText
          textStyle={styles.descriptionStyle}
          text="2. If you select more than one service, you will only see one of them during the sign up process."
        />
        <DescriptionText
          textStyle={styles.descriptionStyle}
          text="3. After your profile is submitted for review, you can edit your selected services or add more."
        />
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <DescriptionText
          text={error}
          textStyle={{
            color: Colors.alert,
            paddingVertical: 5,
            textAlign: 'center',
          }}
        />
        <ButtonCom
          title="Save and Continue"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={onServicePostHandle}
          loading={isloading}
        />
      </View>
    );
  };

  if (refreshing || loading) {
    return <AppActivityIndicator visible={true} />;
  } else {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        {serviceTypes && (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            columnWrapperStyle={styles.flatList}
            data={serviceTypes}
            numColumns={2}
            renderItem={RenderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={renderHeader}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    padding: '5%',
  },
  descriptionStyle: {
    paddingVertical: '2%',
  },
  shortText: {
    paddingLeft: 5,
  },
  viewQuestionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerContainer: {
    marginHorizontal: '10%',
    marginBottom: 100,
  },
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
});

export default ServiceSelection;
