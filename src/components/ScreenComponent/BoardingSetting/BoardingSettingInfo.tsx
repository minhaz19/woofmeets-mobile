/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import BoardingForm from './Common/BoardingForm';
import AppForm from '../../common/Form/AppForm';
import HeaderText from '../../common/text/HeaderText';
import Text_Size from '../../../constants/textScaling';
import {InfoSvg} from '../Inbox/utils/SvgComponent/SvgComponent';
import ShortText from '../../common/text/ShortText';
import BigText from '../../common/text/BigText';
import BottomSpacing from '../../UI/BottomSpacing';
import {
  aboutYourHome,
  availabilityInput,
  beforeBookingDays,
  CancellationPolicy,
  petPreference,
  Rates,
  RatesInput,
} from './utils/BoardingData/BoardingData';
import DescriptionText from '../../common/text/DescriptionText';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
import useHandleCheck from '../../../utils/helpers/usehandleActiveCheck';
import SubmitButton from '../../common/Form/SubmitButton';
import BoardingDay from './Common/BoardingDay';
import BoardingDropdown from './Common/BoardingDropDown';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import useHandleMultipleActiveCheck from './utils/handleCheck/HandleCheck';
import BoardingPetQuantity from './Common/BoardingPetQuantity';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const BoardingSettingInfo: FC<Props> = ({
  handleSubmit,
  initialValues,
  validationSchema,
}) => {
  const {handleActiveCheck, active0, active2, active3, active4, active7} =
    useHandleCheck();
  const [showAdditionalRates, setShowAdditionalRates] = useState(true);
  const handlePress = () => {
    setShowAdditionalRates(!showAdditionalRates);
  };

  const {
    selectDays,
    handlePetHostingActiveCheck,
    handlePetOwnerExpectationActiveCheck,
    handleSelectDaysActiveCheck,
  } = useHandleMultipleActiveCheck();

  const BoardingHeader = () => {
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
                placeholder={item.placeholder}
                textContentType={'none'}
                name={item.name}
                label={item.title}
                handlePress={handlePress}
                showAdditionalRates={showAdditionalRates}
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
                  placeholder={item.placeholder}
                  checkbox={item.checkbox}
                  textContentType={'none'}
                  name={item.name}
                  label={item.title}
                  handlePress={handlePress}
                  showAdditionalRates={showAdditionalRates}
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

  const BoardingFooter = () => {
    return (
      <View style={styles.headerContainer}>
        <BigText text={'Pet Preferences'} textStyle={styles.headerText} />
        <TouchableOpacity>
          <DescriptionText
            text={'How should I set preference?'}
            textStyle={styles.linkText}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <HeaderText
            textStyle={styles.headerText}
            text={'How many pets per day can host in your home?'}
          />
          <BoardingPetQuantity name={'petQuantity'} />
        </View>
        <HeaderText
          textStyle={styles.subtitle}
          text={petPreference[0].title!}
        />
        <DescriptionText
          text={petPreference[0].subtitle}
          textStyle={styles.subtitle}
        />
        {petPreference[0].options.map((item, index) => {
          return (
            <AppCheckboxField
              title={item.type}
              key={index}
              square
              typeKey={item.id}
              active={item.checked}
              onPress={() =>
                handlePetHostingActiveCheck(item.id, petPreference[0].options)
              }
              name={petPreference[0].name!}
            />
          );
        })}
        <View style={styles.headerContainer}>
          <BigText text={'About your home'} textStyle={styles.headerText} />
          {aboutYourHome.map((item, index) => {
            return (
              <View key={index}>
                <HeaderText
                  text={item.title!}
                  textStyle={{marginTop: 10, marginBottom: 6}}
                />
                {item.subtitle && <DescriptionText text={item.subtitle} />}
                <View>
                  {item.options.map((type, i) => {
                    return (
                      <View key={i}>
                        <AppCheckboxField
                          title={type.type}
                          radio={item.radio}
                          square={item.square}
                          typeKey={type.id}
                          active={
                            item.id === 103 || item.id === 104
                              ? (item.id === 103 && active3[type.id]) ||
                                (item.id === 104 && active4[type.id])
                              : // @ts-ignore
                                type.checked
                          }
                          onPress={() =>
                            item.id === 103 || item.id === 104
                              ? handleActiveCheck(item.id, type.id)
                              : handlePetOwnerExpectationActiveCheck(
                                  type.id,
                                  item.options,
                                )
                          }
                          name={item.name}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        <View>
          <View style={styles.footerContainer}>
            <BigText
              text={'Cancellation Policy'}
              textStyle={styles.headerText}
            />
            <DescriptionText
              text={'What do this mean?'}
              textStyle={styles.linkText}
            />
            <HeaderText
              text={CancellationPolicy[0].title}
              textStyle={styles.subHeaderText}
            />
            {CancellationPolicy[0].options.map((item, index) => {
              return (
                <AppCheckboxField
                  title={item.type}
                  key={index}
                  square={CancellationPolicy[0].square}
                  radio={CancellationPolicy[0].radio}
                  typeKey={item.id}
                  active={CancellationPolicy[0].id === 107 && active7[item.id]}
                  onPress={() => handleActiveCheck(107, item.id)}
                  name={CancellationPolicy[0].name!}
                />
              );
            })}
            <DescriptionText
              text={
                'Note : service providers ( e.g. sitters ) must abide by applicable laws and regulations.'
              }
              textStyle={{marginTop: 6}}
            />
            <TouchableOpacity>
              <DescriptionText
                text={'Terms of Service'}
                textStyle={styles.linkText}
              />
            </TouchableOpacity>
          </View>
          <View>
            <SubmitButton title="Save" />
          </View>
          <BottomSpacing />
        </View>
      </View>
    );
  };

  const BoardingMain = () => {
    return (
      <View>
        <BigText text={'Availability'} textStyle={styles.headerText} />
        <View>
          <HeaderText text={availabilityInput[0].title} />
          <View style={styles.fullTimeContainer}>
            {availabilityInput[0].options?.map((item, index) => {
              return (
                <AppCheckboxField
                  title={item.type}
                  key={index}
                  square={availabilityInput[0].square}
                  radio={availabilityInput[0].radio}
                  typeKey={item.id}
                  active={availabilityInput[0].id === 100 && active0[item.id]}
                  onPress={() => handleActiveCheck(100, item.id)}
                  name={availabilityInput[0].name!}
                />
              );
            })}
          </View>
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
              />
            ))}
          </View>
        </View>
        <View style={styles.headerContainer}>
          <HeaderText text={availabilityInput[2].title} />
          {availabilityInput[2].options?.map((item, index) => {
            return (
              <AppCheckboxField
                title={item.type}
                key={index}
                square={availabilityInput[2].square}
                radio={availabilityInput[2].radio}
                typeKey={item.id}
                active={availabilityInput[2].id === 102 && active2[item.id]}
                onPress={() => handleActiveCheck(102, item.id)}
                name={availabilityInput[2].name!}
              />
            );
          })}
        </View>
        {availabilityInput[3].select && (
          <View>
            <DescriptionText
              text={availabilityInput[3].linkTitle}
              textStyle={styles.linkText}
            />
            <BoardingDropdown
              label={availabilityInput[3].title}
              name={availabilityInput[3].name}
              placeholder={availabilityInput[3].placeholder}
              data={beforeBookingDays}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <View style={styles.inputContainer}>
          <BoardingHeader />
          <BoardingMain />
          <BoardingFooter />
        </View>
      </AppForm>
      <BottomSpacing />
    </ScrollView>
  );
};

export default BoardingSettingInfo;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  footerContainer: {
    marginBottom:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '5%' : '6%',
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
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  infoText: {
    paddingLeft: 10,
    fontSize: Text_Size.Text_8,
  },
  inputContainer: {paddingHorizontal: 20},
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
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
