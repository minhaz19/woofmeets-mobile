import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import BigText from '../../../../common/text/BigText'
import TitleText from '../../../../common/text/TitleText'
import Colors from '../../../../../constants/Colors'
import { useTheme } from '../../../../../constants/theme/hooks/useTheme'
import Text_Size from '../../../../../constants/textScaling'
import DescriptionText from '../../../../common/text/DescriptionText'

const PackageCard = (props: { onPressEvent: (arg0: any) => void; item: { sequence: any; id: React.Key | null | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number; price: any }; sequence: any }) => {
    const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={() => props.onPressEvent(props.item.sequence)} key={props.item.id}>
     <View key={props.item.id} style={{...styles.contentStyle, 
        backgroundColor: colors.backgroundColor,
        borderWidth: 2,
        borderColor: props.sequence === props.item.sequence ? Colors.primary : colors.borderColor,
        }}>
       <View style={styles.textPortion}>
        <BigText text={props.item.title} textStyle={styles.biggerText}/>
        <View style={styles.detailsWrap}>
          <TouchableOpacity style={styles.detailsContainer}>
            <DescriptionText text="Details" textStyle={styles.detailsText} />
          </TouchableOpacity>
        </View>
        <TitleText text={props.item.description} />
       </View>
       <View style={styles.textPortion2}>
        <BigText text={`$${props.item.price}`} textStyle={styles.biggerText}/>
        <View style={styles.textPortion3}>
          <DescriptionText text="/month"/>
        </View>
       </View>
      {props.sequence === props.item.sequence && <View style={styles.rightSelection} />}
     </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contentStyle: {
      borderColor: Colors.subText,
      marginBottom: 10,
      marginRight: 10,
      borderRadius: 5,
      padding: 10,
      minHeight: 100,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  rightSelection: {
      height: 12,
      width: 12,
      borderRadius: 10,
      borderColor: Colors.primary,
      borderWidth: 3,
      position: 'absolute',
      right: 10,
      top: 10,
  },
  biggerText: {
      fontSize: Text_Size.Text_4,
  },
  textPortion: {
      justifyContent: 'center',
      width: '70%',
  },
  textPortion2: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  textPortion3: {
      paddingBottom: 4,
  },
  detailsContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 2,
    // width: '30%',
    backgroundColor: '#FFF2E6',
  },
  detailsWrap: {
    flexDirection: 'row',
  },
  detailsText: {
    color: Colors.primary,
  },
});

export default PackageCard