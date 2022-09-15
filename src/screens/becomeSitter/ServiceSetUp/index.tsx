import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import SelectServiceTitle from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SelectServiceTitle';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import {useServiceSetup} from './useServiceSetup';
import {useAppSelector} from '../../../store/store';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';

const ServiceSetUp = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {colors} = useTheme();
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {itemId, name, image, description, service} = serviceSetup.routeData;
  const serviceId = service.map((data: {id: any}) => data.id);
  const {petPreferenceLoader, availabilityLoader} = useServiceSetup(serviceId);
  const boardingSelection = useAppSelector(
    state => state.initial.boardingSelection,
  );

  return (
    <>
      {availabilityLoader && <AppActivityIndicator visible={true} />}
      {petPreferenceLoader && <AppActivityIndicator visible={true} />}
      <View
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <View style={styles.innerContainer}>
          {/* completed */}
          {boardingSelection.map(
            item =>
              item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  handleClick={item.onPress}
                />
              ),
          )}
          {/* not completed */}
          {boardingSelection.map(
            item =>
              !item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  handleClick={item.onPress}
                />
              ),
          )}
        </View>
        {boardingSelection.map(item => {
          if (item.inProgress) {
            return (
              <View key={item.id} style={{flex: 1}}>
                <item.screen />
              </View>
            );
          }
        })}
        {/* <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        /> */}
        {/* <View>
          {boardingSelection?.map((item, index) => (
            <SelectServiceTitle
              key={index}
              title={item.title}
              icon={item.icon}
              checked={item.checked}
              screen={item.screen}
            />
          ))}
        </View> */}
      </View>
    </>
  );
};

export default ServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
