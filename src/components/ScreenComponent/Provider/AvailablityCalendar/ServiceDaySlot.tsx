import React from 'react';

import BoardingDayAV from './components/BoardingDayAV';
import {useAppSelector} from '../../../../store/store';
interface Props {
  setValue: any;
}
const ServiceDaySlot = ({setValue}: Props) => {
  const {userServices} = useAppSelector(state => state.services);
  const modDays = userServices?.map((item: any) => ({
    id: item.serviceTypeId,
    days:
      item.AvailableDay.length !== 0
        ? item.AvailableDay.map((d: any) => [
            {id: 1, label: 'M', putServiceId: d.id, active: d.mon, key: 'mon'},
            {id: 2, label: 'T', putServiceId: d.id, active: d.tue, key: 'tue'},
            {id: 3, label: 'W', putServiceId: d.id, active: d.wed, key: 'wed'},
            {id: 4, label: 'T', putServiceId: d.id, active: d.thu, key: 'thu'},
            {id: 5, label: 'F', putServiceId: d.id, active: d.fri, key: 'fri'},
            {id: 6, label: 'S', putServiceId: d.id, active: d.sat, key: 'sat'},
            {id: 7, label: 'S', putServiceId: d.id, active: d.sun, key: 'sun'},
          ])
        : [
            [
              {
                id: 1,
                label: 'M',
                putServiceId: null,
                active: false,
                key: 'mon',
              },
              {
                id: 2,
                label: 'T',
                putServiceId: null,
                active: false,
                key: 'tue',
              },
              {
                id: 3,
                label: 'W',
                putServiceId: null,
                active: false,
                key: 'wed',
              },
              {
                id: 4,
                label: 'T',
                putServiceId: null,
                active: false,
                key: 'thu',
              },
              {
                id: 5,
                label: 'F',
                putServiceId: null,
                active: false,
                key: 'fri',
              },
              {
                id: 6,
                label: 'S',
                putServiceId: null,
                active: false,
                key: 'sat',
              },
              {
                id: 7,
                label: 'S',
                putServiceId: null,
                active: false,
                key: 'sun',
              },
            ],
          ],
  }));
  return (
    <>
      {userServices?.map((item: any, index: number) => (
        <BoardingDayAV
          key={index}
          title={item.serviceType.name}
          serviceTypeId={item.serviceTypeId}
          data={modDays[index]}
          setValue={setValue}
        />
      ))}
    </>
  );
};

export default ServiceDaySlot;

// {/* <View style={styles.parent}>
//       {servcies.map((item: any, index: number) => (
//         <View key={index}>
//           <View key={index} style={styles.container}>
//             <View style={styles.serviceContainer}>
//               <View style={styles.textContainer}>
//                 <TitleText textStyle={styles.title} text={item.serivce} />
//                 {/* <ShortText text={'0 of 5 booked '} /> */}
//               </View>
//             </View>
//             <View>
//               <SwitchView
//                 isActive={item.active}
//                 activeText=""
//                 inActiveText=""
//                 onSelect={() => {
//                   handleOnChange(item.id);
//                 }}
//               />
//             </View>
//           </View>
//           <View style={styles.multiSelect}>
//             {days.map((it: any, i: number) => (
//               <Pressable
//                 onPress={() => handleMultiSelect(it.id)}
//                 key={i}
//                 style={{
//                   flex: 1,
//                   borderWidth: 2,
//                   marginHorizontal: 3,
//                   padding: 10,
//                   borderRadius: 6,
//                   backgroundColor: it.active ? 'black' : 'white',
//                 }}>
//                 <TitleText
//                   textStyle={{
//                     textAlign: 'center',
//                     color: it.active ? 'white' : 'black',
//                   }}
//                   text={it.label}
//                 />
//               </Pressable>
//             ))}
//             {/* {item.active && <View></View>} */}
//           </View>
//         </View>
//       ))}
//     </View> */}
