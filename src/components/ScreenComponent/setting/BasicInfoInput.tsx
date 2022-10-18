import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import AppFormField from '../../common/Form/AppFormField';
import SubmitButton from '../../common/Form/SubmitButton';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';
import ProfileHeader from '../profile/BasicInfo/ProfileHeader';
import BottomSpacing from '../../UI/BottomSpacing';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useFormContext} from 'react-hook-form';
import {contries} from '../../../utils/config/Data/AddPetData';
import {useAppSelector} from '../../../store/store';
import AppSelectField from '../../common/Form/AppSelectField';
import {
  basicInfoInput,
  locationInput,
} from '../../../utils/config/Data/basicInfoDatas';

interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
}

const BasicInfoInput = ({handleSubmit, loading}: Props) => {
  const {loading: gLoading, userInfo} = useAppSelector(
    state => state?.userProfile,
  );
  const image = userInfo?.image;
  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const renderHeader = useCallback(() => {
    return (
      <>
        <ProfileHeader
          name="profileImage"
          gLoading={gLoading}
          url={image?.url}
          userName={firstName ? firstName + ' ' + lastName : ''}
        />
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <HeaderText text="Basic Information" textStyle={styles.textStyle} />
          </View>
          <View>
            <FlatList
              data={basicInfoInput}
              renderItem={({item}) => {
                return (
                  <>
                    <AppFormField
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'default'}
                      placeholder={item.placeholder}
                      textContentType={'none'}
                      name={item.name}
                      label={item.title}
                      errors={errors}
                      control={control}
                    />
                  </>
                );
              }}
              keyExtractor={(item, index) => item.name + index.toString()}
            />
          </View>
          <View style={styles.nameContainer}>
            <HeaderText
              text="Location Information"
              textStyle={styles.textStyle}
            />
          </View>
        </View>
      </>
    );
  }, [control, errors, firstName, gLoading, image?.url, lastName]);

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.footerContainer}>
          <SubmitButton title="Save" onPress={handleSubmit} loading={loading} />
        </View>
        <BottomSpacing />
      </View>
    );
  }, [handleSubmit, loading]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={locationInput}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          inverted
          renderItem={useCallback(
            ({item}) => {
              return (
                <>
                  {!item.select && (
                    <View style={styles.inputContainer}>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType={'default'}
                        placeholder={item.placeholder}
                        textContentType={'none'}
                        name={item.name}
                        label={item.title}
                        textInputStyle={styles.textInputStyle}
                        control={control}
                        errors={errors}
                        // defaultValue={basicInfo?.[item.name]}
                      />
                    </View>
                  )}
                  {item.select && (
                    <View style={styles.selectContainer}>
                      <AppSelectField
                        label={item.title}
                        name={item.name}
                        data={contries}
                        disable={true}
                        control={control}
                        placeholder={'USA'}
                        defaultText="USA"
                      />
                    </View>
                  )}
                </>
              );
            },
            [control, errors],
          )}
          keyExtractor={(item, index) => item.name + index.toString()}
          ListHeaderComponent={renderFooter}
          ListFooterComponent={renderHeader}
        />
      </TouchableWithoutFeedback>
      <BottomSpacing />
    </KeyboardAvoidingView>
  );
};

export default BasicInfoInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '1%',
  },
  headerContainer: {
    marginHorizontal: '5%',
    width: '90%',
  },
  inputContainer: {marginHorizontal: '5%', width: '90%'},
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  selectContainer: {width: '90%', marginHorizontal: '5%'},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: SCREEN_WIDTH <= 800 ? '5%' : '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingVertical: '6%',
    marginBottom: '6%',
  },
});
