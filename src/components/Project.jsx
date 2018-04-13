import React from 'react'
import { Link } from 'react-router'

class Project extends React.Component {
  render() {
    return (
      <Link
        to={'/issues/' + this.props.id}
        activeClassName="active"
        className="list-group-item rfh-sidebar-item"
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        {this.props.name}
      </Link>
    )
  }
}

export default Project
