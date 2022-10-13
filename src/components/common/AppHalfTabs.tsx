import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from './text/TitleText';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Text_Size from '../../constants/textScaling';
import {useFormContext} from 'react-hook-form';

interface Props {
  title: string;
  data: any;
  name: string;
  setScheduleId?: (arg: number | null) => void;
  setVisitId?: (arg: number | null) => void;
}
const AppHalfTabs = ({data, title, name, setScheduleId}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {setValue} = useFormContext();
  return (
    <View style={styles.container}>
      <TitleText textStyle={styles.titleText} text={title} />
      <View style={styles.tabContainer}>
        {data.map((item: any, index: number) => (
          <Pressable
            onPress={() => {
              setActiveIndex(index);
              setScheduleId && setScheduleId(index);
              setValue(name, item.value);
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

export default AppHalfTabs;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 20,
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
