import React from 'react';

import BoardingDayAV from './components/BoardingDayAV';
import {useAppSelector} from '../../../../store/store';

const ServiceDaySlot = () => {
  const {userServices} = useAppSelector(state => state.services);
  const modDays = userServices.map((item: any) => ({
    id: item.serviceTypeId,
    days:
      item.AvailableDay.length !== 0
        ? item.AvailableDay.map((d: any) => [
            {id: 1, label: 'M', active: d.mon, key: 'mon'},
            {id: 2, label: 'T', active: d.tue, key: 'tue'},
            {id: 3, label: 'W', active: d.wed, key: 'wed'},
            {id: 4, label: 'T', active: d.thu, key: 'thu'},
            {id: 5, label: 'F', active: d.fri, key: 'fri'},
            {id: 6, label: 'S', active: d.sat, key: 'sat'},
            {id: 7, label: 'S', active: d.sun, key: 'sun'},
          ])
        : [
            {id: 1, label: 'M', active: false, key: 'mon'},
            {id: 2, label: 'T', active: false, key: 'tue'},
            {id: 3, label: 'W', active: false, key: 'wed'},
            {id: 4, label: 'T', active: false, key: 'thu'},
            {id: 5, label: 'F', active: false, key: 'fri'},
            {id: 6, label: 'S', active: false, key: 'sat'},
            {id: 7, label: 'S', active: false, key: 'sun'},
          ],
  }));
  return (
    <>
      {userServices.map((item: any, index: number) => (
        <BoardingDayAV
          key={index}
          title={item.serviceType.name}
          serviceTypeId={item.serviceTypeId}
          data={modDays[index]}
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
