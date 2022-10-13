/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../../components/common/Screen';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ProviderList from '../../../components/ScreenComponent/Service/AllProvider/ProviderList';
// import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../components/UI/BottomSpacing';
// import {providers} from '../../../utils/config/Data/providers';
import BottomHalfModal from '../../../components/UI/modal/BottomHalfModal';
import FilterProvider from '../FilterProvider';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getProviderProfile} from '../../../store/slices/Provider/ProviderProfile/singlePet/providerProfileAction';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
import DescriptionText from '../../../components/common/text/DescriptionText';
import AllProviderLoader from './AllProviderLoadingUI';
// import {getAllProvider} from '../../../store/slices/Provider/allProvider/getAllProvider';
interface Props {
  navigation: {
    navigate: (arg: string, arg1: {providerOpk: string}) => void;
  };
}

// const VIEWABILITY_CONFIG = {
//   minimumViewTime: 3000,
//   viewAreaCoveragePercentThreshold: 100,
//   waitForInteraction: true,
// };

// const PAGINATION_LIMIT = 1;

// const INITIAL_PARAMS = {
//   data: {
//     active: 1,
//   },
//   metadata: {
//     pagination: {
//       page: 1,
//       limit: PAGINATION_LIMIT,
//     },
//   },
//   restartPagination: true,
// };

const AllProvider = ({navigation}: Props) => {
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  // const {loading} = useAppSelector(state => state.providerProfile);
  const {allProvider, loading: getLoading} = useAppSelector(
    (state: any) => state.allProvider,
  );
  const dispatch = useAppDispatch();
  const providers = allProvider !== null && allProvider?.data;

  // useEffect(() => {
  //   // fetchActiveAds(INITIAL_PARAMS);
  // }, []);
  // useEffect(() => {
  //   if (!getLoading) {
  //     setIsRefreshing(false);
  //   }
  // }, [getLoading]);

  // const loadMoreResults = () => {
  //   const {page, per_page} = allProvider?.meta;
  //   const nextPage = page + 1;

  //   if (nextPage) {
  //     const params = {
  //       data: {
  //         active: 1,
  //       },
  //       metadata: {
  //         pagination: {
  //           page: nextPage,
  //           limit: PAGINATION_LIMIT,
  //         },
  //       },
  //       restartPagination: false,
  //     };
  //     dispatch(getAllProvider(params));
  //   }
  // };

  // const handleRefresh = () => {
  //   setIsRefreshing(true);
  //   getAllProvider(INITIAL_PARAMS);
  // };

  // render header
  const renderHeader = () => {
    return (
      <ShortText
        textStyle={{
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          color: Colors.gray,
        }}
        text={
          allProvider !== null
            ? `${allProvider?.meta.per_page} Results`
            : '20 Result'
        }
      />
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
              ListFooterComponent={<BottomSpacing />}
              ListHeaderComponent={renderHeader}
              // viewabilityConfig={VIEWABILITY_CONFIG}
              // onEndReached={loadMoreResults}
              // onEndReachedThreshold={0.8}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={isRefreshing}
              //     onRefresh={handleRefresh}
              // />
              // }
            />
          </>
        ) : (
          <DescriptionText
            text={allProvider}
            textStyle={{textAlign: 'center'}}
          />
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
