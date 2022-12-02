/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../../components/common/Screen';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ProviderList from '../../../components/ScreenComponent/Service/AllProvider/ProviderList';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import BottomHalfModal from '../../../components/UI/modal/BottomHalfModal';
import FilterProvider from '../FilterProvider';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getProviderProfile} from '../../../store/slices/Provider/ProviderProfile/singlePet/providerProfileAction';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
import AllProviderLoader from './AllProviderLoadingUI';
import {getAllProvider} from '../../../store/slices/Provider/allProvider/getAllProvider';
import {SCREEN_HEIGHT} from '../../../constants/WindowSize';
import IOSButton from '../../../components/UI/IOSButton';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import BigText from '../../../components/common/text/BigText';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {getProviderServices} from '../../../store/slices/Appointment/ProviderServices/getProviderServices';

interface Props {
  navigation: {
    navigate: (arg: string, arg1: {providerOpk: string}) => void;
  };
}

const AllProvider = ({navigation}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  const {loading: loadingProivder} = useAppSelector(
    state => state.providerProfile,
  );
  const {loading: loadingService} = useAppSelector(
    state => state.providerServices,
  );
  const {formattedData} = useAppSelector((state: any) => state.providerFilter);
  const {
    allProvider,
    loading: getLoading,
    message,
    loadingOneTime,
  } = useAppSelector((state: any) => state.allProvider);
  const dispatch = useAppDispatch();
  // const providers = allProvider !== null && allProvider;

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  let getApiData = formattedData;

  const getMoreProviderData = async () => {
    if (currentPage !== 1 && allProvider?.length >= limit) {
      setIsLoading(true);
      getApiData['page'] = currentPage;
      await dispatch(getAllProvider(getApiData));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMoreProviderData();
  }, [currentPage]);
  const renderHeader = () => {
    return (
      <ShortText
        textStyle={{
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          color: Colors.gray,
        }}
        text={allProvider ? `${allProvider.length} Results` : '0 Result'}
      />
    );
  };

  const renderLoader = () => {
    return (
      <>
        {isLoading ? (
          <>
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#1f1f1f" />
              <BottomSpacing />
            </View>
          </>
        ) : (
          <View>
            <BottomSpacing />
            <BottomSpacing />
          </View>
        )}
      </>
    );
  };

  return (
    <>
      {(loadingProivder || loadingService) && (
        <AppActivityIndicator visible={loadingProivder || loadingService} />
      )}
      <ScreenRapperGrey>
        {loadingOneTime && <AllProviderLoader />}
        <Screen style={styles.container}>
          {allProvider ? (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={allProvider}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item}) => {
                  return (
                    <ProviderList
                      item={item}
                      onPress={async () => {
                        await dispatch(
                          getProviderProfile(item.provider?.user?.opk),
                        );
                        await dispatch(
                          getProviderServices(item.provider?.user?.opk),
                        );
                        navigation.navigate('ProviderProfile', {
                          providerOpk: item.provider?.user?.opk,
                        });
                      }}
                    />
                  );
                }}
                ListFooterComponent={renderLoader}
                ListHeaderComponent={renderHeader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0.2}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={isRefreshing}
                //     onRefresh={handleRefresh}
                // />
                // }
              />
            </>
          ) : (
            <View style={{justifyContent: 'center', height: SCREEN_HEIGHT}}>
              <BigText text={message} textStyle={{textAlign: 'center'}} />
              <IOSButton
                title={'Search Again'}
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={{color: Colors.primaryDif}}
                onSelect={() => navigation.goBack()}
              />
            </View>
          )}
          <BottomHalfModal isModalVisible={filter}>
            <FilterProvider />
          </BottomHalfModal>
        </Screen>
      </ScreenRapperGrey>
    </>
  );
};

export default AllProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 5,
    paddingTop: 5,
  },
});
