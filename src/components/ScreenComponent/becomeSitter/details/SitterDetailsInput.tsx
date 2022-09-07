import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import {useFormContext} from 'react-hook-form';
import Colors from '../../../../constants/Colors';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';

const sitterDetailsInputValue = [
    {
        title: 'Years of personal or professional ex-perience caring for pets',
        name: 'yearsOfExperience',
        description: 'Make your headline short , descriptive and genuine.',
        numberOfLines: 1,
      },
    {
      title: 'Write an eye-catching headline',
      name: 'headline',
      numberOfLines: 1,
    },
    {
      title: 'Pet care experience',
      name: 'experienceDescription',
      description: `What sets you apart from other sitters? Be sure to include any special skills like training puppies or senior care. \n\nExample: "I’ve taken care of dogs of every kind since I was 10. Neighbors, friends and family have relied on me to walk, feed and bathe their pets..."`,
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
      description: 'How do you care for pets in your home and ? or your clients home ? This will vary depending on which service you offer.',
      numberOfLines: 10,
    },
  ];

const SitterDetailsInput = (props: { handleSubmit: any; }) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const {colors, isDarkMode} = useTheme();
  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <View style={styles.nameContainer}>
            <HeaderText
              text="Add Emergency Contact"
              textStyle={styles.textStyle}
            />
          </View>
          {sitterDetailsInputValue.map((item, index) => {
            return (
              <View key={index}>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'default'}
                  textContentType={'none'}
                  name={item.name}
                  subTitle={item.description}
                  label={item.title}
                  textInputStyle={styles.textInputStyle}
                  control={control}
                  errors={errors}
                  multiline={true}
                  numberOfLines={item.numberOfLines}
                  textInputBoxStyle={{backgroundColor: colors.inputBackground, width: '100%', borderRadius: 2, paddingHorizontal: 8,}}
                  inputBoxContainerStyle={{ borderRadius: 2, paddingHorizontal: 0, borderWidth: isDarkMode ? 2 : 0}}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.footerContainer}>
          <SubmitButton title="Save" onPress={props.handleSubmit} loading={false} />
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
  textInputStyle: {

  },
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
});
