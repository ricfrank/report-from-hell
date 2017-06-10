import React from 'react'
import {Link} from 'react-router'

const Project = React.createClass({
  render: function () {
    return (
      <Link to={"/issues/" + this.props.id} activeClassName="active" className="list-group-item rfh-sidebar-item">
        {this.props.name}
      </Link>
    )
  }
});

export default Project
