import React from 'react'
import { connect } from 'react-redux'
import ProjectsList from 'web/components/ProjectsList.jsx'
import Authentication from 'web/components/Authentication.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Authentication />
        <ProjectsList />
        {this.props.children}
      </div>
    )
  }
}
export default connect()(App)
