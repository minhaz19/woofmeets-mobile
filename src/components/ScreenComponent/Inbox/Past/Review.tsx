/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TextInput} from 'react-native';
import React, {FC, useState} from 'react';
import {SCREEN_HEIGHT} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {AirbnbRating} from 'react-native-ratings';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import IOSButton from '../../../UI/IOSButton';

interface Props {
  setIsReviewModal: (value: boolean) => void;
  setModalVisible: (arg1: boolean) => void;
}
const Review: FC<Props> = props => {
  const {colors, isDarkMode} = useTheme();
  const [isRatings, setIsRatings] = useState(0);
  const [isText, setIsText] = useState('');
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const handleRatings = (value: number) => {
    setIsRatings(value);
    setErrorMessage(null);
  };
  const handleSubmit = () => {
    let formattedData;
    if (isRatings === 0) {
      setErrorMessage('please select ratings');
    } else {
      formattedData = {
        appointmentId: 0,
        rating: isRatings,
        comment: isText,
      };
    }
    console.log(formattedData);
  };
  return (
    <>
      <View>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={isRatings}
          size={50}
          onFinishRating={value => handleRatings(value)}
        />
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </View>
      <View
        style={[
          styles.container,
          {
            borderColor: isDarkMode ? Colors.gray : Colors.border,
          },
        ]}>
        <TextInput
          placeholderTextColor={'gray'}
          allowFontScaling={false}
          style={[styles.text, {color: isDarkMode ? 'white' : 'black'}]}
          placeholder="Write your Comments"
          multiline={true}
          onChangeText={value => setIsText(value)}
        />
      </View>
      <ButtonCom
        title="Submit"
        textAlignment={btnStyles.textAlignment}
        containerStyle={btnStyles.containerStyleFullWidth}
        titleStyle={btnStyles.titleStyle}
        onSelect={handleSubmit}
        //    loading={loading}
      />
      <IOSButton
        containerStyle={styles.containerStyleSmall}
        onSelect={() => props.setIsReviewModal(false)}
        textAlignment={{
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 100,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        titleStyle={{
          color: colors.lightText,
        }}
        title={'Close'}
      />
    </>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontFamily: 'Muli',
    flex: 1,
    alignSelf: 'flex-start',
    height: 120,
    width: '100%',
    fontSize: Text_Size.Text_11,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
  header: {
    fontSize: Text_Size.Text_2,
    marginVertical: 10,
  },
});
