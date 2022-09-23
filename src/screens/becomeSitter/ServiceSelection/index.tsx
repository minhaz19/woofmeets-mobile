import {FlatList, StyleSheet, View} from 'react-native';
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
import {getServiceTypes} from '../../../store/slices/profile/services';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../api/client';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {setSitterData} from '../../../store/slices/onBoarding/initial';
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

  const [refreshing, setRefreshing] = useState(false);

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

  const onPressEvent = (id: number) => {
    setSequence(id);
    // selectData[id].clicked = !selectData[id].clicked;
    // setSelectData([...selectData]);
  };

  const onServicePostHandle = async () => {
    setLoading(true);
    try {
      const response: ApiResponse<any> = await apiClient.post(
        `/provider-services/${sequence}`,
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error(response.data.message);
      }
      if (response.ok) {
        setLoading(false);
        dispatch(setSitterData({pass: 0}));
      }
      // return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        console.log(error.response);
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
        <HeaderText text="Service Selection" />
        <View style={styles.viewQuestionStyle}>
          <MaterialIcons name="error" size={14} color={Colors.primary} />
          <ShortText
            textStyle={{...styles.shortText, color: Colors.primary}}
            text="Which services should I choose?"
          />
        </View>
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
    paddingHorizontal: '10%',
    paddingBottom: 100,
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
