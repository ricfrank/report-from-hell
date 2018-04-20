import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { saveApiKey } from '../../core/actions'

class Authentication extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  render() {
    let modalShow = true
    if (this.props.apiKey) {
      modalShow = false
    }

    return (
      <View>
        <Modal isVisible={modalShow}>
          <View>
            <TextInput
              style={{
                height: 40,
                color: 'white',
                borderColor: 'gray',
                borderWidth: 1
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <Button
              title="Send"
              onPress={() => this.props.onApiKeySend(this.state.text)}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return { apiKey: state.authentication.apiKey }
}

const mapDispatchToProps = dispatch => {
  return {
    onApiKeySend: apiKey => {
      dispatch(saveApiKey(apiKey))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
