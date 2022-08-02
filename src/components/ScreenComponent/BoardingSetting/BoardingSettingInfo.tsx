import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import BoardingForm from '../../common/BoardingInput/BoardingForm';
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
  CancellationPolicy,
  petPreference,
  RatesInput,
} from './utils/BoardingData/BoardingData';
import DescriptionText from '../../common/text/DescriptionText';
import TitleText from '../../common/text/TitleText';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
import useHandleCheck from '../../../utils/helpers/usehandleActiveCheck';
import SubmitButton from '../../common/Form/SubmitButton';
import BoardingDay from '../../common/BoardingInput/BoardingDay';
import Dropdown from '../../common/dropDown/Dropdown';
import {genders} from '../../../utils/config/Data/AddPetData';

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
  onPress,
}) => {
  const {
    handleActiveCheck,
    active0,
    active1,
    active2,
    active3,
    active4,
    active5,
    active6,
    active7,
    active8,
    active9,
    active10,
    active11,
    active12,
  } = useHandleCheck();
  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <HeaderText text={'Boarding Setting'} textStyle={styles.headerText} />
        <HeaderText
          text={'Overnight pet care on your home'}
          textStyle={styles.subHeaderText}
        />
        <View style={styles.infoContainer}>
          <InfoSvg height={20} width={20} />
          <ShortText
            text={
              'We have suggested some default settings based on what works well for new sitters and walkers. You can edit now , ,or at any time in the future .'
            }
            textStyle={styles.infoText}
          />
        </View>
        <View>
          <BigText text={'Rates'} />
          {RatesInput.map((item, index) => {
            return (
              <BoardingForm
                key={index}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'numeric'}
                placeholder={item.placeholder}
                textContentType={'none'}
                icon={true}
                name={item.name}
                label={item.title}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const RenderFooter = () => {
    return (
      <>
        <BigText text={'Pet Preferences'} textStyle={styles.headerText} />
        <DescriptionText
          text={'How should I set preference?'}
          textStyle={styles.subHeaderText}
        />
        <HeaderText
          textStyle={styles.title}
          text={'How many pets per day can host in your home?'}
        />
        <HeaderText textStyle={styles.title} text={petPreference[0].title!} />
        <DescriptionText text={petPreference[0].subtitle} />
        {petPreference[0].options.map((item, index) => {
          return (
            <AppCheckboxField
              title={item.type}
              key={index}
              square
              typeKey={item.id}
              active={petPreference[0].id === 106 && active6[item.id]}
              onPress={() => handleActiveCheck(106, item.id)}
              name={petPreference[0].name!}
            />
          );
        })}
        <View>
          <BigText text={'About your home'} />
          {aboutYourHome.map((item, index) => {
            return (
              <View key={index}>
                <HeaderText textStyle={styles.title} text={item.title!} />
                {item.subtitle && <DescriptionText text={item.subtitle} />}
                <View>
                  {item.options.map((type, i) => {
                    return (
                      <View key={i} style={styles.additionalType}>
                        <AppCheckboxField
                          title={type.type}
                          radio={item.radio}
                          square={item.square}
                          key={index}
                          typeKey={type.id}
                          active={
                            (item.id === 101 && active1[type.id]) ||
                            (item.id === 102 && active2[type.id])
                            // (item.id === 103 && active3[type.id]) ||
                            // (item.id === 104 && active4[type.id])
                          }
                          onPress={() => handleActiveCheck(item.id, type.id)}
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
          <BigText text={'Cancellation Policy'} />
          <DescriptionText text={'What do this mean?'} />
          <HeaderText text={CancellationPolicy[0].title} />
          {CancellationPolicy[0].options.map((item, index) => {
            return (
              <AppCheckboxField
                title={item.type}
                key={index}
                square={CancellationPolicy[0].square}
                radio={CancellationPolicy[0].radio}
                typeKey={item.id}
                active={CancellationPolicy[0].id === 105 && active5[item.id]}
                onPress={() => handleActiveCheck(105, item.id)}
                name={CancellationPolicy[0].name!}
              />
            );
          })}
          <DescriptionText
            text={
              'Note : service providers ( e.g. sitters ) must abide by applicable laws and regulations.'
            }
          />
          <TouchableOpacity>
            <DescriptionText text={'Terms of Service'} />
          </TouchableOpacity>
          <View>
            <SubmitButton title="Save" />
          </View>
          <BottomSpacing />
        </View>
      </>
    );
  };

  const RenderMain = () => {
    return (
      <View>
        <BigText text={'Availability'} />
        <View>
          <HeaderText text={availabilityInput[0].title} />
          {availabilityInput[0].options?.map((item, index) => {
            return (
              <AppCheckboxField
                title={item.type}
                key={index}
                square={availabilityInput[0].square}
                radio={availabilityInput[0].radio}
                typeKey={item.id}
                active={availabilityInput[0].id === 110 && active10[item.id]}
                onPress={() => handleActiveCheck(110, item.id)}
                name={availabilityInput[0].name!}
              />
            );
          })}
          {availabilityInput[0].linkTitle && (
            <TouchableOpacity>
              <DescriptionText
                text={availabilityInput[0].linkTitle}
                textStyle={styles.linkModal}
              />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <HeaderText text={availabilityInput[1].title} />
          {availabilityInput[1].subtitle && (
            <DescriptionText text={availabilityInput[1].subtitle} />
          )}
          <View style={styles.dayBoxContainer}>
            {availabilityInput[1].options?.map((item, index) => (
              <BoardingDay
                key={index}
                title={item.type}
                name={availabilityInput[1].name}
                typeKey={item.id}
                active={availabilityInput[0].id === 111 && active11[item.id]}
                onPress={() => handleActiveCheck(110, item.id)}
              />
            ))}
          </View>
        </View>
        <View>
          <HeaderText text={availabilityInput[2].title} />
          {availabilityInput[2].options?.map((item, index) => {
            return (
              <AppCheckboxField
                title={item.type}
                key={index}
                square={availabilityInput[2].square}
                radio={availabilityInput[2].radio}
                typeKey={item.id}
                active={availabilityInput[2].id === 112 && active12[item.id]}
                onPress={() => handleActiveCheck(112, item.id)}
                name={availabilityInput[2].name!}
              />
            );
          })}
        </View>
        {availabilityInput[3].select && (
          <View style={styles.selectContainer}>
            <DescriptionText
              text={availabilityInput[3].linkTitle}
              textStyle={styles.linkText}
            />
            <Dropdown
              label={availabilityInput[3].title}
              name={availabilityInput[3].name}
              placeholder={availabilityInput[3].placeholder}
              data={genders}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <AppForm
        initialValues={{
          name: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <View style={styles.inputContainer}>
          <BigText text={'Availability'} textStyle={styles.headerText} />
          <RenderHeader />
          <RenderMain />
          <RenderFooter />
        </View>
      </AppForm>
      <BottomSpacing />
    </ScrollView>
  );
};

export default BoardingSettingInfo;

const styles = StyleSheet.create({
  headerContainer: {
    // marginHorizontal: '2%',
  },
  headerText: {
    fontSize: Text_Size.Text_2,
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  infoText: {
    paddingLeft: 10,
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
    marginTop: 10,
  },
});
