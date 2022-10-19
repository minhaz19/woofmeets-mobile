/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Platform, StyleSheet} from 'react-native';
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
import DescriptionText from '../../../components/common/text/DescriptionText';
import AllProviderLoader from './AllProviderLoadingUI';
import {getAllProvider} from '../../../store/slices/Provider/allProvider/getAllProvider';
interface Props {
  navigation: {
    navigate: (arg: string, arg1: {providerOpk: string}) => void;
  };
}

const AllProvider = ({navigation}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  const {formattedData} = useAppSelector((state: any) => state.providerFilter);
  const {
    allProvider,
    loading: getLoading,
    message,
  } = useAppSelector((state: any) => state.allProvider);
  const dispatch = useAppDispatch();
  const providers = allProvider !== null && allProvider;

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  let getApiData = formattedData;

  useEffect(() => {
    setIsLoading(true);
    getApiData['page'] = currentPage;
    dispatch(getAllProvider(getApiData));
    setIsLoading(false);
  }, [currentPage]);

  // console.log(providers);
  // render header
  const renderHeader = () => {
    return (
      <ShortText
        textStyle={{
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          color: Colors.gray,
        }}
        text={providers ? `${providers.length} Results` : '0 Result'}
      />
    );
  };

  const renderLoader = () => {
    return (
      <>
        {isLoading ? (
          <>
            <DescriptionText text={'Loading...'} />
            <BottomSpacing />
          </>
        ) : (
          <BottomSpacing />
        )}
      </>
    );
  };

  return (
    <ScreenRapperGrey>
      {getLoading && <AllProviderLoader />}
      <Screen style={styles.container}>
        {providers ? (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={providers}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({item}) => {
                return (
                  <ProviderList
                    item={item}
                    onPress={async () => {
                      await dispatch(getProviderProfile('2NzBcMvn'));
                      navigation.navigate('ProviderNavigator', {
                        providerOpk: '2NzBcMvn',
                      });
                    }}
                  />
                );
              }}
              ListFooterComponent={renderLoader}
              ListHeaderComponent={renderHeader}
              onEndReached={loadMoreItem}
              onEndReachedThreshold={0.8}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={isRefreshing}
              //     onRefresh={handleRefresh}
              // />
              // }
            />
          </>
        ) : (
          <DescriptionText text={message} textStyle={{textAlign: 'center'}} />
        )}
        <BottomHalfModal isModalVisible={filter}>
          <FilterProvider />
        </BottomHalfModal>
      </Screen>
    </ScreenRapperGrey>
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
