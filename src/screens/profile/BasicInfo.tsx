import {View, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import HeaderText from '../../components/common/text/HeaderText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text_Size from '../../constants/textScaling';
import InputText from '../../components/common/input/InputText';
import BottomSpacing from '../../components/UI/BottomSpacing';
import ButtonCom from '../../components/UI/ButtonCom';
import {btnStyles} from '../../constants/theme/common/buttonStyles';
import { basicInfoValue } from '../../utils/config/initalValues';
import { basicInfoValidationSchema } from '../../utils/config/validationSchema';
import BasicInfoInput from '../../components/ScreenComponent/setting/BasicInfoInput';

const BasicInfo = () => {
  const {colors} = useTheme();
  const handleSubmit = (e: any) => {
    console.log('values', e);
  };
  return (
    <ScrollView
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View style={styles.topContainer}>
        <View
          style={[
            styles.imageContainer,
            {borderColor: colors.descriptionText},
          ]}>
          <Image
            source={{
              uri: 'https://picsum.photos/200/300',
            }}
            style={styles.imageStyle}
          />
          <View
            style={[
              styles.addContainer,
              {borderColor: colors.backgroundColor},
            ]}>
            <Ionicons
              name="md-add"
              size={SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 18 : 20}
              color={Colors.light.background}
            />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <HeaderText text="John Askelad" />
        </View>
      </View>
      <BasicInfoInput
        initialValues={basicInfoValue}
        validationSchema={basicInfoValidationSchema}
        handleSubmit={handleSubmit}
      />
      {/* <View style={styles.nameContainer}>
        <HeaderText text="Location Information" textStyle={styles.textStyle} />
      </View>
      <View style={styles.textInfoContainer}>
        <InputText
          title="Address Line 1"
          placeholder="Enter Address Line 1"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="Address Line 2"
          placeholder="Enter Address Line 2"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="City"
          placeholder="Enter City"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="State or Province"
          placeholder="Enter State or Province"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="ZIP/ Postal/ PostCode"
          placeholder="Enter ZIP/ Postal/ PostCode"
          value={undefined}
          setValue={() => {}}
        />
      </View>
      <View style={styles.nameContainer}>
        <HeaderText text="Basic Information" textStyle={styles.textStyle} />
      </View>
      <View style={styles.textInfoContainer}>
        <InputText
          title="Name"
          placeholder="Enter Name"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="Email"
          placeholder="Enter Email"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="Date of Birth"
          placeholder="Enter Date of Birth"
          value={undefined}
          setValue={() => {}}
        />
      </View>
      <View style={styles.nameContainer}>
        <HeaderText text="Change Password" textStyle={styles.textStyle} />
      </View>
      <View style={styles.textInfoContainer}>
        <InputText
          title="Password"
          placeholder="Enter Password"
          value={undefined}
          setValue={() => {}}
        />
      </View> */}
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Save'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
        <BottomSpacing />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  footerContainer: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nameContainer: {
    padding: 10,
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    width: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    borderRadius: 50,
  },
  addContainer: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    height: 24,
    width: 24,
    bottom: 0,
    right: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
  },
  textInfoContainer: {
    width: '95%',
    paddingLeft: '5%',
  },
});

export default BasicInfo;
