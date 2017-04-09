import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import {saveApiKey} from '../../actions'
import {Modal} from 'react-bootstrap'

const Authentication = React.createClass({
    render: function() {
        let modalShow  = true;
        if (this.props.apiKey) {
          modalShow = false;
        }

        return (
            <div>
                <Modal show={modalShow}>
                    <Modal.Header>
                        <Modal.Title>Add redmine api key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Log into projects, go to <a target="_blank"href="https://project.ideato.it/my/account">https://project.ideato.it/my/account</a> and
                        copy/paste <b>API access key</b></p>
                        <form onSubmit={(e) => {
                            e.preventDefault();

                            this.props.onApiKeySend(this.apiKeyValue.value);
                        }}>
                            <div className="row">
                                <div className="col-md-10">
                                    <input
                                        ref={(value) => { this.apiKeyValue = value; }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Api key"/>
                                </div>
                                <div className="col-md-1">
                                    <button
                                        type="submit"
                                        className="btn btn-success">
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
});

const mapStateToProps = (state) => {
    return {apiKey: state.authentication.apiKey};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onApiKeySend: (apiKey) => {
            dispatch(saveApiKey(apiKey));
        }
    }
};

// Connect Redux state to props and handlers
const AuthenticationRedux = connect(mapStateToProps, mapDispatchToProps)(Authentication);

export default AuthenticationRedux
