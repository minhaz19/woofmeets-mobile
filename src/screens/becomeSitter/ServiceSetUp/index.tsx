import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import SelectServiceTitle from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SelectServiceTitle';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import {useServiceSetup} from './useServiceSetup';
import {useAppSelector} from '../../../store/store';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const ServiceSetUp = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => void};
}) => {
  const {colors} = useTheme();
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {itemId, name, image, description, service} = serviceSetup.routeData;
  const serviceId = service.map((data: {id: any}) => data.id);
  const {petPreferenceLoader, availabilityLoader} = useServiceSetup(serviceId);
  // console.log(
  //   'petPreferenceLoader, availabilityLoader',
  //   petPreferenceLoader,
  //   availabilityLoader,
  // );
  const boardingSelection = [
    {
      title: 'Rates',
      checked: true,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('Rates');
      },
    },
    {
      title: 'Availability',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('Availability', {availabilityLoader});
      },
    },
    {
      title: 'Pet Preference',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('PetPreference', {petPreferenceLoader});
      },
    },
    {
      title: 'Your Home',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('YourHome', {
          itemId: itemId,
          name: name,
          image: image,
          description: description,
        });
      },
    },
    {
      title: 'Cancellation Policy',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('CancellationPolicy', {
          itemId: itemId,
          name: name,
          image: image,
          description: description,
        });
      },
    },
  ];
  return (
    <>
      {availabilityLoader && <AppActivityIndicator visible={true} />}
      {petPreferenceLoader && <AppActivityIndicator visible={true} />}
      <View
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        <View>
          {boardingSelection?.map((item, index) => (
            <SelectServiceTitle
              key={index}
              title={item.title}
              icon={item.icon}
              checked={item.checked}
              screen={item.screen}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default ServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
