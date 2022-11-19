import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
import ServiceForm from '../Common/ServiceForm';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import {useFormContext} from 'react-hook-form';
import {useSubRates} from './ulils/useSubRates';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import ServiceReusableModal from '../Common/ServiceReusableModal';
interface Props {
  handleRates: (arg: any) => void;
  rateFields: any;
  loading: boolean;
  fieldValue: any;
  ratesMeta: any;
}

const SubRates = ({
  handleRates,
  rateFields,

  loading,
}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    formState: {errors},
    control,
    setValue,
    watch,
  } = useFormContext();
  const {
    baseRateWatch,
    handlePress,
    rates,
    showAdditionalRates,
    updateRates,
    setUpdateRates,
  } = useSubRates(rateFields, watch);
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
                      handlePress={handlePress}
                      showAdditionalRates={showAdditionalRates}
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
                    <DescriptionText
                      textStyle={styles.shortText}
                      text={'Turn off and adjust your rate manully'}
                    />
                  </>
                )}
                {item.slug !== 'base-rate' && (
                  <ServiceForm
                    key={index}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    textContentType={'none'}
                    name={item.slug.replace('-', '').replace('-', '')}
                    label={item.name}
                    handlePress={handlePress}
                    percentage={item.percentage}
                    showAdditionalRates={showAdditionalRates}
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
        <SubmitButton
          title="Save & continue"
          onPress={handleRates}
          loading={loading}
        />
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
    marginVertical: '2%',
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
});
