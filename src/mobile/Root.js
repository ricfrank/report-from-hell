import React, { Component } from 'react'
import { View } from 'react-native'
import Authentication from './components/Authentication'
import CalendarWidget from './containers/CalendarWidget'

export default class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View>
        <Authentication
          onChangeText={text => this.setState({ text })}
          text={this.state.text}
        />
        <CalendarWidget />
      </View>
    )
  }
}
