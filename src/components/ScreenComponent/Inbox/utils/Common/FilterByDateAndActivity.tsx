import {StyleSheet, useColorScheme, View} from 'react-native';
import React, {FC} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import IOSButton from '../../../../UI/IOSButton';
import DescriptionText from '../../../../common/text/DescriptionText';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../constants/Colors';

interface Props {
  handleActivity: () => void;
  handleDate: () => void;
}

const FilterByDateAndActivity: FC<Props> = ({handleActivity, handleDate}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <DescriptionText
        text="Sorting by recent activity"
        textStyle={{color: colors.descriptionText}}
      />
      <View style={styles.flexContainer}>
        <View style={styles.buttonStyles}>
          <IOSButton
            containerStyle={styles.containerStyleSmall}
            onSelect={handleActivity}
            textAlignment={{
              backgroundColor: isDarkMode
                ? Colors.light.lightText
                : Colors.primary,
              borderColor: isDarkMode ? Colors.light.lightText : Colors.primary,
              borderWidth: 1,
              borderRadius: 100,
            }}
            titleStyle={{
              color: Colors.light.background,
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: Text_Size.Text_8,
              flex: 1,
            }}
            title={'Activity'}
          />
        </View>
        <View style={styles.buttonStyles}>
          <IOSButton
            containerStyle={styles.containerStyleSmall}
            onSelect={handleDate}
            textAlignment={{
              backgroundColor: isDarkMode ? 'black' : 'white',
              borderColor: isDarkMode ? 'white' : 'black',
              borderWidth: 1,
              borderRadius: 100,
            }}
            titleStyle={{
              color: colors.headerText,
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: Text_Size.Text_8,
              flex: 1,
            }}
            title={'Date'}
          />
        </View>
      </View>
    </View>
  );
};

export default FilterByDateAndActivity;

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
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.03 : 30,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
});
