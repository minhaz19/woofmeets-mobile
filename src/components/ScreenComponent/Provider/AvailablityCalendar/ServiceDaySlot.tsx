import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppCheckbox from '../../../common/Form/AppCheckbox';
import TitleText from '../../../common/text/TitleText';
import ShortText from '../../../common/text/ShortText';
import Text_Size from '../../../../constants/textScaling';
import {Text} from '@rneui/base';
import SwitchView from '../../../common/switch/SwitchView';
import {Switch} from '../../../common/switch/Switch';
import AppSwitch from '../../../common/AppSwitch';
import AppMultiSelectField from '../../../common/Form/AppMultiSelectField';
import {useForm} from 'react-hook-form';
const serviceData = [
  {
    serivce: 'Boarding',
    active: false,
    id: 0,
  },
  {
    serivce: 'House Sitting',
    active: false,
    id: 1,
  },
  {
    serivce: 'Drop-In Visits',
    active: false,
    id: 2,
  },
  {
    serivce: 'Doggy Day Care',
    active: false,
    id: 3,
  },
  {
    serivce: 'Dog Walking',
    active: false,
    id: 4,
  },
];
const data = [
  {label: 'Saturday', value: '1'},
  {label: 'Sunday', value: '2'},
  {label: 'Monday', value: '3'},
  {label: 'Tuesday', value: '4'},
  {label: 'Wednesday', value: '4'},
  {label: 'Thursday', value: '5'},
  {label: 'Friday', value: '6'},
];
const ServiceDaySlot = () => {
  const [servcies, setServices] = useState<any>(serviceData);

  const handleOnChange = (id: number) => {
    const newHoliday = [...servcies];
    const index = newHoliday.findIndex(item => item.id === id);
    newHoliday[index].active = !newHoliday[index].active;
    setServices(newHoliday);
  };
  const {control, setValue} = useForm();
  return (
    <View style={styles.parent}>
      {servcies.map((item: any, index: number) => (
        <View key={index}>
          <View key={index} style={styles.container}>
            <View style={styles.serviceContainer}>
              <View style={styles.textContainer}>
                <TitleText textStyle={styles.title} text={item.serivce} />
                {/* <ShortText text={'0 of 5 booked '} /> */}
              </View>
            </View>
            <View>
              <SwitchView
                isActive={item.active}
                activeText=""
                inActiveText=""
                onSelect={() => {
                  handleOnChange(item.id);
                }}
              />
            </View>
          </View>
          <View style={styles.multiSelect}>
            {item.active && (
              <AppMultiSelectField
                title="Breeds"
                name={''}
                control={control}
                setValue={setValue}
                placeholder="Select Breeds"
                data={data}
                // search={false}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ServiceDaySlot;

const styles = StyleSheet.create({
  parent: {width: '100%', padding: 10},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  serviceContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {fontWeight: 'bold', fontSize: Text_Size.Text_1},
  multiSelect: {
    paddingHorizontal: 10,
  },
});
