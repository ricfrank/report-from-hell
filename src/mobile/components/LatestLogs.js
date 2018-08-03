import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Log from './Log'

const LatestLogs = ({ logs }) => {
  return (
    <View>
      <Text style={styles.title}>LATEST</Text>
      {logs && logs.map(log => <Log key={log.id} log={log} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    color: '#403A60',
    textAlign: 'center',
    borderBottomWidth: 3,
    paddingBottom: 8,
    marginBottom: 16
  }
})

export default LatestLogs
