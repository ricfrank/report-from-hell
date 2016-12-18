import React from 'react'

const Project = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">
                <a onClick={() => {this.props.onProjectClick(this.props.id)}}>
                    {this.props.name}
                </a>
            </li>
        )
    }
});

export default Project
