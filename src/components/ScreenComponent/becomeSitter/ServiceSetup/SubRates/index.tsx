import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import {
  basicRates,
  RatesInput,
} from '../../../../../utils/config/Data/boardingData';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
import ServiceForm from '../Common/ServiceForm';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';

interface Props {
  handleRates: () => void;
}

const SubRates = ({handleRates}: Props) => {
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  const [showAdditionalRates, setShowAdditionalRates] = useState(true);
  const handlePress = () => {
    setShowAdditionalRates(!showAdditionalRates);
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        <BigText text={'Rates'} textStyle={styles.headerText} />
        {basicRates.map((item, index) => {
          return (
            <ServiceForm
              key={index}
              autoCapitalize="none"
              autoCorrect={false}
              checkbox={item.checkbox}
              icon={item.icon}
              linkText={item.linkText}
              additionalRates={item.additionalRates}
              shortText={item.shortText}
              keyboardType={'numeric'}
              textContentType={'none'}
              name={item.name}
              label={item.title}
              handlePress={handlePress}
              showAdditionalRates={showAdditionalRates}
              control={control}
              errors={errors}
              setValue={setValue}
            />
          );
        })}
        {!showAdditionalRates &&
          RatesInput.map((item, index) => {
            return (
              <ServiceForm
                key={index}
                autoCapitalize="none"
                autoCorrect={false}
                icon={item.icon}
                keyboardType={'numeric'}
                checkbox={item.checkbox}
                textContentType={'none'}
                name={item.name}
                label={item.title}
                handlePress={handlePress}
                showAdditionalRates={showAdditionalRates}
                control={control}
                errors={errors}
                setValue={setValue}
              />
            );
          })}
        <View>
          {!showAdditionalRates && (
            <DescriptionText
              text={'How are additional rates used ?'}
              textStyle={styles.linkText}
            />
          )}
          {!showAdditionalRates && (
            <TouchableOpacity onPress={handlePress}>
              <DescriptionText
                text="Hide additional rates"
                textStyle={{color: Colors.primary}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.submitContainer}>
        <SubmitButton title="Save & continue" onPress={handleRates} />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default SubRates;

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
  linkText: {
    color: Colors.primary,
    marginVertical: '2%',
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  infoText: {
    paddingLeft: 10,
    fontSize: Text_Size.Text_8,
  },
  submitContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '6%' : '3%',
  },
});
