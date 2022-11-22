/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import {useFormContext} from 'react-hook-form';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ServiceCheckbox from '../ServiceSetup/Common/ServiceCheckbox';
import {skillsData} from '../../../../screens/becomeSitter/Details/utils/SkillsData';
import DescriptionText from '../../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useHandleMultipleActiveCheck} from '../../../../screens/becomeSitter/Details/utils/HandleCheck';
import {useAppSelector} from '../../../../store/store';

const sitterDetailsInputValue = [
  {
    title: 'Years of personal experience caring for pets',
    name: 'yearsOfExperience',
    numberOfLines: 1,
  },
  {
    title: 'Write an eye-catching headline',
    name: 'headline',
    description:
      'Make your headline short, descriptive and genuine. Try to encapsulate in a single sentence why you’re the best pet-sitting candidate for the job. Your headline’s creativity will help it stand out.',
    numberOfLines: 1,
  },
  {
    title: 'Write something about your self',
    description:
      'What’s something special or unique about yourself that will impress pet owners? Here’s your opportunity to describe why animals mean so much to you.',
    name: 'about',
    numberOfLines: 1,
  },
  {
    title: 'Pet care experience',
    name: 'experienceDescription',
    description: `Tell us more about your experience in pet care.

This is where you should talk about the practical application of pet care skills you’ve picked up throughout your life.`,
    numberOfLines: 12,
  },
  {
    title: 'Schedule',
    name: 'environmentDescription',
    description: `How does pet care fit into your daily or weekly routine? \n\nExample: "I’m currently working part-time, so I’ll have plenty of time to play with your pups! I’m available for boarding on weekends and weekdays after 2pm"`,
    numberOfLines: 10,
  },
  {
    title: 'Safety , trust & environment',
    name: 'scheduleDescription',
    description:
      'How do you care for pets in your home and/or your client’s home? This will vary depending on which services you offer. Try to be extremely detailed regarding safety features in your residence or wherever else you keep the pets that are in your care. These details make it easier for clients to feel that their pets will be safe with you.',
    numberOfLines: 10,
  },
];

const SitterDetailsInput = (props: {handleSubmit: any; isLoading: boolean}) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  const data = getValues();
  const {colors} = useTheme();
  const skillsDetailsData = useAppSelector(state => state.details.skillsData);
  const {newData, handleMultipleCheck} =
    useHandleMultipleActiveCheck(skillsDetailsData);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          {sitterDetailsInputValue.map((item, index) => {
            return (
              <View key={index}>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={
                    item.name === 'yearsOfExperience' ? 'number-pad' : 'default'
                  }
                  textContentType={'none'}
                  name={item.name}
                  subTitle={item.description}
                  label={item.title}
                  textInputStyle={styles.textInputStyle}
                  control={control}
                  errors={errors}
                  numberOfLines={item.numberOfLines}
                  // multiline={true}
                  // textInputBoxStyle={{
                  //   backgroundColor: colors.inputBackground,
                  //   width: '100%',
                  //   borderRadius: 2,
                  //   paddingHorizontal: 8,
                  // }}
                  // inputBoxContainerStyle={{
                  //   borderRadius: 2,
                  //   paddingHorizontal: 0,
                  //   borderWidth: 0,
                  // }}
                />
              </View>
            );
          })}
        </View>
        <View style={{marginTop: '3%'}}>
          <HeaderText
            text={skillsData.title}
            textStyle={styles.subHeaderText}
          />
          {skillsData.subtitle && (
            <DescriptionText
              text={skillsData.subtitle}
              textStyle={{
                ...styles.subHeaderText,
                color: colors.descriptionText,
              }}
            />
          )}
          <View style={styles.dayBoxContainer}>
            {newData &&
              newData?.map((item, index: React.Key | null | undefined) => (
                <ServiceCheckbox
                  title={item.title}
                  key={index}
                  square
                  typeKey={item.id}
                  active={data[item.slug]}
                  onPress={() => {
                    handleMultipleCheck(item.id);
                    setValue(item.slug, item.active);
                  }}
                  name={item.slug}
                  control={control}
                />
              ))}
          </View>
          {/* <ErrorMessage error={errors[skillsData.name!]?.message} /> */}
        </View>
        <View style={styles.footerContainer}>
          <SubmitButton
            title="Save"
            onPress={props.handleSubmit}
            loading={props.isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default SitterDetailsInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  inputContainer: {marginHorizontal: 0},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  textStyle1: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
    padding: 20,
  },
  footerContainer: {
    paddingVertical: '6%',
  },
  titleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_1,
    flex: 1,
  },
  errorText: {
    color: Colors.alert,
  },
  subHeaderText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
    lineHeight: 20,
  },
  dayBoxContainer: {
    paddingVertical: '2%',
  },
});
