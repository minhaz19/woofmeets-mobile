/* eslint-disable react-native/no-inline-styles */
import {FlatList, Platform, StyleSheet} from 'react-native';
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
interface Props {
  navigation: {
    navigate: (arg: string, arg1: {providerOpk: string}) => void;
  };
}
const AllProvider = ({navigation}: Props) => {
  const {colors} = useTheme();
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  const {loading} = useAppSelector(state => state.providerProfile);
  const dispatch = useAppDispatch();

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <Screen
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <ShortText
          textStyle={{
            paddingVertical: Platform.OS === 'ios' ? 10 : 0,
            color: Colors.gray,
          }}
          text="20 Result"
        />
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
                  await dispatch(getProviderProfile('gzwnCRsg'));
                  navigation.navigate('ProviderNavigator', {
                    providerOpk: 'gzwnCRsg',
                  });
                }}
              />
            );
          }}
          ListFooterComponent={<BottomSpacing />}
        />
        <BottomHalfModal isModalVisible={filter}>
          <FilterProvider />
        </BottomHalfModal>
      </Screen>
    </>
  );
};

export default AllProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 10,
  },
});
