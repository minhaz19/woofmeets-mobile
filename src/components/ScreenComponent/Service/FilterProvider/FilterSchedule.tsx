import {StyleSheet, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {setScheduleId} from '../../../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
  title: string;
  data: any;
  name: string;
  setScheduleId?: (arg: number | null) => void;
}
const FilterSchedule = ({title, data}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <TitleText textStyle={styles.titleText} text={title} />
      <View style={styles.tabContainer}>
        {data.map((item: any, index: number) => (
          <Pressable
            onPress={() => {
              setActiveIndex(index);
              setScheduleId && dispatch(setScheduleId(index));
            }}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeIndex === index ? Colors.primary : Colors.border,
                borderColor:
                  activeIndex === index ? Colors.primary : Colors.border,
              },
            ]}
            key={index}>
            {item.Icon}
            <TitleText textStyle={styles.text} text={item.title} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default FilterSchedule;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 10,
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH - 50) / 2,
    borderRadius: 10,
  },
  titleText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
