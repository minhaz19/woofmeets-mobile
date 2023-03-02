import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
import ServiceForm from '../Common/ServiceForm';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import {useFormContext} from 'react-hook-form';
import {useSubRates} from './ulils/useSubRates';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import ServiceReusableModal from '../Common/ServiceReusableModal';
import TitleText from '../../../../common/text/TitleText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderText from '../../../../common/text/HeaderText';
interface Props {
  rateFields: any;
  fieldValue: any;
  ratesMeta: any;
  showToggle?: boolean;
}

const SubRates = ({rateFields, fieldValue, showToggle}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    formState: {errors},
    control,
    setValue,
  } = useFormContext();
  const {
    baseRateWatch,
    handlePress,
    rates,
    showAdditionalRates,
    updateRates,
    setUpdateRates,
  } = useSubRates(fieldValue, rateFields, showToggle);
  return (
    <View>
      <ServiceReusableModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        question="Need help with rates?"
        description="If you click the box that says “Update my additional rates based on my pay rate,” the system will automatically update the rest of your rates based on the hourly base rate you set. Some pet sitters find that to be a convenient feature. However, it’s not required that you use it. Instead, you can always fill out those additional rates yourself. Make sure that the base rate and additional rates you’ve set are not unreasonable, though. If you’re not sure what a reasonable hourly rate would be for something like dog walking, have a look at what other sitters are requesting and model your own rates based on that. Your aim is to make yourself affordable to pet owners."
      />
      <View style={styles.headerContainer}>
        <View style={styles.flexContainer}>
          <BigText text={'Rates'} textStyle={styles.headerText} />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.iconContainer}>
            <QuestionIcon fill={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.currencyWrap}>
          <TitleText
            textStyle={styles.currencyText}
            text={
              'The currency rate Icon will update to ( $ or C$ ) based on your location information'
            }
          />
        </View>
        {rates?.map(
          (
            item: {
              slug: string;
              name: string;
              unitLabel: string;
              percentage: number;
              rateUnitLabel: string;
              helpText: string;
              convertedValue: number;
            },
            index: number,
          ) => {
            return (
              <View key={index}>
                {item.slug === 'base-rate' && (
                  <>
                    <ServiceForm
                      autoCapitalize="none"
                      autoCorrect={false}
                      checkbox={
                        'Update my additional rates based on my base rate'
                      }
                      keyboardType={'numeric'}
                      textContentType={'none'}
                      name={item.slug.replace('-', '')}
                      percentage={item.percentage}
                      label={item.name}
                      checkPress={() => {
                        setUpdateRates(!updateRates);
                      }}
                      control={control}
                      errors={errors}
                      editable={true}
                      setValue={setValue}
                      unit={item.rateUnitLabel}
                      icon={false}
                      helpText={item.helpText}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <HeaderText text="Additional Rates" textStyle={styles.titleStyle}/>
                      <Pressable
                        onPress={() => handlePress()}
                        style={styles.iconStyle}>
                        <MaterialCommunityIcons
                          name={'chevron-right'}
                          size={
                            SCREEN_WIDTH <= 380
                              ? 24
                              : SCREEN_WIDTH <= 600
                              ? 28
                              : 28
                          }
                          color={Colors.primary}
                          style={{
                            transform: [
                              {
                                rotate: showAdditionalRates
                                  ? '-90deg'
                                  : '90deg',
                              },
                            ],
                          }}
                        />
                        <HeaderText
                          text={
                            showAdditionalRates
                              ? 'Hide Additional rates '
                              : 'Show Additional rates'
                          }
                          textStyle={styles.titleStyle}
                        />
                      </Pressable>
                    </View>

                    <AppCheckboxField
                      title={'Update my additional rates based on my base rate'}
                      square
                      active={!updateRates}
                      onPress={() => {
                        setUpdateRates(!updateRates);
                      }}
                      name={'updateRates'}
                      errors={errors}
                      control={control}
                    />
                  </>
                )}
                {item.slug !== 'base-rate' && showAdditionalRates && (
                  <ServiceForm
                    key={index}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    textContentType={'none'}
                    name={item.slug.replace('-', '').replace('-', '')}
                    label={item.name}
                    percentage={item.percentage}
                    editable={updateRates}
                    control={control}
                    errors={errors}
                    baseRateWatch={Number(baseRateWatch)}
                    convertedValue={item.convertedValue}
                    setValue={setValue}
                    updateRates={updateRates}
                    // checked={checked}
                    unit={item.rateUnitLabel}
                    icon={true}
                    helpText={item.helpText}
                  />
                )}
              </View>
            );
          },
        )}
      </View>
    </View>
  );
};

export default SubRates;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
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
  shortText: {
    color: Colors.gray,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  iconContainer: {
    paddingLeft: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyWrap: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    backgroundColor: Colors.iosBG,
    marginBottom: 20,
  },
  currencyText: {
    fontWeight: 'bold',
    textAlign: 'justify',
    color: Colors.primaryDif,
  },
  iconStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleStyle: {
    color: Colors.primary,
    // fontWeight: 'bold',
    // fontSize: Text_Size.Text_1,
  },
});
