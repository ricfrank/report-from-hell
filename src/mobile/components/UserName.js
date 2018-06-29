import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const UserName = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.userIcon}>
        <Icon name="people" size={20} color="#ffffff" />
      </Text>
      <Text style={styles.userNameText}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 6,
    backgroundColor: '#38324e',
    display: 'flex',
    flexDirection: 'row'
  },
  userIcon: {
    color: '#ffffff',
    margin: 8
  },
  userNameText: {
    color: '#ffffff',
    fontSize: 12,
    padding: 8
  }
})

export default UserName
