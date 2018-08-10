import React from 'react'
import { View, StyleSheet } from 'react-native'
import Log from './Log'

const DayInfoLogs = ({ logs }) => (
  <View style={styles.wrapper}>
    {logs && logs.map(log => <Log key={log.id} log={log} />)}
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  }
})

export default DayInfoLogs
