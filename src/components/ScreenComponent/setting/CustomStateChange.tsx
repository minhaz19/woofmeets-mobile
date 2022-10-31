/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Modal, View, Pressable, Platform} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../common/text/TitleText';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {Picker} from '@react-native-picker/picker';
import Text_Size from '../../../constants/textScaling';

interface Props {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  title: string;
  setValue: any;
  setIsState?: (arg: any) => void;
  name: string;
  data: any;
  value?: any;
}

const CustomStateChange = ({
  visible,
  setVisible,
  title,
  setValue,
  setIsState,
  name,
  data,
  value,
}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const [selectedItem, setSelectedItem] = useState(value);
  const handleState = (itemValue: string) => {
    setIsState && setIsState(itemValue);
    setSelectedItem(itemValue);
    setValue(name, itemValue);
  };
  return (
    <View>
      <Modal animated transparent visible={visible} animationType="fade">
        <Pressable style={styles.container} onPress={() => setVisible(false)} />
        <TitleText
          text={title}
          textStyle={{
            borderTopColor: Colors.primary,
            borderTopWidth: 2,
            fontWeight: 'bold',
            fontSize: Text_Size.Text_1,
            padding: 20,
            backgroundColor: isDarkMode
              ? Colors.lightDark
              : colors.backgroundColor,
          }}
        />
        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.lightDark
                : colors.backgroundColor,
            },
          ]}>
          <View style={styles.halfCont}>
            <Picker selectedValue={selectedItem} onValueChange={handleState}>
              {data.map((item: any, index: number) => (
                <Picker.Item
                  value={item.value}
                  label={item.label}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomStateChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  pickerContainer: {
    height: Platform.OS === 'ios' ? 250 : 150,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  halfCont: {width: '50%'},
  label: {
    textTransform: 'capitalize',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginLeft: 10,
  },
});
