import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';
import {saveApiKey} from '../../actions'
import {Modal} from 'react-bootstrap'

const Authentication = React.createClass({
    render: function() {
        if (!_.isUndefined(this.props.apiKey) && !_.isNull(this.props.apiKey)) {
            return null;
        }

        return (
            <div>
                <Modal show={true} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add your api key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
