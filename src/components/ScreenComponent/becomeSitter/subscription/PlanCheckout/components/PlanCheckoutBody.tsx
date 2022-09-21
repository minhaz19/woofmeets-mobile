import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../../common/text/TitleText';
import {planCheckoutData} from '../../../../../../utils/config/Data/planCheckoutData';
import {CardFieldInput, CardForm} from '@stripe/stripe-react-native';
import {useFormContext} from 'react-hook-form';
import ErrorMessage from '../../../../../common/Form/ErrorMessage';
import AppFormField from '../../../../../common/Form/AppFormField';
import SubmitButton from '../../../../../common/Form/SubmitButton';
import Text_Size from '../../../../../../constants/textScaling';
import AppCheckbox from '../../../../../common/Form/AppCheckbox';
import BottomSpacing from '../../../../../UI/BottomSpacing';
interface Props {
  handleSubmit: (arg: any) => void;
  loading: boolean;
  handleCheck: () => void;
}
const PlanCheckoutBody = ({handleSubmit, loading, handleCheck}: Props) => {
  const {
    setValue,
    control,
    formState: {errors},
  } = useFormContext();
  return (
    <KeyboardAvoidingView
      style={{marginTop: '1%'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        {planCheckoutData.map((item, index) => {
          return (
            <View key={index}>
              {item.name === 'cardInfo' ? (
                <>
                  <TitleText textStyle={styles.label} text={item.title} />
                  <CardForm
                    onFormComplete={cardDetails => {
                      setValue(item.name, cardDetails, {
                        shouldValidate: errors[item.name] ? true : false,
                      });
                    }}
                    style={styles.cardField}
                  />
                  <ErrorMessage error={errors?.cardInfo?.postalCode.message} />
                </>
              ) : (
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'default'}
                  placeholder={item.placeholder}
                  textContentType={'none'}
                  name={item.name}
                  label={item.title}
                  key={index}
                  control={control}
                  errors={errors}
                />
              )}
            </View>
          );
        })}
        <View style={styles.check}>
          <AppCheckbox
            title={'Save this card information for future'}
            square={true}
            // active={active}
            onPress={handleCheck}
            small
          />
        </View>

        <SubmitButton
          title={'Confirm Payment'}
          onPress={handleSubmit}
          loading={loading}
        />
        <BottomSpacing />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PlanCheckoutBody;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  check: {
    marginVertical: 10,
  },
  cardField: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    // borderWidth: 1,
    // backgroundColor: '#FFFFFF',
    // borderColor: '#000000',
    // borderRadius: 8,
    // fontSize: 14,
    // placeholderColor: '#A020F0',
    // textColor: '#0000ff',
  },
});
