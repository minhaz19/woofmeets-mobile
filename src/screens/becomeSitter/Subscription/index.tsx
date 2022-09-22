/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import PackageCard from '../../../components/ScreenComponent/becomeSitter/subscription/packages/PackageCard';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import HeaderText from '../../../components/common/text/HeaderText';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useSubscription} from './utils/useSubscription';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import ButtonCom from '../../../components/UI/ButtonCom';
import Screen from '../../../components/common/Screen';
const SubscriptionScreen = () => {
  const {colors} = useTheme();
  const {
    onPressEvent,
    loading,
    pLoading,
    formattedPackageRate,
    sequence,
    handleSubmit,
  } = useSubscription();
  return (
    <Screen style={{flex: 1}}>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <BigText text="Choose A Subscription" textStyle={styles.textStyle} />
        <HeaderText
          text="Choose a subscription that works for you"
          textStyle={styles.textStyle}
        />
        <TitleText
          text="Lorem ipsum description about the subscription packs"
          textStyle={{...styles.textStyle, paddingBottom: 10}}
        />
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
            title="Choose Plan"
            onSelect={handleSubmit}
            loading={pLoading}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  footerContainer: {
    paddingHorizontal: '20%',
    paddingBottom: 100,
    paddingTop: 40,
  },
  textStyle: {
    paddingTop: 10,
  },
});

export default SubscriptionScreen;
