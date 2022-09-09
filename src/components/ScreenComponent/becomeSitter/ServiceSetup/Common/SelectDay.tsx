/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo} from 'react';
import {Controller} from 'react-hook-form';
import Card from '../../../../UI/Card';
import { useTheme } from '../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../constants/Colors';
import Text_Size from '../../../../../constants/textScaling';

interface Props {
  title: string;
  name: string;
  typeKey: number;
  onPress: () => void;
  active: boolean;
  selectDays: any;
  control: any;
}

const SelectDay: FC<Props> = ({
  title,
  name,
  onPress,
  active,
  selectDays,
  control,
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.rootContainer}>
      <Controller
        control={control}
        render={({field: {onBlur}}) => (
          <Card style={styles.cardSetting}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPress}
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
        )}
        name={name}
      />
    </View>
  );
};

export default memo(SelectDay);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: '#ccc',
    width: 50,

  },
  text: {
    fontSize: Text_Size.Text_0,
    alignSelf: 'center',
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
