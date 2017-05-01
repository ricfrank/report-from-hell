import React from 'react'

const Project = React.createClass({
  render: function () {
    return (
      <a href="#" className="list-group-item rfh-sidebar-item" onClick={() => {
        this.props.onProjectClick(this.props.id)
      }}>
        {this.props.name}
      </a>
    )
  }
});

export default Project
