import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import BoardingForm from '../../common/BoardingInput/BoardingForm';
import AppForm from '../../common/Form/AppForm';
import HeaderText from '../../common/text/HeaderText';
import Text_Size from '../../../constants/textScaling';
import {InfoSvg} from '../Inbox/utils/SvgComponent/SvgComponent';
import ShortText from '../../common/text/ShortText';
import BigText from '../../common/text/BigText';
import BottomSpacing from '../../UI/BottomSpacing';
import {petPreference, RatesInput} from './utils/BoardingData/BoardingData';
import DescriptionText from '../../common/text/DescriptionText';
import TitleText from '../../common/text/TitleText';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
import useHandleCheck from '../../../utils/helpers/usehandleActiveCheck';

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
        <TitleText textStyle={styles.title} text={petPreference[0].title!} />
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
      </>
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
    marginHorizontal: '2%',
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
  // inputContainer: {paddingHorizontal: 20},
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
  },
});
