import React from 'react'
import { View, StyleSheet } from 'react-native'
import UserName from './UserName'
import PieChart from './PieChart'
import Today from './Today'

const Header = props => {
  return (
    <View style={styles.wrapper}>
      <UserName name={props.name} />
      <PieChart />
      <Today />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#38324e',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Header
