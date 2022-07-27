import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import IOSButton from '../../../UI/IOSButton';
import {AddPet} from '../../../../assets/SVG_LOGOS';
import ButtonCom from '../../../UI/ButtonCom';
import DescriptionText from '../../../common/text/DescriptionText';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import PendingMessage from './PendingMessage';

const Pending = () => {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.container}>
        <DescriptionText
          text="Sorting by recent activity"
          textStyle={{color: colors.descriptionText}}
        />
        <View style={styles.flexContainer}>
          <View style={styles.buttonStyles}>
            <ButtonCom
              title={'Activity'}
              textAlignment={btnStyles.textAlignment}
              containerStyle={btnStyles.containerStyleSmall}
              titleStyle={btnStyles.textStyle}
              onSelect={() => {}}
            />
          </View>
          <View style={styles.buttonStyles}>
            <IOSButton
              containerStyle={styles.containerStyleSmall}
              onSelect={() => {}}
              textAlignment={styles.textAlignment}
              titleStyle={styles.textStyle}
              title={'Date'}
            />
          </View>
        </View>
        {/* <AddPet width={300} height={300} /> */}
      </View>
      <PendingMessage />
    </>
  );
};

export default Pending;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  buttonStyles: {
    marginHorizontal: '1%',
    width: '20%',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_8,
    flex: 1,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.04 : 30,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
  textAlignment: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
  },
});
