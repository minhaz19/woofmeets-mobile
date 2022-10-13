import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
import InputItem from '../../../components/ScreenComponent/reports/Cards/InputItem';
import StaticMap from '../map/NavigateMap';
import {useAppSelector} from '../../../store/store';
import getLiveLocation from '../map/helperFunction/getCurrentLocation';

const ReportCardInitial = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      sequence: 1,
      name: 'Pee',
    },
    {
      id: 2,
      sequence: 2,
      name: 'Poo',
    },
    {
      id: 3,
      sequence: 3,
      name: 'Food',
    },
    {
      id: 4,
      sequence: 4,
      name: 'Water',
    },
  ]);
  const [sequence, setSequence] = useState<number>(0);
  const currentUserLocation = useAppSelector(
    state => state.address.currentUserLocation,
  );
  useEffect(() => {}, [currentUserLocation]);

  const onPressService = (data: any) => {
    setSequence(data?.id);
  };
  getLiveLocation();
  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <View style={styles.tabContainer}>
        {items.map(item => (
          <InputItem
            key={item.id}
            data={item}
            noShadow
            onPressEvent={onPressService}
            sequence={sequence}
          />
        ))}
      </View>
      <View style={{height: 200}}>
        <StaticMap />
      </View>
      <BottomSpacing />
    </ScreenRapperGrey>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 16,
  },
});
export default ReportCardInitial;
