/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import Colors from '../../../../constants/Colors';
import Card from '../../../UI/Card';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';

interface Props {
  title: string;
  name: string;
  typeKey: number;
  onPress: () => void;
  active: boolean;
  selectDays: any;
}

const BoardingDay: FC<Props> = ({
  title,
  name,
  typeKey,
  onPress,
  active,
  selectDays,
}) => {
  const {colors} = useTheme();
  const {setValue, errors, onBlur} = useRHFContext(name);

  // const filteredDays = selectDays
  //         ?.filter((item: any) => {
  //           return item.checked;
  //         })
  //         .map((item: any) => {
  //           return item.id;
  //         });
  // // console.log('filteredValue', filteredDays);
  // console.log('values', values);

  // useEffect(() => {
  //   setValue(name, filteredDays);
  // }, [filteredDays, setValue, name]);

  return (
    <View style={styles.rootContainer}>
      <Card style={styles.cardSetting}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onPress();
          }}
          onBlur={onBlur}>
          <View
            style={[
              styles.container,
              active
                ? {
                    borderColor: Colors.primary,
                    backgroundColor: colors.backgroundColor,
                  }
                : {
                    backgroundColor: colors.backgroundColor,
                    borderColor: Colors.gray,
                  },
            ]}>
            <Text style={[styles.text, {color: colors.descriptionText}]}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
      {/* {typeKey === 29 && ( */}
      <View style={styles.errorContainer}>
        <ErrorMessage error={errors[name]?.message} />
      </View>
      {/* )} */}
    </View>
  );
};

export default BoardingDay;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
  cardSetting: {
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    elevation: Platform.OS === 'android' ? 8 : 1,
  },
  rootContainer: {
    position: 'relative',
  },
  errorContainer: {
    marginVertical: 20,
    position: 'absolute',
    flex: 0,
    width: 200,
    left: 0,
    top: 15,
  },
});
