import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import ProviderHeader from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderHeader';
// import ProviderFooter from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderFooter';
import ProviderTab from '../../../components/ScreenComponent/Service/ProviderProfile/ProvderTab';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../store/store';
// import ProviderStory from '../../../components/ScreenComponent/Service/ProviderProfile/ProviderStoryStatus/ProviderStory';
interface Props {
  route: any;
}
const ProviderProfile = ({route}: Props) => {
  const providerOpk = route?.params?.providerOpk;
  const {colors} = useTheme();
  const _renderHeader = () => null;
  const _renderFooter = () => (
    <View style={styles.infoContianer}>
      <ProviderHeader />
      <ProviderTab providerOpk={providerOpk} />
      {/* <ProviderFooter providerOpk={providerOpk} /> */}
    </View>
  );
  const navigation = useNavigation<any>();
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const handleSubmit = () => {
    if (isLoggedIn) {
      navigation.navigate('Appointment', {
        appointmentType: 'create',
        providerOpk: providerOpk,
      });
    } else {
      navigation.navigate('SignUp');
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => <View />}
        ListHeaderComponent={_renderHeader}
        ListFooterComponent={_renderFooter}
      />
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Hire This Sitter'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={handleSubmit}
        />
      </View>
    </View>
  );
};

export default ProviderProfile;

const styles = StyleSheet.create({
  container: {flex: 1},
  infoContianer: {
    paddingVertical: 10,
    paddingHorizontal:
      SCREEN_WIDTH > 800 ? '20%' : Platform.OS === 'ios' ? 20 : 30,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -20,
  },
  footerContainer: {
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
    right: 20,
    left: 20,
  },
});
