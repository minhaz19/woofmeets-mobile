import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../constants/theme/hooks/useTheme';
import PackageCard from '../../../components/ScreenComponent/becomeSitter/subscription/packages/PackageCard';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import HeaderText from '../../../components/common/text/HeaderText';
import { btnStyles } from '../../../constants/theme/common/buttonStyles';
import ButtonCom from '../../../components/UI/ButtonCom';

const SubscriptionScreen = (props: { navigation: { navigate: (arg0: string) => any; goBack: () => void; }; }) => {
  const {colors} = useTheme();
  const [sequence, setSequence] = useState<number>(0);
  const packageData = [
    {
        id: 1,
        sequence: 1,
        title: 'Basic',
        description: 'Only 5% Service Fee For All Unlimited Appointments',
        price: '0',
        onPress: () => props.navigation.navigate('')
    },
    {
        id: 2,
        sequence: 2,
        title: 'Gold',
        description: 'Only 5% Service Fee For All Unlimited Appointments',
        price: '75',
        onPress: () => props.navigation.navigate('')
    },
    {
        id: 3,
        sequence: 3,
        title: 'Platinum',
        description: 'Only 5% Service Fee For All Unlimited Appointments',
        price: '149',
        onPress: () => props.navigation.navigate('')
    },
  ]

  const onPressEvent = (id: number) => {
    setSequence(id);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
        <BigText text="Choose A Subscription" textStyle={styles.textStyle} />
        <HeaderText text="Choose a subscription that works for you" textStyle={styles.textStyle} />
        <TitleText text="Lorem ipsum description about the subscription packs" textStyle={{...styles.textStyle, paddingBottom: 10}} />
      {packageData.map(item => (
        <PackageCard item={item} onPressEvent={onPressEvent} sequence={sequence} />
      ))}
      <View style={styles.footerContainer}>
        <ButtonCom
          title="Choose Plan"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => props.navigation.goBack()}
        //   loading={loading}
        />
      </View>
    </ScrollView>
  )
}

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
  }
});

export default SubscriptionScreen