/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';
import Text_Size from '../../../../constants/textScaling';
import SubmitButton from '../../../common/Form/SubmitButton';
import {addPetInputs} from '../../../../utils/config/Data/AddPetData';
import AddPetImage from './AddPetImage';
import AppSelect from '../../../common/Form/AppSelect';
import AppCheckboxField from '../../../common/Form/AppCheckboxField';
import {useHandleCheck} from '../../../../utils/helpers/usehandleActiveCheck';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import HeaderText from '../../../common/text/HeaderText';
import AppImagePicker from '../../../common/ImagePicker/AppImagePicker';
import BottomSpacing from '../../../UI/BottomSpacing';
import {memo} from 'react';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const AddPetBody = ({initialValues, validationSchema}: Props) => {
  const [isAdditionalDetails, setIsAdditionalDetails] = useState<boolean>(true);
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

  const yourPetType = useMemo(() => {
    return addPetInputs[0].pet!.map((item, index) => (
      <AppCheckboxField
        title={item.type}
        key={index}
        typeKey={item.id}
        square
        active={active0 === item.id ? true : false}
        name={addPetInputs[0].name!}
        onPress={() => {
          handleActiveCheck(addPetInputs[0].id!, item.id);
        }}
      />
    ));
  }, [active0]);
  const petInfoInputs = useMemo(() => {
    return (
      <View style={styles.flatList}>
        {addPetInputs[1].inputs!.map((item, index) => (
          <>
            {!item.select ? (
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                placeholder={item.placeholder}
                textContentType={'none'}
                name={item.name}
                label={item.title}
                flex={item.flex}
                key={index}
              />
            ) : (
              <View style={styles.selectContainer} key={index}>
                <AppSelect label={item.title} name={item.name} />
              </View>
            )}
          </>
        ))}
      </View>
    );
  }, []);

  const AdditionalInfoCheck = useMemo(() => {
    return (
      <View>
        {addPetInputs[2].additionalDetails!.map((item, index) => (
          <View key={index} style={styles.radioContainer}>
            <TitleText textStyle={styles.title} text={item.title} />

            <View style={styles.additionalTypeContainer}>
              {item.radio.map((type, key) => (
                <AppCheckboxField
                  title={type.type}
                  radio
                  key={key}
                  typeKey={type.id}
                  active={
                    (type.id === active1 ? true : false) ||
                    (type.id === active2 ? true : false) ||
                    (type.id === active3 ? true : false) ||
                    (type.id === active4 ? true : false) ||
                    (type.id === active5 ? true : false) ||
                    (type.id === active6 ? true : false) ||
                    (type.id === active7 ? true : false)
                  }
                  onPress={() => handleActiveCheck(item.id, type.id)}
                  name={item.name}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }, [active1, active2, active3, active4, active5, active6, active7]);
  const careInfoChecks = useMemo(() => {
    return addPetInputs[4].careInfo?.map((item, index) => (
      <View key={index} style={styles.radioContainer}>
        <TitleText textStyle={styles.title} text={item.title} />

        <View style={styles.additionalTypeContainer}>
          {item.radio.map((type, key) => (
            <AppCheckboxField
              title={type.type}
              radio
              key={key}
              typeKey={type.id}
              active={
                (type.id === active8 ? true : false) ||
                (type.id === active9 ? true : false) ||
                (type.id === active10 ? true : false) ||
                (type.id === active11 ? true : false)
              }
              name={item.name}
              onPress={() => handleActiveCheck(item.id, type.id)}
            />
          ))}
        </View>
      </View>
    ));
  }, [active10, active11, active8, active9]);
  const bottomCheck = useMemo(() => {
    return addPetInputs[6].pet!.map((item, index) => (
      <AppCheckboxField
        title={item.type}
        key={index}
        square
        typeKey={item.id}
        active={item.id === active12 ? true : false}
        name={addPetInputs[6].name!}
        onPress={() => handleActiveCheck(112, item.id)}
      />
    ));
  }, [active12]);
  const bottomInputs = useMemo(() => {
    return (
      <>
        {addPetInputs[7].inputs!.map((item, index) => (
          <AppFormField
            key={index}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'default'}
            placeholder={item.placeholder}
            textContentType={'none'}
            name={item.name}
            label={item.title}
            subTitle={item.subTitle}
            multiline={item.numberOfLines ? true : false}
            numberOfLines={item.numberOfLines! && item.numberOfLines!}
          />
        ))}
      </>
    );
  }, []);
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.inputContainer}>
          <View>
            <View>
              <AddPetImage name="petImage" />
            </View>
            <View>
              <HeaderText
                textStyle={styles.header}
                text={addPetInputs[0].header!}
              />
              <DescriptionText
                textStyle={styles.topSubTitle}
                text={addPetInputs[0].subTitle!}
              />
              <TitleText
                textStyle={styles.title}
                text={addPetInputs[0].title!}
              />
              <View style={styles.petType}>{yourPetType}</View>
            </View>
            <View>{petInfoInputs}</View>
          </View>
          <TouchableOpacity
            style={styles.spaceHeader}
            onPress={() => setIsAdditionalDetails(!isAdditionalDetails)}>
            <HeaderText text="Additional Details" />
          </TouchableOpacity>
          {isAdditionalDetails && (
            <View>
              {AdditionalInfoCheck}
              <View>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'default'}
                  placeholder={addPetInputs[3].placeholder}
                  textContentType={'none'}
                  name={addPetInputs[3].name!}
                  label={addPetInputs[3].title!}
                  multiline
                  numberOfLines={addPetInputs[3].numberOfLines}
                />
              </View>
              <View>
                <View>
                  <TitleText
                    textStyle={styles.header}
                    text={addPetInputs[4].header!}
                  />
                  <TitleText
                    textStyle={styles.subTitle}
                    text={addPetInputs[4].subTitle!}
                  />
                </View>
                {careInfoChecks}
              </View>
              <View>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'default'}
                  placeholder={addPetInputs[5].placeholder}
                  textContentType={'none'}
                  name={addPetInputs[5].name!}
                  label={addPetInputs[5].title!}
                  multiline
                  numberOfLines={addPetInputs[5].numberOfLines}
                />
              </View>
              <View>
                <TitleText
                  textStyle={styles.title}
                  text={addPetInputs[6].title!}
                />
                <View style={styles.petType}>{bottomCheck}</View>
              </View>
              <View>{bottomInputs}</View>
            </View>
          )}
          <View>
            <AppImagePicker
              label="Photo Gallery"
              subTitle="Show off your pet through image gallery"
              name="photoGallery"
            />
          </View>
          <View>
            <SubmitButton title="Add Pet" />
          </View>
          <BottomSpacing />
        </ScrollView>
      </AppForm>
    </View>
  );
};

export default memo(AddPetBody);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  topSubTitle: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 14,
  },
  inputContainer: {paddingHorizontal: 20, flex: 1},
  petType: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    // width: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  additionalTypeContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  additionalType: {
    marginRight: 20,
  },
  radioContainer: {
    marginRight: 10,
  },
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    marginVertical: 10,
  },
  selectContainer: {width: '100%'},
  spaceHeader: {
    paddingVertical: 10,
  },
});
