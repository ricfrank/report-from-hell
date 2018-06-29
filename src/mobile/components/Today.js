import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Today = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.today}>TODAY</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#38324e',
    height: 30,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  today: {
    color: '#ffffff',
    fontSize: 10,
    lineHeight: 11,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 15,
    height: 30,
    width: 50
  }
})

export default Today
