/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import BoardingDayAV from './components/BoardingDayAV';
import {useAppSelector} from '../../../../store/store';
import BottomSpacing from '../../../UI/BottomSpacing';
import TitleText from '../../../common/text/TitleText';
import {View} from 'react-native';
interface Props {
  setValue: any;
}
const ServiceDaySlot = ({setValue}: Props) => {
  const {serviceDays} = useAppSelector(state => state.serviceDays);

  const modDays = serviceDays?.map((item: any) => ({
    id: item.service.serviceTypeId,
    days: [
      {id: 1, label: 'M', putServiceId: item.id, active: item.mon, key: 'mon'},
      {id: 2, label: 'T', putServiceId: item.id, active: item.tue, key: 'tue'},
      {id: 3, label: 'W', putServiceId: item.id, active: item.wed, key: 'wed'},
      {id: 4, label: 'T', putServiceId: item.id, active: item.thu, key: 'thu'},
      {id: 5, label: 'F', putServiceId: item.id, active: item.fri, key: 'fri'},
      {id: 6, label: 'S', putServiceId: item.id, active: item.sat, key: 'sat'},
      {id: 7, label: 'S', putServiceId: item.id, active: item.sun, key: 'sun'},
    ],
  }));
  return (
    <>
      {modDays.length === 0 ? (
        <View
          style={{
            marginTop: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TitleText
            textStyle={{
              fontWeight: 'bold',
            }}
            text={'Please setup service availability from your profile'}
          />
        </View>
      ) : (
        serviceDays?.map((item: any, index: number) => (
          <BoardingDayAV
            key={index}
            title={item.service.serviceType.name}
            serviceTypeId={item.service.serviceTypeId}
            data={modDays[index]}
            setValue={setValue}
          />
        ))
      )}
      {modDays.length <= 2 && (
        <>
          <BottomSpacing />
          <BottomSpacing />
        </>
      )}
    </>
  );
};

export default ServiceDaySlot;
