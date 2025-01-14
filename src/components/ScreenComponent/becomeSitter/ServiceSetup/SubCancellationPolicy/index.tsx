/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable dot-notation */
import * as Yup from 'yup';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import BigText from '../../../../common/text/BigText';
import HeaderText from '../../../../common/text/HeaderText';
import BottomSpacing from '../../../../UI/BottomSpacing';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import ServiceReusableModal from '../Common/ServiceReusableModal';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../../constants/Colors';

interface props {
  handlePolicy: (arg1: any) => void;
  postLoading?: boolean;
  policy: any;
  singlePolicy: number | null;
}

const SubCancellationPolicy = ({
  handlePolicy,
  postLoading,
  policy,
  singlePolicy,
}: props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const cancellationSchema = Yup.object().shape({
    policyId: Yup.string()
      .required('At least select one policy')
      .nullable(true),
  });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(cancellationSchema),
    defaultValues: {
      policyId: useMemo(() => singlePolicy, [singlePolicy]),
    },
    mode: 'onChange',
  });
  useEffect(() => {
    reset({
      policyId: singlePolicy,
    });
  }, [singlePolicy]);
  return (
    <View style={styles.headerContainer}>
      <ServiceReusableModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        question="What is cancellation policy?"
        description="Every sitter should decide how much advance notice they need if a customer wants to cancel. Try to select a timeframe that’s reasonable for both yourself and your prospective clients."
      />
      <View style={styles.flexContainer}>
        <BigText text={'Cancellation policy'} textStyle={styles.headerText} />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconContainer}>
          <QuestionIcon fill={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View>
        <HeaderText
          textStyle={styles.subtitle}
          text={'What is your cancellation policy for Boarding Settings?'}
        />
        {policy?.map((item: any, index: number) => {
          return (
            <ServiceCheckbox
              title={item.title}
              key={index}
              radio
              typeKey={item.id}
              onPress={() => {
                setValue('policyId', item.id, {
                  shouldValidate: true,
                });
              }}
              name={'policyId'}
              control={control}
            />
          );
        })}
        <ErrorMessage error={errors['policyId']?.message} />
      </View>
      <View style={styles.submitContainer}>
        <ButtonCom
          title={'Save & Continue'}
          loading={postLoading}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={handleSubmit(handlePolicy)}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default SubCancellationPolicy;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
    lineHeight: 20,
  },
  submitContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '6%' : '3%',
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
