import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import ShortText from '../../../common/text/ShortText';
import Text_Size from '../../../../constants/textScaling';
import {useAppSelector} from '../../../../store/store';
import Colors from '../../../../constants/Colors';
import AppCheckbox from '../../../common/Form/AppCheckbox';

interface Props {
  setSelectedService: any;
}
let modSelectedService: any = [];
const ServiceSlot = ({setSelectedService}: Props) => {
  const {userServices} = useAppSelector(state => state.services);
  const [servcies, setServices] = useState<any>([]);
  const handleOnChange = (id: number) => {
    const newHoliday = [...servcies];
    const index = newHoliday.findIndex(item => item.id === id);
    newHoliday[index].active = !newHoliday[index].active;
    setServices(newHoliday);
    const matchIndex = modSelectedService?.indexOf(id);
    if (matchIndex === -1) {
      modSelectedService.push(id);
    } else {
      modSelectedService.splice(matchIndex, 1);
    }
    setSelectedService([...modSelectedService]);
  };
  useEffect(() => {
    const modService = userServices?.map((item: any) => ({
      service: item.serviceType.name,
      id: item.id,
      active: false,
    }));

    setServices(modService);
  }, [userServices]);
  return (
    <View style={styles.parent}>
      {servcies?.map((item: any, index: number) => (
        <>
          <View key={index} style={styles.container}>
            <View style={styles.serviceContainer}>
              <AppCheckbox
                active={item.active}
                radio
                onPress={() => handleOnChange(item.id)}
                Comp={() => (
                  <View style={styles.serviceContainer}>
                    <View>
                      <View style={styles.textContainer}>
                        <TitleText
                          textStyle={styles.title}
                          text={item.service}
                        />
                        <ShortText text={'Tab to mark unavailable'} />
                      </View>
                    </View>
                    {/* <View style={styles.btnCont}>
                      {item.active ? (
                        <View style={styles.unMarkBtn}>
                          <TitleText
                            textStyle={styles.btnText}
                            text="Deselect"
                          />
                        </View>
                      ) : (
                        <View style={styles.markBtn}>
                          <TitleText textStyle={styles.btnText} text="Select" />
                        </View>
                      )}
                    </View> */}
                  </View>
                )}
              />
            </View>
          </View>
        </>
      ))}
    </View>
  );
};

export default ServiceSlot;

const styles = StyleSheet.create({
  parent: {width: '100%', padding: 10},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    // backgroundColor: Colors.primary,
  },
  serviceContainer: {
    flexDirection: 'row',
    // flex: 1,
  },
  textContainer: {
    // marginLeft: 10,
    // flex: 1,
  },
  title: {fontWeight: 'bold', fontSize: Text_Size.Text_1},
  unMarkBtn: {
    paddingVertical: 10,
    backgroundColor: Colors.gray,
    flex: 0,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  markBtn: {
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    flex: 0,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  btnCont: {width: '40%', marginLeft: 20},
});
