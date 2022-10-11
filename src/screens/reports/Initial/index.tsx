import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BottomSpacing from '../../../components/UI/BottomSpacing'
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey'

const ReportCardInitial = () => {
  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <View style={styles.tabContainer}>
      </View>

      <BottomSpacing />
    </ScreenRapperGrey>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
});
export default ReportCardInitial