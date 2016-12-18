import React from 'react'

const Issue = React.createClass({
    render: function () {
        const inputStyle = {
            paddingRight: 0
        };
        const inputDateStyle = {
            paddingRight: 0,
            width: '19%'
        };
        const inputTimeStyle = {
            paddingRight: 0,
            width: '9%'
        };
        const inputCommentStyle = {
            paddingRight: 0,
            width: '63%'
        };
        const inputButtonStyle = {
            width: '100%'
        };

        return (
            <li className="list-group-item">
                <h4>{this.props.id} - {this.props.subject}</h4>
                <form>
                    <div className="row">
                        <div className="col-md-3" style={inputDateStyle}>
                            <input type="date" className="form-control" placeholder="Date" />
                        </div>
                        <div className="col-md-1" style={inputTimeStyle}>
                            <input type="number" className="form-control" placeholder="Time" step="0.5"/>
                        </div>
                        <div className="col-md-7" style={inputCommentStyle}>
                            <input type="text" className="form-control" placeholder="Comment"/>
                        </div>
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success" style={inputButtonStyle}>Go</button>
                        </div>
                    </div>

                </form>
            </li>
        )}
});

export default Issue
