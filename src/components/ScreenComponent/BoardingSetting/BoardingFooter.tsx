/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DescriptionText from '../../common/text/DescriptionText';
import {
  aboutYourHome,
  CancellationPolicy,
  petPreference,
} from './utils/BoardingData/BoardingData';
import HeaderText from '../../common/text/HeaderText';
import BigText from '../../common/text/BigText';
import BoardingPetQuantity from './Common/BoardingPetQuantity';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import BoardingCheckbox from './Common/BoardingCheckbox';
import ErrorMessage from '../../common/Form/ErrorMessage';
import PetPreference from './PetPreference';

interface Props {
  handleActiveCheck: (arg1: number, arg2: number) => void;
  handlePetOwnerExpectationActiveCheck: (arg1: number, arg2: any) => void;
  handlePetHostingActiveCheck: (arg1: number, arg2: any) => void;
  handleActivePetHostingActiveCheck: () => void;
  handleActivePetOwnerExpectationActiveCheck: () => void;
  active3: any;
  active4: any;
  active7: any;
  activePetHosting: any;
  errors: any;
  control: any;
  setValue: (arg1: string, arg2: any, arg3: any) => void;
}
const BoardingFooter = ({
  activePetHosting,
  handleActiveCheck,
  handlePetHostingActiveCheck,
  handlePetOwnerExpectationActiveCheck,
  handleActivePetOwnerExpectationActiveCheck,
  handleActivePetHostingActiveCheck,
  active3,
  active4,
  active7,
  errors,
  control,
  setValue,
}: Props) => {
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
        <BoardingPetQuantity
          name={'petQuantity'}
          control={control}
          errors={errors}
          setValue={setValue}
        />
      </View>
      <PetPreference
        control={control}
        errors={errors}
        setValue={setValue}
        activePetHosting={activePetHosting}
        handlePetHostingActiveCheck={handlePetHostingActiveCheck}
      />
      {/* <HeaderText textStyle={styles.subtitle} text={petPreference[0].title!} />
      <DescriptionText
        text={petPreference[0].subtitle}
        textStyle={styles.subtitle}
      />
      {petPreference[0].options.map((item, index) => {
        return (
          <BoardingCheckbox
            title={item.type}
            key={index}
            square
            typeKey={activePetHosting.activeItem}
            active={item.checked}
            onPress={() =>
              handlePetHostingActiveCheck(item.id, petPreference[0].options)
            }
            name={petPreference[0].name!}
            control={control}
            setValue={setValue}
            handleValues={handleValues}
          />
        );
      })}
      <ErrorMessage error={errors[petPreference[0].name!]?.message} /> */}
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
                {item?.options.map((type, i) => {
                  return (
                    <View key={i}>
                      <BoardingCheckbox
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
                        control={control}
                        setValue={setValue}
                        handleActiveMultipleCheck={
                          handleActivePetOwnerExpectationActiveCheck
                        }
                      />
                    </View>
                  );
                })}
                <ErrorMessage error={errors[item.name]?.message} />
              </View>
            </View>
          );
        })}
      </View>
      <View>
        <View style={styles.footerContainer}>
          <BigText text={'Cancellation Policy'} textStyle={styles.headerText} />
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
              <BoardingCheckbox
                title={item.type}
                key={index}
                square={CancellationPolicy[0].square}
                radio={CancellationPolicy[0].radio}
                typeKey={item.id}
                active={CancellationPolicy[0].id === 107 && active7[item.id]}
                onPress={() => handleActiveCheck(107, item.id)}
                name={CancellationPolicy[0].name!}
                control={control}
                setValue={setValue}
                handleActiveMultipleCheck={() => {}}
              />
            );
          })}
          <ErrorMessage error={errors[CancellationPolicy[0].name!]?.message} />
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
      </View>
    </View>
  );
};

export default BoardingFooter;

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
});
