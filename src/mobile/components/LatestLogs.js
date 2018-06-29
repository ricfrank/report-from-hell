import React from 'react'
import { View, Text } from 'react-native'

const LatestLogs = props => {
  return (
    <View>
      {props.logs.map(log => <Text key={log.id}>{log.projectName}</Text>)}
    </View>
  )
}

export default LatestLogs
