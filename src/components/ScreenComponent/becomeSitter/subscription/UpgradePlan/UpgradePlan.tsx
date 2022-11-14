/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import PackageCard from '../packages/PackageCard';
import {useUpgradeSubscription} from './utils/useUpgradeSubs';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import TitleText from '../../../../common/text/TitleText';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../constants/Colors';

const UpgradePlan = () => {
  const {isDarkMode, colors} = useTheme();
  const {formattedPackageRate, handleSubmit, onPressEvent, sequence} =
    useUpgradeSubscription();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.backgroundColor : Colors.iosBG},
      ]}>
      {/* <QuestionModals upgradePlan={true} /> */}
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: colors.borderColor,
          backgroundColor: colors.backgroundColor,
          borderRadius: 5,
          marginHorizontal: 20,
          marginBottom: 30,
        }}>
        <TitleText
          text={
            'You can upgrade and cancel your subscription plan anytime. Currenly you are using Basic plan as your woofmeets subscription. Choose available subscription plans to upgrade your plan from down below'
          }
          textStyle={{textAlign: 'justify'}}
        />
      </View>
      {formattedPackageRate?.map((item: any) => (
        <PackageCard
          item={item}
          onPressEvent={onPressEvent}
          sequence={sequence}
          key={item.id}
          navigation={{
            goBack: () => {},
          }}
        />
      ))}
      <View style={styles.footerContainer}>
        <ButtonCom
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          title="Upgrade Plan"
          onSelect={handleSubmit}
          loading={false}
        />
      </View>
    </ScrollView>
  );
};

export default UpgradePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    paddingHorizontal: '20%',
    paddingBottom: 100,
    paddingTop: 40,
  },
});
