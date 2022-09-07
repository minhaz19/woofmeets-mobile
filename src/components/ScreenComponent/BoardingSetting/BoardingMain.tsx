/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BigText from '../../common/text/BigText';
import HeaderText from '../../common/text/HeaderText';
import {
  availabilityInput,
  beforeBookingDays,
} from './utils/BoardingData/BoardingData';
import DescriptionText from '../../common/text/DescriptionText';
import BoardingDay from './Common/BoardingDay';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import BoardingCheckbox from './Common/BoardingCheckbox';
import ErrorMessage from '../../common/Form/ErrorMessage';
import AppSelectField from '../../common/Form/AppSelectField';

interface Props {
  handleActiveCheck: (parentId: number, key: number) => void;
  handleSelectDaysActiveCheck: (typeId: number, optionsType: any) => void;
  selectDays: any;
  active0: any;
  active2: any;
  errors: any;
  control: any;
  setValue: (arg1: string, arg2: any, arg3: any) => void;
}

const BoardingMain = ({
  selectDays,
  active0,
  active2,
  handleActiveCheck,
  handleSelectDaysActiveCheck,
  errors,
  control,
  setValue,
}: Props) => {
  return (
    <View>
      <BigText text={'Availability'} textStyle={styles.headerText} />
      <View>
        <HeaderText text={availabilityInput[0].title} />
        <View style={styles.fullTimeContainer}>
          {availabilityInput[0].options?.map((item, index) => {
            return (
              <BoardingCheckbox
                title={item.type}
                key={index}
                square={availabilityInput[0].square}
                radio={availabilityInput[0].radio}
                typeKey={item.id}
                active={availabilityInput[0].id === 100 && active0[item.id]}
                onPress={() => handleActiveCheck(100, item.id)}
                name={availabilityInput[0].name!}
                handleActiveMultipleCheck={() => {}}
                control={control}
                setValue={setValue}
              />
            );
          })}
        </View>
        <ErrorMessage error={errors[availabilityInput[0].name!]?.message} />
        {availabilityInput[0].linkTitle && (
          <TouchableOpacity>
            <DescriptionText
              text={availabilityInput[0].linkTitle}
              textStyle={styles.linkText}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: '2%'}}>
        <HeaderText
          text={availabilityInput[1].title}
          textStyle={styles.subHeaderText}
        />
        {availabilityInput[1].subtitle && (
          <DescriptionText
            text={availabilityInput[1].subtitle}
            textStyle={styles.subHeaderText}
          />
        )}
        <View style={styles.dayBoxContainer}>
          {availabilityInput[1].options?.map((item, index) => (
            <BoardingDay
              key={index}
              title={item.type}
              name={availabilityInput[1].name}
              typeKey={item.id}
              active={item.checked}
              selectDays={selectDays.items}
              onPress={() =>
                handleSelectDaysActiveCheck(
                  item.id,
                  availabilityInput[1].options,
                )
              }
              control={control}
              setValue={setValue}
            />
          ))}
        </View>
        <ErrorMessage error={errors[availabilityInput[1].name!]?.message} />
      </View>
      <View style={styles.headerContainer}>
        <HeaderText text={availabilityInput[2].title} />
        {availabilityInput[2].options?.map((item, index) => {
          return (
            <BoardingCheckbox
              title={item.type}
              key={index}
              square={availabilityInput[2].square}
              radio={availabilityInput[2].radio}
              typeKey={item.id}
              active={availabilityInput[2].id === 102 && active2[item.id]}
              onPress={() => handleActiveCheck(102, item.id)}
              name={availabilityInput[2].name!}
              control={control}
              setValue={setValue}
              handleActiveMultipleCheck={() => {}}
            />
          );
        })}
      </View>
      <ErrorMessage error={errors[availabilityInput[2].name!]?.message} />
      {availabilityInput[3].select && (
        <View>
          <DescriptionText
            text={availabilityInput[3].linkTitle}
            textStyle={styles.linkText}
          />
          <AppSelectField
            label={availabilityInput[3].title}
            name={availabilityInput[3].name}
            placeholder={availabilityInput[3].placeholder}
            data={beforeBookingDays}
            control={control}
          />
        </View>
      )}
    </View>
  );
};

export default BoardingMain;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
    lineHeight: 20,
  },
  subHeaderText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
    lineHeight: 20,
  },
  subtitle: {
    paddingBottom: '1%',
    lineHeight: 20,
  },
  linkText: {
    color: Colors.light.blue,
    marginVertical: '2%',
    lineHeight: 20,
  },
  dayBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: '2%',
  },
  fullTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
