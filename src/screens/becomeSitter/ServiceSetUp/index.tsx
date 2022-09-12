import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import SelectServiceTitle from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SelectServiceTitle';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';

const ServiceSetUp = (props: {
  navigation: {navigate: (arg0: string, arg1: any) => void};
  route: {params: any};
}) => {
  const {colors} = useTheme();
  const {itemId, name, image, description, serviceTypeId, providerServicesId} = props?.route?.params;
  const boardingSelection = [
    {
      title: 'Rates',
      checked: true,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('Rates', {
          itemId: itemId,
          name: name,
          image: image,
          description: description,
          serviceId: serviceTypeId,
          providerServicesId: providerServicesId,
        });
      },
    },
    {
      title: 'Availability',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('Availability', {
          itemId: itemId,
          name: name,
          image: image,
          description: description,
        });
      },
    },
    {
      title: 'Pet Preference',
      checked: false,
      icon: <ArrowRight />,
      screen: () => {
        props.navigation.navigate('PetPreference', {
          itemId: itemId,
          name: name,
          image: image,
          description: description,
        });
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
    <View
      style={[styles.rootContainer, {backgroundColor: colors.backgroundColor}]}>
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
  );
};

export default ServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
