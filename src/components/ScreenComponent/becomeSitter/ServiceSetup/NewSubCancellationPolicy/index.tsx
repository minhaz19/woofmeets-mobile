import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../../constants/Colors';
import HeaderText from '../../../../common/text/HeaderText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import {useFormContext} from 'react-hook-form';
import ServiceReusableModal from '../Common/ServiceReusableModal';
import Divider from '../../../../UI/Divider';

interface props {
  policy: any;
}
const NewSubCancellationPolicy = ({policy}: props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  return (
    <View>
      <ServiceReusableModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        question="What is cancellation policy?"
        description="Every sitter should decide how much advance notice they need if a customer wants to cancel. Try to select a timeframe that’s reasonable for both yourself and your prospective clients."
      />
      <View style={styles.flexContainer}>
        <BigText text={'Cancellation policy'} textStyle={styles.headerText} />
        <AppTouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconContainer}>
          <QuestionIcon fill={Colors.primary} />
        </AppTouchableOpacity>
      </View>
      <View>
        <HeaderText
          textStyle={styles.subtitle}
          text={'What is your cancellation policy for Boarding Settings?'}
        />
        <View style={styles.policyStyle}>
          {policy?.map((item: any, index: number) => {
            return (
              <ServiceCheckbox
                title={item.title}
                key={index}
                radio
                typeKey={item.id}
                onPress={() => {
                  setValue('cancellationPolicy', item.id, {
                    shouldValidate: true,
                  });
                }}
                name={'cancellationPolicy'}
                control={control}
              />
            );
          })}
        </View>
        <ErrorMessage error={errors['cancellationPolicy']?.message} />
      </View>
      <Divider />
    </View>
  );
};

export default NewSubCancellationPolicy;

const styles = StyleSheet.create({
  headerText: {
    lineHeight: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingBottom: '1%',
    lineHeight: 20,
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
  policyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
