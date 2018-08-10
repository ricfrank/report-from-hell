import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { saveApiKey } from '../../core/actions'

export const Authentication = props => {
  let modalShow = true
  if (props.apiKey) {
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
            onChangeText={props.onChangeText}
            value={props.text}
          />
          <Button
            title="Send"
            onPress={() => props.onApiKeySend(props.text)}
            disabled={!props.text}
          />
        </View>
      </Modal>
    </View>
  )
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
