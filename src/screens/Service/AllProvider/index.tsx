/* eslint-disable react-native/no-inline-styles */
import {FlatList, Platform, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ProviderList from '../../../components/ScreenComponent/Service/AllProvider/ProviderList';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {providers} from '../../../utils/config/Data/providers';
import BottomHalfModal from '../../../components/UI/modal/BottomHalfModal';
import FilterProvider from '../FilterProvider';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getProviderProfile} from '../../../store/slices/Provider/ProviderProfile/singlePet/providerProfileAction';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
interface Props {
  navigation: {
    navigate: (arg: string, arg1: {providerOpk: string}) => void;
  };
}
const AllProvider = ({navigation}: Props) => {
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  // const {loading} = useAppSelector(state => state.providerProfile);
  const {allProvider, loading: getLoading} = useAppSelector(
    (state: any) => state.allProvider,
  );
  console.log('----------------', allProvider);
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const renderHeader = () => {
    return (
      <ShortText
        textStyle={{
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          color: Colors.gray,
        }}
        text="20 Result"
      />
    );
  };

  return (
    <ScreenRapperGrey>
      {getLoading && <AppActivityIndicator visible={true} />}
      <Screen style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={providers}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => {
            return (
              <ProviderList
                image={item.image}
                pricing={item.pricing}
                rating={item.rating}
                distance={item.distance}
                nature={item.nature}
                name={item.name}
                availablity={item.availablity}
                repeatClient={item.repeatClient}
                onPress={async () => {
                  await dispatch(getProviderProfile('2NzBcMvn'));
                  navigation.navigate('ProviderNavigator', {
                    providerOpk: '2NzBcMvn',
                  });
                  // await dispatch(getProviderProfile('xCMyOqAm'));
                  // navigation.navigate('ProviderNavigator', {
                  //   providerOpk: 'xCMyOqAm',
                  // });
                }}
              />
            );
          }}
          ListFooterComponent={<BottomSpacing />}
          ListHeaderComponent={renderHeader}
        />
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
