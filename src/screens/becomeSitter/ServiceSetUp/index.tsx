import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import SelectServiceTitle from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SelectServiceTitle';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';

const ServiceSetUp = (props: {
  navigation: {
    navigate: (
      arg0: string,
      arg1?: {serviceId: string; providerServicesId?: string},
    ) => void;
  };
  route: {params: {serviceData: any; providerServicesId: any}};
}) => {
  const {colors} = useTheme();
  const boardingSelection = [
    {
      title: 'Rates',
      checked: true,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('Rates', {
          serviceId: props.route.params.serviceData.serviceTypeId,
          providerServicesId: props.route.params.serviceData.providerServicesId,
        });
      },
    },
    {
      title: 'Availability',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('Availability', {
          serviceId: props.route.params.serviceData.serviceTypeId,
        });
      },
    },
    {
      title: 'Pet Preference',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('PetPreference');
      },
    },
    {
      title: 'Your Home',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('YourHome');
      },
    },
    {
      title: 'Cancellation Policy',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('CancellationPolicy');
      },
    },
  ];
  return (
    <View
      style={[styles.rootContainer, {backgroundColor: colors.backgroundColor}]}>
      <ReusableHeader />
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
  );
};

export default ServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
