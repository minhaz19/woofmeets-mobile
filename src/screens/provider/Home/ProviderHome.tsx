import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../../../constants/theme/hooks/useTheme';
import ScreenRapper from '../../../components/common/ScreenRapper';
import HeaderText from '../../../components/common/text/HeaderText';
import ShortText from '../../../components/common/text/ShortText';
import TitleText from '../../../components/common/text/TitleText';
import BookingCard from '../../../components/ScreenComponent/Provider/Home/BookingCard';
import Colors from '../../../constants/Colors';

const ProviderHome = () => {
  const {colors} = useTheme();
  const bookingData = [
    {
        id: 1,
        serviceName: 'Drop-in visit',
        duration: '30 mins',
        orderStatus: 'Completed',
        ownerName: 'Mashfiqs Home',
        petName: 'Bunty',
        ownerImage: require('../../../assets/image/pet/mypet.png')
    },
  ]
  return (
    <ScreenRapper>
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
        <View style={styles.headerContainer}>
            <HeaderText text="Today" />
            <ShortText text="1 Booking" />
        </View>
        <View style={styles.spacing}>
            <TitleText text={"Thursday, Sep 23"} />
        </View>
        <View style={styles.spacing}>
            <ShortText text="+ Booking" textStyle={styles.bookingText}/>
        </View>
        <View>
            {bookingData?.map((item: any, index) => {
                return (
                <BookingCard
                    key={index}
                    item={item}
                    buttonStyles={Colors.yellow}
                />
                );
            })}
        </View>
        <View style={styles.spacing}>
            <ShortText text="Last checked today at 5:16 PM" textStyle={styles.bookingText}/>
        </View>
        </ScrollView>
    </ScreenRapper>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    bookingText: {
        fontWeight: '600',
    },
    spacing: {
        paddingBottom: 10,
    }
})

export default ProviderHome