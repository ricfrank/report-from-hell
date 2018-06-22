import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const UserName = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.userIcon}>
        <Icon name="user" size={20} color="#ffffff" />
      </Text>
      <Text style={styles.userNameText}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#38324e'
  },
  userIcon: {
    color: '#ffffff',
    margin: 8
  },
  userNameText: {
    color: '#ffffff',
    fontFamily: 'Simple-Line-Icons',
    fontSize: 12,
    padding: 8
  }
})

export default UserName
