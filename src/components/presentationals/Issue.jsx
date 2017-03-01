import React from 'react'

const Issue = React.createClass({
    render: function () {
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
        const pStyle = {
            paddingTop: '8px',
            marginBottom: 0
        };

        return (
            <li className="list-group-item">
                <h4>{this.props.id} - {this.props.subject}</h4>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    this.props.onLogTimeEntry(this.props.id, this.date.value, this.hours.value, this.comment.value);

                    this.date.value = '';
                    this.hours.value = '';
                    this.comment.value = ''
                }}>
                    <div className="row">
                        <div className="col-md-3" style={inputDateStyle}>
                            <input type="date" className="form-control" placeholder="Date"
                                   ref={(value) => { this.date = value; }} required="required"/>
                        </div>
                        <div className="col-md-1" style={inputTimeStyle}>
                            <input type="number" className="form-control" placeholder="Time" step="0.5" pattern="[0-8]?(\.[0,5])?"
                                   ref={(value) => { this.hours = value; }} required="required"/>
                        </div>
                        <div className="col-md-7" style={inputCommentStyle}>
                            <input type="text" className="form-control" placeholder="Comment"
                                   ref={(value) => { this.comment = value; }} />
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
