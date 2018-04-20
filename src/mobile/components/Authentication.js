import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { saveApiKey } from '../../core/actions'

class Authentication extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let modalShow = true
    let backdrop = true
    if (this.props.apiKey) {
      modalShow = false
      backdrop = false
    }

    return (
      <View>
        <Modal isVisible={modalShow}>
          <View>
            <Button
              title="Send"
              onPress={() => this.props.onApiKeySend(this.apiKeyValue.value)}
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
