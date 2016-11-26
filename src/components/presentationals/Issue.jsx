import React from 'react'

const Issue = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">
                <h4>{this.props.id} - {this.props.subject}</h4>
            </li>
        )}
});

export default Issue
