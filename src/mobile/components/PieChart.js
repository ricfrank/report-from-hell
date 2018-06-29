import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const PieChart = () => {
  return (
    <View style={styles.wrapper}>
      <Icon name="pie-chart" size={20} color="#ffffff" />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#38324e'
  }
})

export default PieChart
