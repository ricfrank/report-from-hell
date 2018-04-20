import React from 'react'
import { connect } from 'react-redux'
import { saveApiKey } from 'src/actions'
import { Modal } from 'react-bootstrap'
import { ExternalLink } from './ExternalLink.jsx'

class Authentication extends React.Component {
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
      <div>
        <Modal show={modalShow} backdrop={backdrop}>
          <Modal.Header>
            <Modal.Title>Add redmine api key</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Log into projects, go to{' '}
              <ExternalLink target="_blank" href={`${ENDPOINT}/my/account`}>
                {`${ENDPOINT}/my/account`}
              </ExternalLink>{' '}
              and copy/paste <b>API access key</b>
            </p>
            <form
              onSubmit={e => {
                e.preventDefault()

                this.props.onApiKeySend(this.apiKeyValue.value)
              }}
            >
              <div className="row">
                <div className="col-md-10">
                  <input
                    ref={value => {
                      this.apiKeyValue = value
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Api key"
                  />
                </div>
                <div className="col-md-1">
                  <button type="submit" className="btn btn-success">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
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
