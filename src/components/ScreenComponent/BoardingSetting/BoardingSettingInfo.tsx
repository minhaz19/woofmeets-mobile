import {ScrollView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import Text_Size from '../../../constants/textScaling';
import BottomSpacing from '../../UI/BottomSpacing';
import {useHandleTempCheck} from '../../../utils/helpers/usehandleActiveCheck';
import SubmitButton from '../../common/Form/SubmitButton';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import useHandleMultipleActiveCheck from './utils/handleCheck/HandleCheck';
import {useFormContext} from 'react-hook-form';
import BoardingHeader from './BoardingHeader';
import BoardingMain from './BoardingMain';
import BoardingFooter from './BoardingFooter';

interface Props {
  handleSubmit: (value: any) => void;
  onPress?: () => void;
}

const BoardingSettingInfo: FC<Props> = ({handleSubmit}) => {
  const {handleActiveCheck, active0, active2, active3, active4, active7} =
    useHandleTempCheck();

  const {
    activePetHosting,
    selectDays,
    handlePetHostingActiveCheck,
    handlePetOwnerExpectationActiveCheck,
    handleSelectDaysActiveCheck,
    handleActivePetHostingActiveCheck,
    handleActivePetOwnerExpectationActiveCheck,
  } = useHandleMultipleActiveCheck();
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.inputContainer}>
        <BoardingHeader control={control} errors={errors} setValue={setValue}/>
        <BoardingMain
          control={control} errors={errors} setValue={setValue}
          handleSelectDaysActiveCheck={handleSelectDaysActiveCheck}
          selectDays={selectDays}
          handleActiveCheck={handleActiveCheck}
          active0={active0}
          active2={active2}
        />
        <BoardingFooter
          activePetHosting={activePetHosting}
          control={control} errors={errors} setValue={setValue}
          handleActiveCheck={handleActiveCheck}
          handlePetHostingActiveCheck={handlePetHostingActiveCheck}
          handlePetOwnerExpectationActiveCheck={
            handlePetOwnerExpectationActiveCheck
          }
          handleActivePetHostingActiveCheck={handleActivePetHostingActiveCheck}
          handleActivePetOwnerExpectationActiveCheck={
            handleActivePetOwnerExpectationActiveCheck
          }
          active3={active3}
          active4={active4}
          active7={active7}
        />
        <View>
          <SubmitButton title="Save" onPress={handleSubmit} />
        </View>
        <BottomSpacing />
      </View>
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
