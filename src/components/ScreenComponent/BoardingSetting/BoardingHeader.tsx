import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../common/text/BigText';
import HeaderText from '../../common/text/HeaderText';
import {InfoSvg} from '../Inbox/utils/SvgComponent/SvgComponent';
import ShortText from '../../common/text/ShortText';
import {Rates, RatesInput} from './utils/BoardingData/BoardingData';
import BoardingForm from './Common/BoardingForm';
import DescriptionText from '../../common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Text_Size from '../../../constants/textScaling';

interface Props {
  control: any;
  errors: any;
  setValue: (arg1: any, arg2: any, arg3: any) => void;
}

const BoardingHeader = ({control, errors, setValue}: Props) => {
  const [showAdditionalRates, setShowAdditionalRates] = useState(true);
  const handlePress = () => {
    setShowAdditionalRates(!showAdditionalRates);
  };
  return (
    <View>
      <BigText text={'Boarding Setting'} textStyle={styles.headerText} />
      <HeaderText
        text={'Overnight pet care on your home'}
        textStyle={styles.subHeaderText}
      />
      <View style={styles.infoContainer}>
        <InfoSvg height={16} width={16} />
        <ShortText
          text={
            'We have suggested some default settings based on what works well for new sitters and walkers. You can edit now, or at any time in the future.'
          }
          textStyle={styles.infoText}
        />
      </View>
      <View style={styles.headerContainer}>
        <BigText text={'Rates'} textStyle={styles.headerText} />
        {Rates.map((item, index) => {
          return (
            <BoardingForm
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
              <BoardingForm
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
    </View>
  );
};

export default BoardingHeader;

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
    color: Colors.light.blue,
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
});
