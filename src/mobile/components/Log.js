import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Log = props => {
  const { hours, projectName, issue, comments } = props.log
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.hours}>{hours}</Text>
      </View>
      <View>
        <Text style={styles.projectName}>{projectName}</Text>
        <Text style={styles.issueSubject}>{issue.subject}</Text>
        <Text style={styles.comments}>{comments}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16
  },
  hours: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#403A60'
  },
  projectName: {
    fontSize: 14,
    lineHeight: 16,
    color: '#403A60'
  },
  issueSubject: {
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.6,
    color: '#403A60',
    marginBottom: 4
  },
  comments: {
    fontSize: 10,
    lineHeight: 11,
    fontStyle: 'italic',
    opacity: 0.6,
    color: '#403A60'
  }
})

export default Log
