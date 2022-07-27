import {StyleSheet, View} from 'react-native';
import React from 'react';
import DescriptionText from '../../../common/text/DescriptionText';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import Text_Size from '../../../../constants/textScaling';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {AddPet} from '../../../../assets/SVG_LOGOS';
import IOSButton from '../../../UI/IOSButton';
import ArchivedMessage from './ArchivedMessage';

const Archived = () => {
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
      </View>
      <ArchivedMessage />
    </>
  );
};

export default Archived;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: SCREEN_WIDTH <= 380 ? '7%' : SCREEN_WIDTH <= 600 ? '6%' : '2%',
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
